import { useState, useEffect } from "react";
import { taskStore } from "../stores/taskStore";

const TaskUpdateForm = ({ task }) => {
  const { updateTask, getTask } = taskStore();

  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [dueDate, setDueDate] = useState(task.dueDate ? new Date(task.dueDate) : new Date());
  const [status, setStatus] = useState(task.status || "pending");

  useEffect(() => {
    setTitle(task.title || "");
    setDescription(task.description || "");
    setDueDate(task.dueDate ? new Date(task.dueDate) : new Date());
    setStatus(task.status || "pending");
  }, [task]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateTask(task._id, { title, description, dueDate, status });
    await getTask(task._id);
    document.getElementById("update-task-modal").checked = false;
  };

  return (
    <form onSubmit={handleUpdate}>
      <h1 className="font-display text-xl mb-5">Update Task</h1>

      <fieldset className="fieldset">
        <legend className="fieldset-legend text-md">Task Title</legend>
        <input
          type="text"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </fieldset>

      <fieldset className="fieldset mt-3">
        <legend className="fieldset-legend">Task Description</legend>
        <textarea
          className="textarea h-24"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </fieldset>

      <fieldset className="fieldset mt-3">
        <legend className="fieldset-legend text-md">Due Date & Time</legend>
        <input
          type="datetime-local"
          className="input"
          value={dueDate.toISOString().slice(0, 16)}
          onChange={(e) => setDueDate(new Date(e.target.value))}
          required
        />
      </fieldset>

      <fieldset className="fieldset mt-3">
        <legend className="fieldset-legend">Status</legend>
        <select
          className="select w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </fieldset>

      <div className="modal-action mt-4">
        <button className="btn bg-success" type="submit">Update</button>
      </div>
    </form>
  );
};

export default TaskUpdateForm;
