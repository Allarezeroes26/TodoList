import React from "react";
import { useEffect } from "react";
import { userAuth } from "../stores/authStore";
import { taskStore } from "../stores/taskStore";

const HomePage = () => {
  const { authUser, isCheckingAuth } = userAuth();
  const { tasks, getTasks } = taskStore();

  useEffect(() => {
    if (!isCheckingAuth && authUser) {
      getTasks();
    }
  }, [authUser, isCheckingAuth, getTasks]);


  const slicedTasks = tasks.slice(0, 4);

  const totalTasks = tasks.reduce((sum, t) => sum + tasks.length, 0);
  const completedTasks = tasks.reduce(
    (sum, t) => sum + tasks.filter(st => st.completed).length,
    0
  );
  const progressPercent =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

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
  
  if (isCheckingAuth) return null;
  if (!authUser) return null;

  return (
    <div className="min-h-screen font-paragraph p-6 space-y-6 bg-base-100">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold">
            Hi, {authUser?.name} 👋
          </h1>
          <p className="font-paragraph text-lg opacity-80">
            Be productive today
          </p>
        </div>
        <div className="bg-base-200 rounded-xl p-4 w-full lg:w-80 shadow-md">
          <h2 className="font-display font-semibold text-lg mb-2">
            Task Progress
          </h2>
          <div className="w-full bg-base-300 rounded-full h-4">
            <div
              className="bg-primary h-4 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-sm mt-2 opacity-70">
            {completedTasks} / {totalTasks} tasks completed ({progressPercent}%)
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <h1 className="text-xl font-paragraph font-extrabold mb-4">
          TOP TASKS 🔥
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-min">
          {slicedTasks.map((task, index) => {
            const colorClass = colors[index % colors.length];
            return (
              <div
                key={task._id}
                className={`p-6 rounded-3xl transition-transform hover:scale-[1.02] flex flex-col justify-between ${colorClass}`}
              >
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase opacity-60">
                    {task.status}
                  </span>
                  <h3 className="font-bold leading-tight mt-1 text-xl">{task.title}</h3>
                  <p className="mt-2 text-sm opacity-70 line-clamp-2">{task.description}</p>
                </div>

                <div className="mt-3">
                  <h1 className="text-sm font-bold font-display mb-3">SUB TASKS: </h1>
                  {task.subTasks.map((st, i) => (
                    <div className="flex flex-row w-full" key={i}>
                      <p className={`font-light ${st.completed ? "line-through" : ""}`}>{st.title}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-current border-opacity-10 pt-4">
                  <span className="text-xs font-medium">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "-"}
                  </span>
                  <button className="w-8 h-8 rounded-full bg-base-100/20 flex items-center justify-center">
                    →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
