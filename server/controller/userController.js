import { Message } from "../models/messageModel.js";
import { User } from "./../models/userModel.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId;
    const users = await User.find({ clerkId: { $ne: currentUserId } });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const myId = req.auth.userId;
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: myId },  // User sent a message to me
        { senderId: myId, receiverId: userId },  // I sent a message to user
      ],
    }).sort({ createdAt: 1 }); // Sort in ascending order (oldest first)

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
