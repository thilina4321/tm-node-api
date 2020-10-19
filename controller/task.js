const Task = require("../model/task");

exports.createTask = async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.readTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.readTask = async (req, res) => {
  const id = req.params.id;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).send({
        error: "Task not found",
      });
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
};
