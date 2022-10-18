import dbClient from "../utils/dbClient.js";

export const createNewTask = async (req, res) => {
  const { taskName, taskDescription, linksUrl } = req.body;
  //const taskId = Number(req.params.id);
  console.log("REQ BODY", taskName, taskDescription, linksUrl);
  // console.log("TASK ID", taskId);
  // const id = Number(req.user.id);

  if (!taskName) {
    return res.status(400).json("A task must have a name");
  }
  if (!taskDescription) {
    return res.status(400).json("A task must have a description");
  }

  //   const existingTask = await dbClient.task.findUnique({
  //     where: {
  //       id: taskId,
  //     },
  //   });

  //   if (existingTask) {
  //     return res.status(400).json("Task already exists");
  //   }

  try {
    const createdTask = await dbClient.task.create({
      data: {
        taskName,
        taskDescription,
        linksUrl,
      },
      //   include: {
      //     user: {
      //       select: {
      //         id: true,
      //       },
      //     },
      //   },
    });
    //console.log("CREATED TASK", createdTasker);
    return res.status(201).json({ task: createdTask });
  } catch (err) {
    return res.status(400).json("Unable to create task");
  }
};
