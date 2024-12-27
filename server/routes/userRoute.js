import { Router } from "express";
import { protectRoute } from "../middelware/authMiddelware.js";
import { getAllUsers } from "../controller/userController.js";

const router = Router();

router.get("/", protectRoute, getAllUsers );

// todo: getMessages


export default router