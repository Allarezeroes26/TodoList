import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import { userAuth } from './stores/authStore'
import { Loader } from 'lucide-react'
import { useEffect } from 'react'
import Tasks from './pages/Tasks'
import Settings from './pages/Settings'
import Timer from './pages/Timer'
import Task from './pages/Task'

function App() {
  const { authUser, isCheckingAuth, checkAuth } = userAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-2xl" />
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: authUser ? <HomePage /> : <Navigate to="/login" />
        },
        {
          path: '/login',
          element: !authUser  ? <Login /> : <Navigate to="/" />
        },
        {
          path: '/register',
          element: !authUser  ? <Register /> : <Navigate to="/" />
        },
        {
          path: '/tasks',
          element: authUser ? <Tasks /> : <Navigate to='/login'/>
        },
        {
          path: '/settings',
          element: authUser ? <Settings /> : <Navigate to='/login'/>
        },
        {
          path: '/timer',
          element: authUser ? <Timer /> : <Navigate to='/login'/>
        },
        {
          path: '/task/:id',
          element: authUser ? <Task /> : <Navigate to={'/login'}/>
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}


export default App
