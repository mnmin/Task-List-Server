import dbClient from "../utils/dbClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRY, JWT_SECRET } from "../utils/config.js";
import { sendDataResponse, sendMessageResponse } from "../utils/responses.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log("REQ EMAIL", email);
  // console.log("password", password);
  if (!email) {
    return res.status(400).json({
      email: "Invalid email provided",
    });
  }

  try {
    const foundUserByEmail = await dbClient.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!foundUserByEmail) {
      return res.status(404).json("email not found");
    }
    const areCredentialsValid = await validateCredentials(
      password,
      foundUserByEmail
    );
    if (!areCredentialsValid) {
      return sendDataResponse(res, 400, {
        email: "Invalid email and/or password provided",
      });
    }
    const token = generateJwt(foundUserByEmail.id);
    // console.log("TOKEN --------------------->", token, foundUserByEmail);
    return sendDataResponse(res, 200, {
      token,
      firstName: foundUserByEmail.firstName,
      lastName: foundUserByEmail.lastName,
    });
  } catch (e) {
    sendMessageResponse(res, 500, "Invalid email and/or password provided");
    throw e;
  }
};

function generateJwt(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

export async function validateCredentials(password, user) {
  if (!user) {
    return false;
  }
  if (!password) {
    return false;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return false;
  }
  return true;
}
