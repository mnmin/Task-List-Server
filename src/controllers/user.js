import dbClient from "../utils/dbClient.js";
import { sendDataResponse } from "../utils/responses.js";

export const createUser = async (req, res) => {
  const { email, password, firstName, lastName} = req.body;
  // console.log("user", email, password, firstName, lastName)

  if (!email) {
    return res.status(400).json("Must provide email");
  }
  if (!password) {
    return res.status(400).json("Must provide password");
  } 
  
  const existingUser = await dbClient.user.findUnique({
      where: {
        email: email
      }
    })

    if (existingUser) {
    return res.status(400).json("email already exists")
  }

  try {
    const createdUser = await dbClient.user.create({
      data: {
        email,
        password,
        profile: {
          create: {
            firstName, 
            lastName
          },
        },
      }
    })
    return res.status(201).json({user: createdUser})
  } catch (err) {
    return res.status(400).json("Unable to create user");
  }
};
