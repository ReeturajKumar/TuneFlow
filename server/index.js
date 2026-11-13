import "dotenv/config" // must be first: ESM runs imports before module body
import express from "express"
import userRoutes from "./routes/userRoute.js"
import adminRoutes from "./routes/adminRoute.js"
import authRoutes from "./routes/authRoute.js"
import songRoutes from "./routes/songsRoute.js"
import albumRoutes from "./routes/albumsRoute.js"
import statsRoutes from "./routes/statsRoute.js"
import { connectDB } from "./lib/db.js"
import { clerkMiddleware } from '@clerk/express'
import fileUpload from "express-fileupload"
import path from 'path'
import cors from "cors"
import fs from "fs"
import { createServer } from "http"
import cron from "node-cron"
import { initializeSocket } from "./lib/socket.js"


const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 8080;

// comma-separated, e.g. "https://tuneflow.vercel.app,http://localhost:3000"
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:3000").split(",").map((o) => o.trim());

const httpServer = createServer(app);
initializeSocket(httpServer, allowedOrigins);




app.set("trust proxy", 1); // behind nginx on Lightsail
app.use(cors({ origin: allowedOrigins, credentials: true }));


app.use(express.json());
app.use(clerkMiddleware());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, "tmp"), 
  createParentPath: true,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max file size
  }
}));


const tempdir = path.join(process.cwd(), "tmp");
// cron job
cron.schedule("0 * * * *",  () => {
  if (fs.existsSync(tempdir)) {
		fs.readdir(tempdir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempdir, file), (err) => {});
			}
		});
	}
})







app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/songs", songRoutes);
app.use("/api/v1/albums", albumRoutes);
app.use("/api/v1/stats", statsRoutes);








// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message
  });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
