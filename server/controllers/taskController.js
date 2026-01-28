const taskModel = require('../models/taskModel')

const createTask = (req, res) => {
}

const updateTask = (req, res) => {
}

const getTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await taskModel.findOne({
            _id: id,
            user: req.user._id
        })

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found or unauthorized"
            })
        }

        res.status(200).json({ success: true, task })
    } catch (err) {
        console.log("Error", err)
        res.status(500).json({ success: false, message: 'Failed Getting Task' })
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find({ 
            user: req.user._id
         })
        
         if (!tasks) {
            return res.status(404).json({
                success: false,
                message: "Task not found or unauthorized"
            })
         }
        
         res.status(200).json({ success: true, tasks })

    } catch (err) {
        console.log('Failed fetching tasks', err)
        res.status(500).json({ success: false, message: "Failed to fetch tasks" })
    }
}

const deleteTask = async (req, res) => {
    try {

        const { id } = req.params;

        const task = await taskModel.findOneAndDelete({
            _id: id,
            user: req.user._id
        })

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found or Unauthorized"
            })
        }
        res.status(200).json({ success: true, message: "Task deleted" })
    } catch (err) {
        console.log('Error deleting tasks', err)
        res.status(500).json({ success: false, message: err.message })
    }
}

module.exports = { createTask, updateTask, getTask, getTasks, deleteTask }