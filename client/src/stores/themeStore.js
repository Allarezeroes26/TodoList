import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("theme") || "retro",
    setTheme: (newTheme) => {
        set({ theme: newTheme });
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme)
    }
}))