import { create } from 'zustand'
import api from '../api/api'
import toast from 'react-hot-toast'

export const taskStore = create((set, get) => ({
  tasks: [],
  task: null,

  isTaskCreating: false,
  isTaskUpdating: false,

  createTask: async (taskData) => {
    set({ isTaskCreating: true })
    try {
      const res = await api.post('/api/tasks/create-task', taskData)

      set({
        tasks: [...get().tasks, res.data],
      })

      toast.success('Task created')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      set({ isTaskCreating: false })
    }
  },

  getTasks: async () => {
    try {
      const res = await api.get('/api/tasks/get-tasks')
      set({ tasks: Array.isArray(res.data) ? res.data : [] })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load tasks')
    }
  },

  getTask: async (id) => {
    try {
      const res = await api.get(`/api/tasks/get-task/${id}`)
      set({ task: res.data })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load task')
    }
  },

  updateTask: async (id, updatedData) => {
    set({ isTaskUpdating: true })
    try {
      const res = await api.put(`/api/tasks/update-task/${id}`, updatedData)

      set({
        tasks: get().tasks.map(task =>
          task._id === id ? res.data : task
        ),
      })

      toast.success('Task updated')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    } finally {
      set({ isTaskUpdating: false })
    }
  },

  deleteTask: async (id) => {
    try {
      await api.delete(`/api/tasks/delete-task/${id}`)

      set({
        tasks: get().tasks.filter(task => task._id !== id),
      })

      toast.success('Task deleted')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed')
    }
  },
}))
