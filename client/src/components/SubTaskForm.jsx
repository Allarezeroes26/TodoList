import { useState } from "react";
import { taskStore } from "../stores/taskStore";

const SubTaskForm = ({ taskId, onAdded }) => {
  const { task, updateTask, getTask } = taskStore();
  const [title, setTitle] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (!task || !task.subTasks) {
      console.error("Task not loaded or subTasks undefined");
      return;
    }
    const newSubTasks = [...task.subTasks, { title, completed: false }];

    await updateTask(taskId, { subTasks: newSubTasks });
    await getTask(taskId);
    setTitle("");
    onAdded();
  };

  return (
    <form onSubmit={handleAdd}>
      <h1 className="font-display text-xl mb-5">Add Subtask</h1>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Subtask Title</legend>
        <input
          type="text"
          className="input w-full"
          placeholder="Enter subtask title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </fieldset>

      <div className="modal-action mt-4">
        <button type="submit" className="btn bg-primary">
          Add
        </button>
      </div>
    </form>
  );
};

export default SubTaskForm;
