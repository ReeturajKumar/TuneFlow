import { Router } from "express";
import { protectRoute } from "../middelware/authMiddelware.js";
import { getAllUsers, getMessages } from "../controller/userController.js";

const router = Router();

router.get("/", protectRoute, getAllUsers );

router.get("/message/:userId", protectRoute, getMessages );


export default router