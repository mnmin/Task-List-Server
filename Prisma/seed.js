import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seed() {
  const password = await bcrypt.hash("123", 3);

  const userIterator = 3;

  const users = [];
  const createUser = async (email, password, firstName, lastName) => {
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password,
        profile: {
          create: {
            firstName: firstName,
            lastName: lastName,
          },
        },
      },
    });
    return newUser;
  };

  for (let i = 1; i <= userIterator; i++) {
    users.push(
      await createUser(
        `user${i}@user.com`,
        password,
        `firstName${i}`,
        `lastName${i}`
      )
    );
  }

  console.log("Users", users);

  const taskIterator = 6;

  const tasks = [];

  const createTask = async (iter, user) => {
    const newtask = await prisma.task.create({
      data: {
        taskName: `task${iter} name`,
        taskDescription: `task${iter} description`,
        linksUrl: `task${iter} URL`,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return newtask;
  };

  users.forEach(async (user) => {
    for (let i = 1; i <= taskIterator; i++) {
      let task = await createTask(i, user);
      tasks.push(task);
      console.log("Task", tasks[0]);
    }
  });

  console.log("Tasks", tasks);

  const topicIterator = 4;

  const topics = [];

  const createTopic = async (iter, user) => {
    const newTopic = await prisma.topic.create({
      data: {
        topicName: `topic${iter} name`,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return newTopic;
  };

  users.forEach(async (user) => {
    for (let i = 1; i <= topicIterator; i++) {
      let topic = await createTopic(i, user);
      topics.push(topic);
      console.log("Topics", topics[0]);
    }
  });
  console.log("Topics", topics);

  const checkListIterator = 4;

  const checkLists = [];

  const createCheckList = async (iter, task) => {
    console.log("TASK ------------->", task);
    const newCheckListItem = await prisma.checkList.create({
      data: {
        description: `checklist description${iter}`,
        task: {
          connect: {
            id: task.id,
          },
        },
      },
    });
    console.log("newCheckListItem------------------>", newCheckListItem);
    return newCheckListItem;
  };

  tasks.forEach(async (task) => {
    for (let i = 1; i <= checkListIterator; i++) {
      let checkList = await createCheckList(i, task);
      checkLists.push(checkList);
      console.log("CheckList", checkList[0]);
    }
  });
  console.log("CheckList", checkLists);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
