import { Outlet, useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import DrawerSidebar from "../components/DrawerSidebar";

const formatTime = (seconds) => {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [d && `${d}d`, h && `${h}h`, m && `${m}m`, `${s}s`].filter(Boolean).join(" ");
};

const MainLayout = () => {
  const location = useLocation();
  const toastIdRef = useRef(null);

  useEffect(() => {
    if (location.pathname === "/timer") {
      if (toastIdRef.current) toast.dismiss(toastIdRef.current);
      return;
    }

    const updateToast = () => {
      const isRunning = localStorage.getItem("timerRunning") === "true";
      const end = localStorage.getItem("timerEnd");

      if (isRunning && end) {
        const remaining = Math.floor((end - Date.now()) / 1000);

        if (remaining > 0) {
          toastIdRef.current = toast(`⏳ Timer running — ${formatTime(remaining)} left`, {
            id: "global-timer-toast",
            icon: "⏱️",
            duration: Infinity,
          });
        } else {
          toast.success("Time is up!", { id: "global-timer-toast" });
          setTimeout(() => toast.dismiss("global-timer-toast"), 3000);
        }
      } else {
        if (toastIdRef.current) {
          toast.dismiss("global-timer-toast");
          toastIdRef.current = null;
        }
      }
    };

    updateToast();

    const interval = setInterval(updateToast, 1000);

    return () => {
      clearInterval(interval);
      toast.dismiss("global-timer-toast");
    };
  }, [location.pathname]);

  return (
    <>
      <DrawerSidebar>
        <Outlet />
      </DrawerSidebar>
      <Toaster position="top-center" />
    </>
  );
};

export default MainLayout;