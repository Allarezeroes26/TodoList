import React, { useState, useEffect, useRef } from "react";
import { userAuth } from "../stores/authStore";
import { Repeat } from "lucide-react";

const Timer = () => {
  const { authUser } = userAuth();
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputs, setInputs] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [mode, setMode] = useState("work"); 
  const [restSeconds, setRestSeconds] = useState(300); 

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!authUser && isRunning) {
      const end = localStorage.getItem("timerEnd");
      if (end) {
        const remaining = Math.max(0, Math.floor((end - Date.now()) / 1000));
        
        localStorage.removeItem("timerEnd");
        localStorage.setItem("pausedTime", remaining);
        localStorage.setItem("timerRunning", "false");
        
        setTimeLeft(remaining);
        setIsRunning(false);
      }
    }
  }, [authUser, isRunning]);

  const getDisplayTime = () => ({
    d: Math.floor(timeLeft / 86400),
    h: Math.floor((timeLeft % 86400) / 3600),
    m: Math.floor((timeLeft % 3600) / 60),
    s: timeLeft % 60,
  });

  const time = getDisplayTime();


  useEffect(() => {
    const end = localStorage.getItem("timerEnd");
    const running = localStorage.getItem("timerRunning");
    const paused = localStorage.getItem("pausedTime");
    const savedMode = localStorage.getItem("timerMode");
    const savedRest = localStorage.getItem("restSeconds");

    if (savedMode) setMode(savedMode);
    if (savedRest) setRestSeconds(parseInt(savedRest));

    if (authUser && running === "true" && end) {
      const remaining = Math.floor((end - Date.now()) / 1000);
      if (remaining > 0) {
        setTimeLeft(remaining);
        setIsRunning(true);
      } else {
        cleanupStorage();
      }
    }

    if (running === "false" && paused) {
      setTimeLeft(parseInt(paused));
    }
  }, [authUser]); 
  
  useEffect(() => {
    if (!isRunning) return;

    const tick = () => {
      const end = localStorage.getItem("timerEnd");
      if (!end) return;

      const remaining = Math.floor((end - Date.now()) / 1000);

      if (remaining <= 0) {
        if (mode === "work") {
          const endTime = Date.now() + restSeconds * 1000;
          localStorage.setItem("timerEnd", endTime);
          localStorage.setItem("timerRunning", "true");
          localStorage.setItem("timerMode", "rest");
          setMode("rest");
          setTimeLeft(restSeconds);
        } else {
          setTimeLeft(0);
          setIsRunning(false);
          cleanupStorage();
        }
      } else {
        setTimeLeft(remaining);
      }
    };

    tick();
    intervalRef.current = setInterval(tick, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode, restSeconds]);

  const cleanupStorage = () => {
    localStorage.removeItem("timerEnd");
    localStorage.removeItem("timerRunning");
    localStorage.removeItem("pausedTime");
    localStorage.removeItem("timerMode");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: Math.max(0, parseInt(value) || 0),
    }));
  };

  const startTimer = () => {
    if (!authUser) return;
    const total = inputs.d * 86400 + inputs.h * 3600 + inputs.m * 60 + inputs.s;
    if (total <= 0) return;

    const endTime = Date.now() + total * 1000;
    localStorage.setItem("timerEnd", endTime);
    localStorage.setItem("timerRunning", "true");
    localStorage.setItem("timerMode", "work");
    localStorage.setItem("restSeconds", restSeconds);
    localStorage.removeItem("pausedTime");

    setMode("work");
    setTimeLeft(total);
    setIsRunning(true);
  };

  const toggleRunning = () => {
    if (isRunning) {
      const end = localStorage.getItem("timerEnd");
      const remaining = Math.floor((end - Date.now()) / 1000);
      localStorage.removeItem("timerEnd");
      localStorage.setItem("pausedTime", remaining);
      localStorage.setItem("timerRunning", "false");
      setTimeLeft(remaining);
      setIsRunning(false);
    } else {
      const remaining = localStorage.getItem("pausedTime");
      if (!remaining) return;
      const endTime = Date.now() + remaining * 1000;
      localStorage.setItem("timerEnd", endTime);
      localStorage.setItem("timerRunning", "true");
      localStorage.removeItem("pausedTime");
      setIsRunning(true);
    }
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setMode("work");
    cleanupStorage();
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-3 sm:px-6">
      <div className="card w-full max-w-3xl bg-base-100 shadow-2xl">
        <div className="card-body items-center text-center gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold">Countdown Timer</h1>
          <p className="text-xs sm:text-sm opacity-70 italic">
            {isRunning ? "Focus mode active..." : "Focus & Make your Time Valuable"}
          </p>
          <div className={`badge mt-2 ${mode === "work" ? "badge-primary" : "badge-success"}`}>
            {mode.toUpperCase()}
          </div>
        </div>

        <div className="flex justify-center px-2">
          <div className="stats stats-vertical sm:stats-horizontal bg-base-200 shadow w-full sm:w-auto overflow-hidden rounded-2xl">
            {Object.entries(time).map(([label, value]) => (
              <div key={label} className="stat place-items-center">
                <div className="stat-value font-mono text-3xl sm:text-4xl md:text-5xl text-primary">
                  {String(value).padStart(2, "0")}
                </div>
                <div className="stat-desc uppercase tracking-widest text-[10px] font-bold">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-body">
          {!isRunning && timeLeft === 0 ? (
            <>
              <div className="divider text-[10px] uppercase font-bold opacity-40">Set Duration</div>
              <div className="grid grid-cols-4 gap-2">
                {["d", "h", "m", "s"].map((unit) => (
                  <div key={unit} className="flex flex-col gap-1">
                    <input
                      type="number"
                      min="0"
                      name={unit}
                      value={inputs[unit]}
                      onChange={handleInputChange}
                      className="input input-bordered text-center font-mono focus:input-primary px-1"
                    />
                    <span className="text-[10px] text-center uppercase opacity-50">{unit}</span>
                  </div>
                ))}
              </div>
              <div className="form-control mt-4">
                <label className="label py-1"><span className="label-text-alt uppercase font-bold opacity-50">Rest Minutes</span></label>
                <input
                  type="number"
                  min="1"
                  value={restSeconds / 60}
                  onChange={(e) => setRestSeconds(e.target.value * 60)}
                  className="input input-bordered input-sm text-center"
                />
              </div>
              <button onClick={startTimer} className="btn btn-primary rounded-xl mt-6">Start Mission</button>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="divider text-[10px] uppercase font-bold opacity-40">Timer Controls</div>
              <div className="flex gap-2">
                <button onClick={toggleRunning} className={`btn flex-1 rounded-xl ${isRunning ? "btn-warning" : "btn-success"}`}>
                  {isRunning ? "Pause Session" : "Resume Session"}
                </button>
                <button onClick={reset} className="btn btn-square btn-outline btn-error rounded-xl">
                   <Repeat />
                </button>
              </div>
            </div>
          )}
        </div>

        {timeLeft === 0 && !isRunning && (
          <div className="bg-info text-info-content text-center py-2 text-xs font-bold animate-pulse">
            SESSIONS COMPLETED 🏁
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;