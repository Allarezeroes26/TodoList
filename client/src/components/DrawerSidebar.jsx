import React from "react";
import { userAuth } from "../stores/authStore";
import {
  Home,
  CheckSquare,
  Settings,
  Timer,
  LogOut,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";

const DrawerSidebar = ({ children }) => {
  const { authUser, logout } = userAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };

  return (
    <div className="drawer font-paragraph lg:drawer-open">
      <input id="app-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-100 border-b border-base-300 lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="app-drawer"
              className="btn btn-ghost btn-square"
            >
              <Menu />
            </label>
          </div>
          <div className="flex-1">
            <span className="text-xl font-bold font-display">TD</span>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4">{children}</main>
      </div>

      <div className="drawer-side">
        <label htmlFor="app-drawer" className="drawer-overlay"></label>

        <aside className="w-64 min-h-full bg-base-200 flex flex-col">
          <div className="p-4 border-b border-base-300">
            <h1 className="text-3xl font-bold font-display">TD</h1>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 p-4 border-b border-base-300">
            <img
              src={authUser?.profilePic || avatar}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium font-display">
                {authUser?.name}
              </p>
              <p className="text-sm opacity-70">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <ul className="menu p-4 flex-1 w-full font-paragraph tracking-wider font-bold text-md">
            <li>
              <Link to="/">
                <Home size={18} />
                HOME
              </Link>
            </li>
            <li>
              <Link to="/tasks">
                <CheckSquare size={18} />
                TASKS
              </Link>
            </li>
            <li>
              <Link to="/timer">
                <Timer size={18} />
                TIMER
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <Settings size={18} />
                SETTINGS
              </Link>
            </li>
          </ul>

          {/* Logout */}
          <div className="p-4 border-t border-base-300">
            <button
              onClick={handleLogout}
              className="btn btn-ghost w-full justify-start gap-3"
            >
              <LogOut size={18} />
              LOGOUT
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DrawerSidebar;
