const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Task = require("../models/Task");

// GET TASKS
router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
});

// ADD TASK
router.post("/", authMiddleware, async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      user: req.user,
    });

    res.json(task);
  } catch (error) {
    console.log("TASK ERROR:", error.message); // 🔥 VERY IMPORTANT
    res.status(500).json({ message: "Task failed" });
  }
});

// DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;