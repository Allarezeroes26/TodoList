import { create } from 'zustand'

const initialTheme = localStorage.getItem("chat-theme") || "dark"
document.documentElement.setAttribute("data-theme", initialTheme)

export const useThemeStore = create((set) => ({
    theme: initialTheme,
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme)
        document.documentElement.setAttribute("data-theme", theme)
        set({ theme })
    }
}))
