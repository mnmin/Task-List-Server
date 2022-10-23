import "dotenv/config";
import express from "express";
import "express-async-errors";
import cors from "cors";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import loginRouter from "./routes/login.js";
import { sendDataResponse } from "./utils/responses.js";

//Create a new express application
const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//every router here
app.use("/user", userRouter);
app.use("/task", taskRouter);
app.use("/tasks", taskRouter);
app.use("/login", loginRouter);

// app.get("/", (req, res) => {
//   res.status(200).json({
//     status: "success",
//   });
// });

app.get("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    data: {
      resource: "Not found",
    },
  });
});
app.use((error, req, res, next) => {
  console.error(error);

  if (error.code === "P2025") {
    return sendDataResponse(res, 404, "Record does not exist");
  }

  return sendDataResponse(res, 500);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`\n Server is running on port http://localhost:${port}\n`);
});
