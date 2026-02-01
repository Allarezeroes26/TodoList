import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { taskStore } from '../stores/taskStore'
import { Check, Loader, PenLine, Trash, Plus, Timer, RotateCcw, AlertCircle, Clock } from 'lucide-react'
import { formatDueDate } from '../timeFormat/formatTime'
import TaskUpdateForm from '../components/TaskUpdateForm'
import SubTaskForm from '../components/SubTaskForm'

const Task = () => {
  const { id } = useParams()
  const { task, getTask, updateTask } = taskStore()

  const [isSubTaskModalOpen, setIsSubTaskModalOpen] = useState(false);

  useEffect(() => {
    getTask(id)
  }, [id, getTask])

  if (!task) return (
    <div className="flex h-screen items-center justify-center">
      <Loader className="animate-spin text-primary" size={48} />
    </div>
  )

  const totalSubtasks = task.subTasks?.length || 0;
  const completedSubtasks = task.subTasks?.filter(s => s.completed).length || 0;
  const subtaskPercentage = totalSubtasks === 0 ? 0 : Math.round((completedSubtasks / totalSubtasks) * 100);
  
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  const handleDeleteSubTask = async (subIndex) => {
    const newSubTasks = task.subTasks.filter((_, i) => i !== subIndex);
    await updateTask(task._id, { subTasks: newSubTasks });
    await getTask(task._id);
  };

  const handleComplete = async (subIndex) => {
    const newSubTasks = task.subTasks.map((sub, i) =>
      i === subIndex ? { ...sub, completed: !sub.completed } : sub
    );
    await updateTask(task._id, { subTasks: newSubTasks });
    await getTask(task._id);
  };

  const handleTaskDone = async () => {
    const newStatus = task.status === 'completed' ? 'in-progress' : 'completed';
    await updateTask(task._id, { status: newStatus });
    await getTask(task._id);
  };

  const startFocusSession = () => {
    localStorage.setItem("activeTaskTitle", task.title);
  };

  return (
    <div className="flex flex-1 gap-10 font-paragraph flex-col lg:mx-20 pb-20">
      <div className={`${task.status === 'completed' ? 'bg-neutral text-neutral-content' : 'bg-primary text-primary-content shadow-2xl shadow-primary/20'} flex flex-col lg:flex-row min-h-[30vh] p-8 items-baseline lg:items-center gap-5 lg:justify-between py-10 lg:px-10 w-full rounded-[2.5rem] transition-all duration-500`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="badge badge-ghost badge-sm font-black tracking-widest uppercase opacity-70">{task.status}</span>
            {isOverdue && <span className="badge badge-error badge-sm gap-1"><AlertCircle size={12}/> OVERDUE</span>}
          </div>
          <h1 className={`text-4xl lg:text-6xl font-black font-display ${task.status === 'completed' ? 'line-through opacity-50' : ''}`}>
            {task.title.toUpperCase()}
          </h1>
          <h2 className="flex items-center gap-2 text-lg">
            <Clock className="opacity-70" />
            Deadline:
          </h2>
          <span className="font-bold">{formatDueDate(task.dueDate)}</span>
        </div>

        <div className="flex items-center gap-4 bg-black/10 p-4 rounded-3xl backdrop-blur-md">
          <div className="tooltip" data-tip={task.status === 'completed' ? "Undo Completion" : "Mark as Done"}>
            <button onClick={handleTaskDone} className={`btn btn-circle ${task.status === 'completed' ? 'btn-warning' : 'btn-success'}`}>
              {task.status === 'completed' ? <RotateCcw /> : <Check />}
            </button>
          </div>

          <div className="tooltip" data-tip="Focus Session">
             <Link to="/timer" onClick={startFocusSession} className="btn btn-circle btn-secondary">
               <Timer />
             </Link>
          </div>

          <div className="tooltip" data-tip="Edit Details">
            <label htmlFor="update-task-modal" className="btn btn-circle bg-base-100 border-none text-base-content">
              <PenLine />
            </label>
          </div>
        </div>
      </div>
      {totalSubtasks > 0 && (
        <div className="w-full bg-base-200 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 border border-base-300">
           <div className="radial-progress text-primary font-black" style={{ "--value": subtaskPercentage, "--size": "8rem", "--thickness": "12px" }}>
             {subtaskPercentage}%
           </div>
           <div className="flex-1">
             <h3 className="text-xl font-black uppercase tracking-tight">Checklist Progress</h3>
             <p className="opacity-60 mb-4 font-medium">{completedSubtasks} of {totalSubtasks} steps reached. {subtaskPercentage === 100 ? "Ready to archive!" : "Keep going!"}</p>
             <progress className="progress progress-primary w-full h-4" value={subtaskPercentage} max="100"></progress>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-4">
          <h1 className="text-xl font-black font-display uppercase tracking-widest flex items-center gap-2">
            <PenLine size={20} className="text-primary"/> Notes
          </h1>
          <div className="w-full bg-base-200 p-6 rounded-[2rem] min-h-[150px] border border-base-300 shadow-inner">
            {task.description ? <p className="leading-relaxed whitespace-pre-wrap">{task.description}</p> : <p className="italic opacity-40 text-center py-10">No detailed notes provided.</p>}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-black font-display uppercase tracking-widest flex items-center gap-2">
              <Check size={20} className="text-success"/> Sub-Tasks
            </h1>
            <button
              onClick={() => setIsSubTaskModalOpen(true)}
              className="btn btn-sm btn-primary rounded-xl gap-2 shadow-lg shadow-primary/20"
            >
              <Plus className="w-4 h-4" /> New Step
            </button>

          </div>

          <div className="bg-base-100 rounded-[2rem] border border-base-300 overflow-hidden shadow-xl">
            <table className="table w-full">
              <thead className="bg-base-200">
                <tr className="border-none text-xs uppercase tracking-tighter opacity-60">
                  <th className="pl-8">Step Description</th>
                  <th className="text-center">Status</th>
                  <th className="text-right pr-8">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300">
                {task.subTasks?.length > 0 ? (
                  task.subTasks.map((sub, i) => (
                    <tr key={sub._id || i} className="hover:bg-base-200/50 transition-colors border-none group">
                      <td className="pl-8 py-4">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            checked={sub.completed} 
                            onChange={() => handleComplete(i)}
                            className="checkbox checkbox-primary checkbox-sm rounded-md" 
                          />
                          <span className={`${sub.completed ? 'line-through opacity-40 font-normal' : 'font-bold'} transition-all text-base`}>
                            {sub.title}
                          </span>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className={`badge badge-sm text-sm h-[100%] font-black ${sub.completed ? 'badge-success' : 'badge-warning'}`}>
                          {sub.completed ? 'DONE' : 'TO-DO'}
                        </div>
                      </td>
                      <td className="text-right pr-8">
                        <button onClick={() => handleDeleteSubTask(i)} className="btn btn-ghost btn-circle btn-xs text-error opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-20 opacity-30 italic">
                      Break this task into smaller, manageable steps.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <input type="checkbox" id="update-task-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-2xl relative rounded-[2rem]">
          <label htmlFor="update-task-modal" className="btn btn-sm btn-circle absolute right-4 top-4">✕</label>
          <TaskUpdateForm task={task} />
        </div>
      </div>

      {isSubTaskModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-xl relative rounded-[2.5rem]">
            
            <button
              onClick={() => setIsSubTaskModalOpen(false)}
              className="btn btn-sm btn-circle absolute right-4 top-4"
            >
              ✕
            </button>

            <SubTaskForm
              taskId={task._id}
              onAdded={() => setIsSubTaskModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Task;
