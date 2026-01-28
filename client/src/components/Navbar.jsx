import React, { useState } from "react";
import { userAuth } from "../stores/authStore";
import { Home, CheckSquare, Settings, LogOut, Menu } from "lucide-react";
import avatar from '../assets/avatar.png'


const Navbar = () => {
  const { authUser } = userAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`flex flex-col bg-base-200 min-h-screen font-paragraph transition-all ${
        collapsed ? "w-20" : "w-80"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-base-300">
        {!collapsed && <h1 className="font-bold font-display text-3xl">TODO APP</h1>}
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu />
        </button>
      </div>

      <div
        className={`flex items-center gap-3 p-4 border-b border-base-300 ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <img
          src={authUser?.profilePic || avatar}
          alt="User"
          className="w-10 h-10 rounded-full"
        />
        {!collapsed && (
          <div>
            <p className="font-medium">{authUser?.name}</p>
            <p className="text-sm opacity-70">{authUser?.email}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <ul className="flex-1 p-4 space-y-2">
        <li>
          <a className="flex items-center gap-3 hover:bg-base-300 rounded p-2">
            <Home />
            {!collapsed && "Home"}
          </a>
        </li>
        <li>
          <a className="flex items-center gap-3 hover:bg-base-300 rounded p-2">
            <CheckSquare />
            {!collapsed && "Tasks"}
          </a>
        </li>
        <li>
          <a className="flex items-center gap-3 hover:bg-base-300 rounded p-2">
            <Settings />
            {!collapsed && "Settings"}
          </a>
        </li>
      </ul>

      {/* Logout */}
      <div className="p-4 border-t border-base-300">
        <button className="flex items-center gap-3 w-full hover:bg-base-300 rounded p-2">
          <LogOut />
          {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
