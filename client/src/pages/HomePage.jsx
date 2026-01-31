import React, { useEffect } from "react";
import { userAuth } from "../stores/authStore";
import { taskStore } from "../stores/taskStore";
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { authUser, isCheckingAuth, updateTask } = userAuth();
  const { tasks, getTasks } = taskStore();

  useEffect(() => {
    if (!isCheckingAuth && authUser) {
      getTasks();
    }
  }, [authUser, isCheckingAuth, getTasks]);

  const topTasks = tasks
    .filter(t => t.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 4);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const onVisit = async (id) => {
    const task = tasks.find(t => t._id === id);
    if(!task) return;
    if (task.status !== 'in-progress' && task.status !== 'completed') {
      await updateTask(id, { status: 'in-progress' });
    }
  };

  const colors = [
    "bg-primary text-primary-content",
    "bg-secondary text-secondary-content",
    "bg-accent text-accent-content",
    "bg-info text-info-content",
  ];

  if (isCheckingAuth || !authUser) return null;

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-base-100 font-paragraph">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-8 space-y-8">
          <header className="flex flex-col gap-2">
            <h1 className="text-4xl font-black font-display tracking-tight">
              Hi, {authUser?.name.split(' ')[0]} 👋
            </h1>
            <p className="text-xl opacity-60">
              {progressPercent === 100 ? "All caught up! Time to relax? ☕" : "Let's crush those goals today."}
            </p>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-base-200 p-4 rounded-2xl shadow-sm border border-base-300">
              <p className="text-xs uppercase font-bold opacity-50">Pending</p>
              <p className="text-2xl font-black">{totalTasks - completedTasks}</p>
            </div>
            <div className="bg-base-200 p-4 rounded-2xl shadow-sm border border-base-300">
              <p className="text-xs uppercase font-bold opacity-50">Done</p>
              <p className="text-2xl font-black">{completedTasks}</p>
            </div>
            <div className="md:col-span-2 bg-primary text-primary-content p-4 rounded-2xl shadow-lg flex items-center justify-between">
               <div>
                  <p className="text-xs uppercase font-bold opacity-80">Overall Progress</p>
                  <p className="text-2xl font-black">{progressPercent}%</p>
               </div>
               <div className="radial-progress text-primary-content/30" style={{ "--value": progressPercent, "--size": "3rem" }}>
                  <span className="text-[10px] text-primary-content font-bold">{progressPercent}%</span>
               </div>
            </div>
          </div>

          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-black font-display uppercase tracking-tighter">Focus Tasks 🔥</h2>
              <Link to="/tasks" className="text-sm font-bold link link-primary no-underline">View all tasks →</Link>
            </div>

            {tasks.length === 0 ? (
              <div className="text-center py-12 bg-base-200 rounded-3xl border-2 border-dashed border-base-300">
                <p className="opacity-50">No tasks found. Ready to start something new?</p>
                <Link to="/create-task" className="btn btn-primary btn-sm mt-4">Create Task</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topTasks.map((task, index) => (
                  <div key={task._id} className={`${colors[index % colors.length]} p-6 rounded-[2rem] shadow-xl hover:rotate-1 transition-transform cursor-pointer relative overflow-hidden group`}>
                    <div className="relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-widest bg-black/10 px-2 py-1 rounded-lg">
                          {task.status}
                        </span>
                        <h3 className="text-xl font-bold mt-3 leading-tight group-hover:underline">{task.title}</h3>
                        
                        <div className="mt-4 space-y-1">
                          {task.subTasks?.slice(0, 2).map((st, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm opacity-80">
                              <div className={`w-2 h-2 rounded-full ${st.completed ? 'bg-success' : 'bg-base-100/50'}`} />
                              <span className={st.completed ? "line-through" : ""}>{st.title}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 flex justify-between items-center">
                          <span className="text-xs font-bold opacity-70">
                            📅 {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
                          </span>
                          <Link to={`/task/${task._id}`} onClick={() => onVisit(task._id)}>
                            <button className="btn btn-circle btn-sm bg-base-100/20 border-none hover:bg-base-100 text-current">→</button>
                          </Link>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="lg:col-span-4 space-y-6">
          
          <div className="card bg-neutral text-neutral-content shadow-2xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-sm uppercase tracking-widest opacity-60 font-bold">Session Timer</h2>
              <div className="text-5xl font-mono font-black my-2">00:00</div>
              <div className="flex gap-2 w-full mt-2">
                <Link to="/timer" className="btn btn-primary btn-block rounded-xl">Start Focus</Link>
              </div>
            </div>
          </div>

          <div className="bg-warning text-warning-content p-6 rounded-[2rem] shadow-lg italic font-medium">
            "Your mind is for having ideas, not holding them." 
            <p className="text-right not-italic font-bold mt-2 text-xs">— David Allen</p>
          </div>

          <div className="bg-base-200 p-6 rounded-[2rem] border border-base-300">
            <h3 className="font-bold mb-4">Daily Activity</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-bold">
                <span>Task Completion</span>
                <span>{progressPercent}%</span>
              </div>
              <progress className="progress progress-primary w-full h-3" value={progressPercent} max="100"></progress>
              <p className="text-[10px] opacity-60 leading-tight mt-2">
                Tip: Completing subtasks counts toward your daily streak!
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;