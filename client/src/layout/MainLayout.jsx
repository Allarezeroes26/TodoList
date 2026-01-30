import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DrawerSidebar from "../components/DrawerSidebar";

const MainLayout = () => {
  return (
    <>
      <DrawerSidebar>
        <Outlet />
      </DrawerSidebar>

      <Toaster />
    </>
  );
};

export default MainLayout;
