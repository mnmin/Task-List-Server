import { Router } from "express";
import {
  createNewTask,
  getAllTasks,
  getTaskByUserId,
  updateTaskById,
  deleteTaskById,
} from "../controllers/task.js";
import { authentication } from "../middleware/authentication.js";

const router = Router();

router.post("/", authentication, createNewTask);
router.get("/", authentication, getAllTasks);
router.get("/:id", authentication, getTaskByUserId);
router.patch("/:id", authentication, updateTaskById);
router.delete("/:id", authentication, deleteTaskById);

export default router;
