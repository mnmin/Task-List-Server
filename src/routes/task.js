import { Router } from "express";
import {
  createNewTask,
  getAllTasks,
  updateTaskById,
} from "../controllers/task.js";
import { authentication } from "../middleware/authentication.js";

const router = Router();

router.post("/", authentication, createNewTask);
router.get("/", getAllTasks);
router.put("/:id", updateTaskById);
//router.put("/:id", updateTaskById)
//router.delete("/:id", deleteTaskById)

export default router;
