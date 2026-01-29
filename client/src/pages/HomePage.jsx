import React, { useState } from 'react';
import { userAuth } from '../stores/authStore';
import { CheckLine, X } from 'lucide-react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const HomePage = () => {
  const { authUser } = userAuth();
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Do some portfolio', completed: false },
    { id: 2, title: 'Get a Job!', completed: false },
    { id: 3, title: 'Throw waste!', completed: false },
    { id: 4, title: 'Review CS', completed: false },
  ]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const ongoingTasks = totalTasks - completedTasks;

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Data for PieChart
  const chartData = [
    { name: 'Completed', value: completedTasks },
    { name: 'Ongoing', value: ongoingTasks },
  ];

  const COLORS = ['#22c55e', '#f87171']; // green for completed, red for ongoing

  return (
    <div className="flex flex-col items-center min-h-screen font-paragraph p-6">
      
      {/* Stats */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full mb-10">
        {[
          { title: 'All Tasks', value: totalTasks },
          { title: 'Completed Tasks', value: completedTasks },
          { title: 'Ongoing Tasks', value: ongoingTasks },
        ].map((stat, idx) => (
          <div key={idx} className="stats bg-base-200 shadow rounded-lg p-4 flex flex-col items-center lg:flex-row">
            <div className="stat">
              <div className="stat-title text-lg lg:text-xl">{stat.title}</div>
              <div className="stat-value text-2xl lg:text-3xl">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl flex flex-col lg:flex-row gap-6">

        {/* TODO List */}
        <div className="w-full lg:w-1/2">
          <div className="card bg-base-200 shadow-md">
            <div className="card-body">
              <h2 className="card-title font-display text-xl mb-4">TODO LIST</h2>
              <ul className="list bg-base-300 rounded-box p-2 space-y-2">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center gap-4 p-2 rounded hover:bg-base-200 cursor-pointer"
                    onClick={() => toggleTask(task.id)}
                  >
                    <div className="text-2xl font-thin opacity-40 tabular-nums w-6 text-center">
                      {task.id}
                    </div>
                    <div className="flex-1">
                      <div className={`${task.completed ? 'line-through opacity-60' : ''}`}>
                        {task.title}
                      </div>
                      <div className="text-xs uppercase font-semibold opacity-60 flex items-center gap-1">
                        Completed? {task.completed ? <CheckLine className="text-green-500" /> : <X className="text-red-500" />}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Productivity Chart */}
        <div className="w-full lg:w-1/2 bg-base-200 shadow-md rounded-lg p-4 flex flex-col items-center justify-center">
          <h2 className="font-display text-xl mb-4">Productivity Tracker</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
      
    </div>
  );
};

export default HomePage;
