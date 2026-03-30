const Task = require("../models/Task");
const mongoose = require("mongoose");


// ================= CREATE TASK =================
const createTask = async (req, res) => {
  try {
    // ❌ guest user → task create allow nahi
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(200).json({ message: "Guest cannot create tasks" });
    }

    const task = await Task.create({
      title: req.body.title,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= GET TASKS =================
const getTasks = async (req, res) => {
  try {
    // 🔥 FIX: guest user check
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.json([]); // guest → empty tasks
    }

    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= UPDATE TASK =================
const updateTask = async (req, res) => {
  try {
    // ❌ guest user → update allow nahi
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(200).json({ message: "Guest cannot update tasks" });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // check ownership
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // update title
    if (req.body.title !== undefined) {
      task.title = req.body.title;
    }

    // toggle complete
    if (req.body.toggle === true) {
      task.completed = !task.completed;
    }

    await task.save();

    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= DELETE TASK =================
const deleteTask = async (req, res) => {
  try {
    // ❌ guest user → delete allow nahi
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(200).json({ message: "Guest cannot delete tasks" });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // check ownership
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};