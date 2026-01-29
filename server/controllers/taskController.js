const taskModel = require('../models/taskModel')

const createTask = async (req, res) => {
    try {
        const { title, description, status, duedate  } = req.body;

        if (!title) {
            return res.status(400).json({ success: false, message: "Title is required" })
        }

        const newTask = await taskModel.create({
            title,
            description,
            status,
            duedate,
            user: req.user._id
        })

        res.status(201).json({ success: true, task: newTask })
    } catch (err) {
        console.log("Error creating task", err)
        res.status(500).json({ success: false, message: "Failed creating task" })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, duedate } = req.body;

        const tasks = await taskModel.findOne({ id: _id, user: req.user._id })

        if ( title !== undefined ) tasks.title = title;
        if ( description !== undefined ) tasks.description = description; 
        if ( status !== undefined ) tasks.status = status;
        if ( duedate !== undefined ) tasks.duedate = duedate;

        await tasks.save()

        res.status(200).json({ success: true, tasks })

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Failed updating tasks" })
    }
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