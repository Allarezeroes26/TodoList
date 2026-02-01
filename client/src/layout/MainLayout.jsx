import { Outlet, useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useEffect, useRef } from "react";
import DrawerSidebar from "../components/DrawerSidebar";
import { userAuth } from "../stores/authStore";

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
  const { authUser } = userAuth();

  useEffect(() => {
    const updateToast = () => {
      const isRunning = localStorage.getItem("timerRunning") === "true";
      const end = localStorage.getItem("timerEnd");

      // dismiss toast if user logs out or is on the timer page
      if (!authUser || location.pathname === "/timer" || !isRunning || !end) {
        if (toastIdRef.current) {
          toast.dismiss(toastIdRef.current);
          toastIdRef.current = null;
        }
        return;
      }

      const remaining = Math.floor((end - Date.now()) / 1000);

      if (remaining <= 0) {
        toast.success("Time is up!", { id: "global-timer-toast" });
        toastIdRef.current = null;
        return;
      }

      // Create toast only if it doesn't exist
      if (!toastIdRef.current) {
        toastIdRef.current = toast(
          ({ id }) => (
            <div className="flex items-center justify-between gap-4">
              <span>⏳ Timer running — {formatTime(remaining)} left</span>
              <button
                onClick={() => toast.dismiss(id)}
                className="btn btn-xs btn-circle btn-ghost text-base-content/70"
                title="Close"
              >
                ✕
              </button>
            </div>
          ),
          { id: "global-timer-toast", duration: Infinity }
        );
      } else {
        // Update toast content dynamically
        toast.update(toastIdRef.current, {
          render: (
            <div className="flex items-center justify-between gap-4">
              <span>⏳ Timer running — {formatTime(remaining)} left</span>
              <button
                onClick={() => toast.dismiss(toastIdRef.current)}
                className="btn btn-xs btn-circle btn-ghost text-base-content/70"
                title="Close"
              >
                ✕
              </button>
            </div>
          ),
        });
      }
    };

    updateToast();
    const interval = setInterval(updateToast, 1000);

    return () => {
      clearInterval(interval);
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
        toastIdRef.current = null;
      }
    };
  }, [location.pathname, authUser]);

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
