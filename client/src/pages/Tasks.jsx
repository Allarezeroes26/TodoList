import React, { useEffect, useState } from "react";
import { taskStore } from "../stores/taskStore";
import { Delete, Search } from "lucide-react";

const Tasks = () => {
  const { tasks, createTask, getTasks, deleteTask } = taskStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const colors = [
    "bg-primary text-primary-content",
    "bg-secondary text-secondary-content",
    "bg-accent text-accent-content",
    "bg-info text-info-content",
    "bg-success text-success-content",
    "bg-warning text-warning-content",
    "bg-error text-error-content",
    "bg-neutral text-neutral-content",
  ];

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const filteredTasks = tasks?.filter((task) => {
    const matchesSearch = task.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? task.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  }) || [];

  const handleAdd = async (e) => {
    e.preventDefault();
    await createTask({ title, description, dueDate, status: 'pending' });
    setTitle("");
    setDescription("");
    setDueDate(new Date());
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    await getTasks();
  }

  return (
    <div className="min-h-screen font-paragraph p-6 space-y-6 bg-base-100">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold font-display">All Tasks</h1>
        <div className="flex items-center bg-base-200 rounded-lg p-2 w-full md:w-80">
          <Search className="h-5 w-5 opacity-50 mr-2" />
          <input
            type="search"
            placeholder="Search tasks..."
            className="input input-ghost w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Add Task & Sort */}
      <div className="flex flex-row justify-between items-center">
        {/* Add Task Modal */}
        <label htmlFor="addtask" className="btn bg-primary">
          Add Task +
        </label>
        <input type="checkbox" id="addtask" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <h1 className="font-display text-xl mb-5">New Task</h1>
            <form onSubmit={handleAdd}>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-md">Task Title</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <p className="label">Required</p>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Task Description</legend>
                <textarea
                  className="textarea h-24"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Type Here"
                ></textarea>
                <div className="label">Optional</div>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-md">Due Date & Time</legend>
                <input
                  type="datetime-local"
                  className="input"
                  value={dueDate.toISOString().slice(0, 16)}
                  onChange={(e) => setDueDate(new Date(e.target.value))}
                  required
                />
                <p className="label">Required</p>
              </fieldset>

              <div className="modal-action">
                <button className="btn bg-danger">Add</button>
                <label htmlFor="addtask" className="btn">
                  Close!
                </label>
              </div>
            </form>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn bg-accent m-1">
            { !filterStatus ? <p>All</p> : filterStatus }
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-accent-content rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <a onClick={() => setFilterStatus("completed")}>Completed</a>
            </li>
            <li>
              <a onClick={() => setFilterStatus("pending")}>Pending</a>
            </li>
            <li>
              <a onClick={() => setFilterStatus("in-progress")}>In-Progress</a>
            </li>
            <li>
              <a onClick={() => setFilterStatus("")}>All</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-min">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => {
            const colorClass = colors[index % colors.length];
            return (
              <div
                key={task._id || index}
                className={`p-6 rounded-3xl flex flex-col justify-between transition-transform hover:scale-[1.02] ${colorClass}`}
              >
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">
                    {task.status}
                  </span>
                  <h3 className="font-bold mt-1 leading-tight text-lg">{task.title}</h3>
                  <p className="mt-2 text-sm opacity-70 line-clamp-3">{task.description}</p>
                </div>

                {task.subTasks?.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-bold font-display mb-2">Subtasks:</h4>
                    {task.subTasks.map((st, i) => (
                      <div key={i} className="flex flex-row w-full">
                        <p className={`font-light ${st.completed ? "line-through opacity-70" : ""}`}>
                          {st.title}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between border-t border-current border-opacity-10 pt-3">
                  <span className="text-xs font-medium">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "-"}
                  </span>
                  <div className="flex flex-row gap-3">
                    <button onClick={() => handleDelete(task._id)} className="size-8 rounded-full bg-base-100/20 hover:scale-105 duration-150 transition-all flex items-center justify-center"><Delete /></button>
                    <button className="w-8 h-8 rounded-full bg-base-100/20 hover:scale-105 duration-150 transition-all flex items-center justify-center">→</button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-lg opacity-60">No tasks found.</div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
