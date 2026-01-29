import React, { useState } from "react";
import { userAuth } from "../stores/authStore";
import { Home, CheckSquare, Settings, Timer, LogOut, Menu } from "lucide-react";
import avatar from '../assets/avatar.png'
import { Link } from 'react-router-dom'


const Navbar = () => {
  const { authUser, logout } = userAuth();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault()
    await logout()
  }

  return (
    <div
      className={`flex flex-col bg-base-200 min-h-screen font-paragraph transition-all ${
        collapsed ? "w-18" : "w-80"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-base-300">
        {!collapsed && <h1 className="font-bold font-display text-3xl">TD</h1>}
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
            <p className="font-medium font-display">{authUser?.name}</p>
            <p className="text-sm opacity-70">{authUser?.email}</p>
          </div>
        )}
      </div>

      <ul className="flex-1 p-4 space-y-2">
        <li>
          <Link className="flex items-center gap-3 hover:bg-base-300 rounded p-2" to='/'>
              <Home />
              {!collapsed && "Home"}
          </Link>
        </li>
        <li>
          <Link className="flex items-center gap-3 hover:bg-base-300 rounded p-2" to='/tasks'>
              <CheckSquare />
              {!collapsed && "Tasks"}
          </Link>
        </li>
        <li>
            <Link className="flex items-center gap-3 hover:bg-base-300 rounded p-2" to='/settings'>
              <Settings />
              {!collapsed && "Settings"}
            </Link>
        </li>
        <li>
            <Link className="flex items-center gap-3 hover:bg-base-300 rounded p-2" to='/timer'>
              <Timer />
              {!collapsed && "Timer"}
            </Link>
        </li>
      </ul>
      <div className="p-4 border-t border-base-300">
        <button onClick={handleLogout} className="flex items-center gap-3 w-full hover:bg-base-300 rounded p-2">
          <LogOut />
          {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
