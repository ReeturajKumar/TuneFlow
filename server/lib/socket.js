import { Server } from "socket.io";
import { verifyToken } from "@clerk/express";
import { Message } from "../models/messageModel.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  const userSockets = new Map(); // { userId: socketId}
  const userActivities = new Map(); // {userId: activity}

  // identity comes from the verified Clerk token, never from client payloads
  io.use(async (socket, next) => {
    try {
      const { sub } = await verifyToken(socket.handshake.auth?.token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });
      socket.userId = sub;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.userId;

    socket.on("user_connected", () => {
      userSockets.set(userId, socket.id);
      userActivities.set(userId, "Online");

      // broadcast to all connected sockets that this user just logged in
      io.emit("user_connected", userId);
      socket.emit("users_online", Array.from(userSockets.keys()));
      io.emit("activities", Array.from(userActivities.entries()));
    });

    socket.on("update_activity", ({ activity }) => {
      userActivities.set(userId, activity);
      io.emit("activity_updated", { userId, activity });
    });

    socket.on("send_message", async (data) => {
      try {
        const { receiverId, content } = data;

        const message = await Message.create({
          senderId: userId,
          receiverId,
          content,
        });

        // send to receiver in realtime, if they're online
        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", message);
        }

        socket.emit("message_sent", message);
      } catch (error) {
        console.error("Message error:", error);
        socket.emit("message_error", error.message);
      }
    });

    socket.on("disconnect", () => {
      // only clear if this is still the user's active socket (not an older tab)
      if (userSockets.get(userId) === socket.id) {
        userSockets.delete(userId);
        userActivities.delete(userId);
        io.emit("user_disconnected", userId);
      }
    });
  });
};
