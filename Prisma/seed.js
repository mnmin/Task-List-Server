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
    //console.log("user", user, iter);
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
      //console.log("Task", task);
      //tasks.push(await createTask(i, user));
      tasks.push(task);
      console.log("Task", tasks[0]);
    }
  });

  console.log("Tasks", tasks);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
