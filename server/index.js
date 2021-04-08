import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Task from "./src/models/Task";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.get("/api/tasks/", async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
});

app.post("/api/tasks/", (req, res) => {
  const newTask = new Task({
    text: req.body.text,
    day: req.body.day,
    reminder: req.body.reminder,
  });
  newTask.save();
  res.json(newTask);
});

app.delete("/api/tasks/:id", (req, res) => {
  console.log(req.params.id);
  Task.findByIdAndDelete(req.params.id, function (err) {
    if (err) return res.send(500);
    res.send(200);
  });
});

app.listen(5000, () => console.log("Listening on port 8000"));
