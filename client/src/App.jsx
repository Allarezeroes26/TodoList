import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/homePage'
import Login from './pages/Login'
import Register from './pages/Register'
import { userAuth } from './stores/authStore'
import { Loader } from 'lucide-react'
import { useEffect } from 'react'

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
          element: authUser && authUser._id ? <HomePage /> : <Navigate to="/login" />
        },
        {
          path: '/login',
          element: !authUser || !authUser._id ? <Login /> : <Navigate to="/" />
        },
        {
          path: '/register',
          element: !authUser || !authUser._id ? <Register /> : <Navigate to="/" />
        },
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}


export default App
