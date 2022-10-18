import dbClient from "../utils/dbClient.js";

export const createNewTask = async (req, res) => {
  const { taskName, taskDescription, linksUrl } = req.body;
  const createdById = Number(req.user.id);
  console.log("REQ BODY", taskName, taskDescription, linksUrl);
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
        createdById,
      },
    });
    console.log("CREATED TASK", createdTask);
    return res.status(201).json({ task: createdTask });
  } catch (err) {
    return res.status(400).json("Unable to create task");
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const allTasks = await dbClient.task.findMany();
    return res.status(200).json({ allTasks });
  } catch (err) {
    return res.status(400).json({ err: "Unable to find Tasks" });
  }
};
