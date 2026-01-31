const express = require("express");
const router = express.Router();
const authUpdate = require("../middleware/authMiddleware");
const { createTask, updateTask, getTask, getTasks, deleteTask } = require('../controllers/taskController')

router.use(authUpdate);

router.post("/create-task", createTask);
router.put("/update-task/:id", updateTask);
router.get("/get-task/:id", getTask);
router.get("/get-tasks", getTasks);
router.delete("/delete-task/:id", deleteTask);

module.exports = router;
