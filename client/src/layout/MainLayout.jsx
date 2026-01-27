import { Outlet } from "react-router-dom";
import {Toaster} from 'react-hot-toast';
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>
        <Navbar />
        <Toaster />
        <Outlet />
    </div>
  )
}

export default MainLayout
