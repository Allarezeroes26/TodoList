const express = require("express");
const router = express.Router();
const authUpdate = require("../middleware/authMiddleware");
const { createTask, updateTask, getTask, getTasks, deleteTask } = require('../controllers/taskController')

router.use(authUpdate);

router.post("/create-task", authUpdate, createTask);
router.put("/update-task/:id", authUpdate, updateTask);
router.get("/get-task/:id", authUpdate, getTask);
router.get("/get-tasks", authUpdate, getTasks);
router.delete("/delete-task/:id", authUpdate, deleteTask);

module.exports = router;
