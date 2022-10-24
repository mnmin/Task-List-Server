import { sendDataResponse, sendMessageResponse } from "../utils/responses.js";
import dbClient from "../utils/dbClient.js";

export const createNewTopic = async (req, res) => {
  const { topicName } = req.body;
  const userId = Number(req.body.user.id);
  if (userId === Number.NaN || userId === 0) {
    return res.status(400).json("The userId is wrong");
  }
  console.log("REQ BODY", topicName);
  console.log("CreatedById", userId);

  if (!topicName) {
    return res.status(400).json("A topic must have a name");
  }

  try {
    const createdTopic = await dbClient.topic.create({
      data: {
        topicName,
        userId: userId,
      },
    });
    // console.log("CREATED TASK", createdTask);
    return res.status(201).json({ topic: createdTopic });
  } catch (err) {
    return res.status(400).json("Unable to create topic");
  }
};

// export const getAllTopics = async (req, res) => {};

// export const getTopicByUserId = async (req, res) => {};

// export const updateTopicById = async (req, res) => {};

// export const deleteTopicById = async (req, res) => {};
