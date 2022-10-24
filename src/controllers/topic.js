import { sendDataResponse, sendMessageResponse } from "../utils/responses.js";
import dbClient from "../utils/dbClient.js";

export const createNewTopic = async (req, res) => {
  const { topicName } = req.body;
  const userId = Number(req.body.user.id);
  if (userId === Number.NaN || userId === 0) {
    return res.status(400).json("The userId is wrong");
  }
  //   console.log("REQ BODY", topicName);
  //   console.log("CreatedById", userId);

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

export const getAllTopics = async (req, res) => {
  try {
    const allTopics = await dbClient.topic.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return sendDataResponse(res, 200, allTopics);
    //return res.status(200).json({ allTasks });
  } catch (err) {
    return sendMessageResponse(res, 404, "Unable to find Topics");
    //return res.status(404).json({ err: "Unable to find Tasks" });
  }
};

export const getTopicByUserId = async (req, res) => {
  const userId = Number(req.params.id);
  //   console.log("USER ID------------->", userId);
  const selectedTopics = await dbClient.topic.findMany({
    where: { userId: userId },
    orderBy: {
      createdAt: "desc",
    },
  });
  const notFound = selectedTopics.length === 0;
  //   console.log("SELECT TASK------------->", selectedTopics);
  if (notFound) {
    return sendMessageResponse(
      res,
      404,
      "Topics with that user id do not exist"
    );
  }
  //   console.log("RETURN---------->", selectedTopics);
  return sendDataResponse(res, 200, selectedTopics);
};

export const updateTopicById = async (req, res) => {
  const id = Number(req.params.id);
  console.log("ID", id);

  if (!req.body.topicName) {
    return res.status(400).json("Missing topic name");
  }

  const foundTopic = await dbClient.topic.findUnique({
    where: { id },
  });
  if (!foundTopic) {
    return res.status(404).json("Unable to find topic to update");
  }
  try {
    const updatedTopic = await dbClient.topic.update({
      where: { id },
      data: {
        topicName: req.body.topicName,
      },
    });
    return res.status(201).json(updatedTopic);
  } catch (err) {
    return res.status(400).json("Unable to update topic");
  }
};

export const deleteTopicById = async (req, res) => {
  const id = Number(req.params.id);

  const foundTopic = await dbClient.topic.findUnique({
    where: { id },
  });

  if (!foundTopic) {
    return res.status(404).json("Unable to find topic to delete");
  }

  try {
    const deletedTopic = await dbClient.topic.delete({ where: { id } });
    return res.status(200).json(deletedTopic);
  } catch (err) {
    return res.status(400).json("Unable to delete topic");
  }
};
