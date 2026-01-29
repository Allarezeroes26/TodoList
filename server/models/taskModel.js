const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    dueDate: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

const Tasks = mongoose.model("Task", taskSchema)

module.exports = Tasks;