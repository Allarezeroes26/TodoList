import React, { useEffect, useState } from "react";
import { taskStore } from "../stores/taskStore";
import { Delete, Search, Trash2, Calendar, CheckCircle, Clock } from "lucide-react"; // Added Icons
import { Link } from 'react-router-dom';

const Tasks = () => {
  const { tasks, createTask, getTasks, deleteTask, updateTask } = taskStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [ isModalOpen, setIsModalOpen ] = useState(false)

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

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    overdue: tasks.filter(t => t.status !== 'completed' && new Date(t.dueDate) < new Date()).length
  };

  const filteredTasks = tasks?.filter((task) => {
    const matchesSearch = task.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? task.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  }) || [];

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await createTask({ title, description, dueDate, status: 'pending' });
    } catch (err) {
      console.log(err)
    }
    setTitle("");
    setDescription("");
    setDueDate(new Date());
    setIsModalOpen(false)
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    await getTasks();
  }

  const clearCompleted = async () => {
    const completed = tasks.filter(t => t.status === 'completed');
    for (const task of completed) {
      await deleteTask(task._id);
    }
    await getTasks();
  }

  const onVisit = async (id) => {
    const task = tasks.find(t => t._id === id);
    if(!task) return;

    if (task.status !== 'in-progress' && task.status !== 'completed') {
      await updateTask(id, { status: 'in-progress' });
    }
  }

  return (
    <div className="min-h-screen font-paragraph p-6 space-y-6 bg-base-100">
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold font-display uppercase tracking-tighter">My Workspace</h1>
        <div className="flex items-center bg-base-200 rounded-2xl px-4 py-1 w-full md:w-80 shadow-inner">
          <Search className="h-5 w-5 opacity-50 mr-2" />
          <input
            type="search"
            placeholder="Search tasks..."
            className="input input-ghost w-full focus:bg-transparent border-none focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-base-200 p-4 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary"><CheckCircle size={20}/></div>
          <div><p className="text-xs opacity-50 font-bold uppercase">Done</p><p className="font-bold">{stats.completed}</p></div>
        </div>
        <div className="bg-base-200 p-4 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-warning/10 rounded-lg text-warning"><Clock size={20}/></div>
          <div><p className="text-xs opacity-50 font-bold uppercase">Pending</p><p className="font-bold">{stats.pending}</p></div>
        </div>
        <div className="bg-base-200 p-4 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-error/10 rounded-lg text-error"><Calendar size={20}/></div>
          <div><p className="text-xs opacity-50 font-bold uppercase">Overdue</p><p className="font-bold text-error">{stats.overdue}</p></div>
        </div>
        <div className="bg-base-200 p-4 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-info/10 rounded-lg text-info"><Search size={20}/></div>
          <div><p className="text-xs opacity-50 font-bold uppercase">Showing</p><p className="font-bold">{filteredTasks.length}</p></div>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center bg-base-200/50 p-3 rounded-2xl">
        <div className="flex gap-2">
          <label htmlFor="addtask" className="btn btn-primary rounded-xl shadow-lg shadow-primary/20">
            Add Task +
          </label>
          
          {stats.completed > 0 && (
            <button onClick={clearCompleted} className="btn btn-ghost text-error gap-2">
              <Trash2 size={18} /> <span className="hidden sm:inline">Clear Done</span>
            </button>
          )}
        </div>

        <input type="checkbox" onChange={(e) => setIsModalOpen(e.target.checked)} id="addtask" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box rounded-[2rem]">
            <h1 className="font-display text-2xl font-black mb-5">New Task</h1>
            <form onSubmit={handleAdd}>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-bold">Task Title</legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="What needs to be done?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </fieldset>

              <fieldset className="fieldset mt-4">
                <legend className="fieldset-legend font-bold">Details</legend>
                <textarea
                  className="textarea textarea-bordered h-24 w-full"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add some notes..."
                ></textarea>
              </fieldset>

              <fieldset className="fieldset mt-4">
                <legend className="fieldset-legend font-bold">Deadline</legend>
                <input
                  type="datetime-local"
                  className="input input-bordered w-full"
                  value={dueDate.toISOString().slice(0, 16)}
                  onChange={(e) => setDueDate(new Date(e.target.value))}
                  required
                />
              </fieldset>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary px-8 rounded-xl">Create</button>
                <label htmlFor="addtask" className="btn btn-ghost">Cancel</label>
              </div>
            </form>
          </div>
        </div>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn bg-base-300 rounded-xl m-1">
            Filter: { !filterStatus ? "All" : filterStatus }
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow-xl border border-base-300">
            <li><a onClick={() => setFilterStatus("completed")}>✅ Completed</a></li>
            <li><a onClick={() => setFilterStatus("pending")}>⏳ Pending</a></li>
            <li><a onClick={() => setFilterStatus("in-progress")}>🚀 In-Progress</a></li>
            <div className="divider my-0"></div>
            <li><a onClick={() => setFilterStatus("")}>🌍 Show All</a></li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-min">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => {
            const colorClass = colors[index % colors.length];
            const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completed";

            return (
              <div
                key={task._id}
                className={`p-6 rounded-[2rem] flex flex-col justify-between transition-all hover:scale-[1.03] hover:shadow-2xl relative overflow-hidden group ${task.status === 'completed' ? 'bg-neutral opacity-80' : colorClass}`}
              >
                {isOverdue && (
                  <div className="absolute top-4 right-4 bg-error text-error-content text-[8px] font-black px-2 py-1 rounded-full animate-pulse">
                    OVERDUE
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-black tracking-widest uppercase bg-black/10 px-2 py-1 rounded-md">
                    {task.status}
                  </span>
                  <h3 className={`font-bold mt-3 leading-tight text-xl ${task.status === 'completed' ? 'line-through opacity-50' : ''}`}>{task.title}</h3>
                  <p className={`${task.status === 'completed' ? 'line-through opacity-50' : ''} mt-2 text-sm opacity-80 line-clamp-3`}>{task.description}</p>
                </div>

                {task.subTasks?.length > 0 && (
                  <div className="mt-4 bg-black/5 p-3 rounded-2xl">
                    <h4 className="text-[10px] font-black uppercase opacity-50 mb-2">Subtasks</h4>
                    {task.subTasks.slice(0, 3).map((st, i) => (
                      <div key={i} className="flex items-center gap-2 mb-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${st.completed ? 'bg-success' : 'bg-current opacity-30'}`} />
                        <p className={`text-xs truncate ${st.completed ? "line-through opacity-50" : ""}`}>
                          {st.title}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-bold opacity-50">Deadline</span>
                    <span className={`text-xs font-bold ${isOverdue ? 'text-error-content underline' : ''}`}>
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "-"}
                    </span>
                  </div>
                  <div className="flex flex-row gap-2">
                    <button 
                      onClick={() => handleDelete(task._id)} 
                      className="btn btn-circle btn-sm bg-base-100/10 border-none hover:bg-error hover:text-white transition-colors"
                    >
                      <Delete size={16}/>
                    </button>
                    <Link to={`/task/${task._id}`}>
                      <button 
                        onClick={() => onVisit(task._id)} 
                        className="btn btn-circle btn-sm bg-base-100/20 border-none hover:bg-base-100 text-current"
                      >
                        →
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center py-20 opacity-30">
            <Search size={48} />
            <p className="text-xl font-bold mt-4">No tasks match your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;