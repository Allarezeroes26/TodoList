import { Outlet } from "react-router-dom";
import {Toaster} from 'react-hot-toast';
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
        <Navbar />
        <div className="flex-1 p-6 overflow-auto bg-base-100">
          <Outlet />
        </div>
        <Toaster />
    </div>
  )
}

export default MainLayout
