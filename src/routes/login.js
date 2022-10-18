import { Router } from "express";
import { loginUser } from "../controllers/login.js";

const router = Router();

router.post("/", loginUser);

export default router;
