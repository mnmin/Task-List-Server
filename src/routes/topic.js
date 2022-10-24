import { Router } from "express";
import {
  createNewTopic,
  getAllTopics,
  // getTopicByUserId,
  // updateTopicById,
  // deleteTopicById,
} from "../controllers/topic.js";
import { authentication } from "../middleware/authentication.js";

const router = Router();

router.post("/", authentication, createNewTopic);
router.get("/", authentication, getAllTopics);
// router.get("/:id", authentication, getTopicByUserId);
// router.patch("/:id", authentication, updateTopicById);
// router.delete("/:id", authentication, deleteTopicById);

export default router;
