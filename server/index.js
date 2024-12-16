import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoute.js"
import adminRoutes from "./routes/adminRoute.js"
import authRoutes from "./routes/authRoute.js"
import songRoutes from "./routes/songsRoute.js"
import albumRoutes from "./routes/albumsRoute.js"
import statsRoutes from "./routes/statsRoute.js"
import { connectDB } from "./lib/db.js"

const app = express()
const PORT = process.env.PORT || 8000
dotenv.config()

app.use(express.json())




app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/songs", songRoutes);
app.use("/api/v1/albums",albumRoutes);
app.use("/api/v1/stats",statsRoutes);


app.get("/", (req, res) => {
  res.send("Server is running")
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
})

