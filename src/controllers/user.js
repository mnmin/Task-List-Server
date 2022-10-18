import dbClient from "../utils/dbClient.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const createUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email) {
    return res.status(400).json("Must provide email");
  }
  if (!password) {
    return res.status(400).json("Must provide password");
  }

  const existingUser = await dbClient.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return res.status(400).json("email already exists");
  }

  const encryptedPw = await bcrypt.hash(password, saltRounds);

  try {
    const createdUser = await dbClient.user.create({
      data: {
        email,
        password: encryptedPw,
        profile: {
          create: {
            firstName,
            lastName,
          },
        },
      },
    });
    return res.status(201).json({ user: createdUser });
  } catch (err) {
    return res.status(400).json("Unable to create user");
  }
};

export const getUserById = async (req, res) => {
  const userId = Number(req.params.id);
  console.log("user ID", userId);

  try {
    const foundUser = await dbClient.user.findUnique({
      where: {
        user: {
          some: {
            id: userId,
          },
        },
      },
    });
    return res.status(200).json({ user: foundUser });
  } catch (err) {
    return res.status(404).json("User not found");
  }
};
