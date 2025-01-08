import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/layout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";
import NotificationPage from "./pages/NotificationPage";
import NetworkPage from "./pages/NetworkPage";
import PostPage from "./pages/PostPage";
import logo from './assets/logo.svg'
import ProfilePage from "./pages/ProfilePage";

function App() {
  const { data: authUser, isLoading,  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          return null;
        }
        toast.error("Error fetching user data");
      }
    },
  });

  if(isLoading) return <div className="h-screen flex justify-center items-center"><img className="h-20 animate-pulse " src={logo} alt="" /></div>


  // Dynamically define the router based on authUser
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: authUser ? <HomePage /> : <Navigate to="/login" />,
        },
        {
          path: "/signup",
          element: !authUser ? <SignUpPage /> : <Navigate to="/" />,
        },
        {
          path: "/login",
          element: !authUser ? <LoginPage /> : <Navigate to="/" />,
        },
        {
          path: "/notifications",
          element: authUser ? <NotificationPage/> : <Navigate to="/login" />,
        },
        {
          path: "/network",
          element: authUser ? <NetworkPage/> : <Navigate to="/login" />,
        },
        {
          path: "/post/:postId",
          element: authUser ? <PostPage/> : <Navigate to="/login" />,
        },
        {
          path: "/profile/:username",
          element: authUser ? <ProfilePage/> : <Navigate to="/login" />,
        },
      ],
    },
  ]);

  return (
    <div className="">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
