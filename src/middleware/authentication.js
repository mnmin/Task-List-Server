// import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config.js";
import dbClient from "../utils/dbClient.js";

export const authentication = async (req, res, next) => {
  try {
    const [_, token] = req.get("authorization").split(" ");

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("decoded", decoded);
    const user = await dbClient.user.findFirst({
      where: {
        id: decoded.id,
      },
    });

    req.user = user;
  } catch (err) {
    return res.status(500).json({ err: "Something went wrong." });
  }

  next();
};
