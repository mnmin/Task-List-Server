import { Router } from "express";
import { createNewTask } from "../controllers/task.js";
import { authentication } from "../middleware/authentication.js";

const router = Router();

router.post("/", authentication, createNewTask);
//router.get("/", getAllTasks)
//router.get("/:id", getUserById);
//router.put("/:id", updateTaskById)
//router.delete("/:id", deleteTaskById)

export default router;
