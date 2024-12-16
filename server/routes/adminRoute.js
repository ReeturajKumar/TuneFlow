import { Router } from "express";
import { getAdmin } from "../controller/adminController.js";

const router = Router();

router.get("/", getAdmin) 

export default router