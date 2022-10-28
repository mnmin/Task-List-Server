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
  const createTask = async (iter, userId) => {
    const newtask = await prisma.task.create({
      data: {
        taskName: `task${iter} name`,
        taskDescription: `task${iter} Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        linksUrl: 'https://en.wikipedia.org/wiki/Lorem_ipsum',
        topics: [`task${iter} topic${iter}`, `task${iter} topic${iter + 1}`],
        createdBy: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return newtask;
  };
  for (let userIter = 1; userIter <= users.length; userIter++) {
    for (let taskIter = 1; taskIter <= taskIterator; taskIter++) {
      tasks.push(await createTask(taskIter, userIter));
    }
  }
  console.log("Tasks", tasks);

  const topicIterator = 1;
  const topics = [];
  const createTopic = async (iter, userId) => {
    const newTopic = await prisma.topic.create({
      data: {
        topicName: `topic${iter} name`,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return newTopic;
  };
  for (let userIter = 1; userIter <= users.length; userIter++) {
    for (let topicIter = 1; topicIter <= topicIterator; topicIter++) {
      topics.push(await createTopic(topicIter, userIter));
    }
  }
  console.log("Topics", topics);

  //   const checkListIterator = 1;
  //   const checkLists = [];
  //   const createCheckList = async (iter, taskId) => {
  //     const newCheckListItem = await prisma.checkList.create({
  //       data: {
  //         content: `checklist description${iter}`,
  //         task: {
  //           connect: {
  //             id: taskId,
  //           },
  //         },
  //       },
  //     });
  //     return newCheckListItem;
  //   };
  //   for (let taskIter = 1; taskIter <= tasks.length; taskIter++) {
  //     for (
  //       let checklistIter = 1;
  //       checklistIter <= checkListIterator;
  //       checklistIter++
  //     ) {
  //       checkLists.push(await createCheckList(checklistIter, taskIter));
  //     }
  //   }
  //   console.log("CheckList", checkLists);
}

seed().catch(async (error) => {
  console.error("Error", error);
  await prisma.$disconnect();
  process.exit(1);
});
