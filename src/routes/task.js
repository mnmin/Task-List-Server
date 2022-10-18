import { Router } from "express";
import {
  createNewTask,
  getAllTasks,
  updateTaskById,
  deleteTaskById,
} from "../controllers/task.js";
import { authentication } from "../middleware/authentication.js";

const router = Router();

router.post("/", authentication, createNewTask);
router.get("/", authentication, getAllTasks);
router.put("/:id", authentication, updateTaskById);
router.delete("/:id", authentication, deleteTaskById);

export default router;
