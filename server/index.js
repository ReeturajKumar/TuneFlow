import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoute.js"
import adminRoutes from "./routes/adminRoute.js"
import authRoutes from "./routes/authRoute.js"
import songRoutes from "./routes/songsRoute.js"
import albumRoutes from "./routes/albumsRoute.js"
import statsRoutes from "./routes/statsRoute.js"
import { connectDB } from "./lib/db.js"
import { clerkMiddleware } from '@clerk/express'
import fileUpload from "express-fileupload"
import  path  from 'path';
import cors from "cors"



const __dirname = path.resolve();
const app = express()
const PORT = process.env.PORT || 8000;


app.use(cors({
  origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))
dotenv.config()

app.use(express.json())
app.use(clerkMiddleware())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: 'path.join(__dirname, "tmp")',
  createParentPath: true,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
}))



app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/songs", songRoutes);
app.use("/api/v1/albums",albumRoutes);
app.use("/api/v1/stats",statsRoutes);


//error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message:process.env.NODE_ENV === "production" ?"Internal Server Error" : err.message });
});


app.get("/", (req, res) => {
  res.send("Server is running")
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
})


// todo: socket.io

