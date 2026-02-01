import { create } from 'zustand';
import api from '../api/api';
import { toast } from 'react-hot-toast'
import { taskStore } from './taskStore';



export const userAuth = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isLogging: false,
    isRegistering: false,

    checkAuth: async () => {
        try {
            const res = await api.get('/api/auth/check');
            set({ authUser: res.data })
        } catch (err) {
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },


    login: async ({email, password}) => {
        set({ isLogging: true })
        try {
            const res = await api.post('/api/auth/login', { email, password })
            set({ authUser: res.data })
            toast.success('Logged in successfully')
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Something went wrong"
            toast.error(message)
        } finally {
            set({ isLogging: false })
        }
    },

    register: async ({ name, email, password }) => {
        set({ isRegistering: true })
        try {
            const res = await api.post('/api/auth/register', { name, email, password })
            set({ authUser: res.data })
            toast.success('Registered in successfully')
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Something went wrong"
            toast.error(message)
        } finally {
            set({ isRegistering: false })
        }
    },

    logout: async () => {
        try {
            await api.post('/api/auth/logout');
            set({ authUser: null });
            taskStore.getState().clearTasks();
            toast.success('Logout Success!');
        } catch (err) {
            const message = err.response?.data?.message || err.message || "Something went wrong";
            toast.error(message);
        }
    }
}))