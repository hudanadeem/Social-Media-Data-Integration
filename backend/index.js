const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");

const PORT = process.env.PORT || 8080;
// hi backend
console.log("Process port", process.env.PORT);
const app = express();
const TaskModel = require("./models/task");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json({
      tasks: tasks.map((task) => ({
        id: task.id,
        text: task.text,
      })),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to fetch data." });
  }
});

app.post("/task", async (req, res) => {
  const text = req.body.text;
  console.log(req.body.text);
  const task = new TaskModel({
    _id: new mongoose.Types.ObjectId(),
    text,
  });

  try {
    await task.save().catch((e) => console.log(e));
    res.status(201).json({
      message: "Task has been added",
      task: { id: task._id, text: text },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to save." });
  }
});

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DATABASE_NAME,
} = process.env;

const MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}`;

console.log("MONGO URI", MONGO_URI);

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO_URI, {
    dbName: MONGO_DATABASE_NAME,
    user: MONGO_USERNAME,
    pass: MONGO_PASSWORD,
  })
  .then(
    () => {
      console.log(
        `Running mongodb instance at port ${MONGO_PORT} and host ${MONGO_HOSTNAME}`
      );

      app.set("port", PORT);
      app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
      });
    },
    (err) => {
      console.error(`Unable to start mongo at ${MONGO_URI}`);
      console.error(err);
    }
  );
