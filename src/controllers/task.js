import { sendDataResponse, sendMessageResponse } from "../utils/responses.js";
import dbClient from "../utils/dbClient.js";

export const createNewTask = async (req, res) => {
  const { taskName, taskDescription, linksUrl } = req.body;
  const createdById = Number(req.body.user.id);
  // console.log("REQ BODY", taskName, taskDescription, linksUrl);
  console.log("CreatedById", createdById);

  if (!taskName) {
    return res.status(400).json("A task must have a name");
  }
  if (!taskDescription) {
    return res.status(400).json("A task must have a description");
  }

  try {
    const createdTask = await dbClient.task.create({
      data: {
        taskName,
        taskDescription,
        linksUrl,
        createdById: createdById,
      },
    });
    // console.log("CREATED TASK", createdTask);
    return res.status(201).json({ task: createdTask });
  } catch (err) {
    return res.status(400).json("Unable to create task");
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const allTasks = await dbClient.task.findMany();
    return sendDataResponse(res, 200, allTasks);
    //return res.status(200).json({ allTasks });
  } catch (err) {
    return sendMessageResponse(res, 404, "Unable to find Tasks");
    //return res.status(404).json({ err: "Unable to find Tasks" });
  }
};

export const updateTaskById = async (req, res) => {
  const id = Number(req.params.id);
  // console.log("ID", id);

  if (!req.body.taskName) {
    return res.status(400).json("Missing task name");
  }

  if (!req.body.taskDescription) {
    return res.status(400).json("Missing task description");
  }

  const foundTask = await dbClient.task.findUnique({
    where: { id },
  });
  // console.log("I'm here");
  // console.log("Found Task", foundTask);
  if (!foundTask) {
    return res.status(404).json("Unable to find task to update");
  }
  try {
    const updatedTask = await dbClient.task.update({
      where: { id },
      data: {
        taskName: req.body.taskName,
        taskDescription: req.body.TaskDescription,
        linksUrl: req.body.linksUrl,
      },
    });
    return res.status(201).json(updatedTask);
  } catch (err) {
    return res.status(400).json("Unable to update task");
  }
};

export const deleteTaskById = async (req, res) => {
  const id = Number(req.params.id);

  const foundTask = await dbClient.task.findUnique({
    where: { id },
  });

  if (!foundTask) {
    return res.status(404).json("Unable to find task to delete");
  }

  try {
    const deletedTask = await dbClient.task.delete({ where: { id } });
    return res.status(200).json(deletedTask);
  } catch (err) {
    return res.status(400).json("Unable to delete task");
  }
};
