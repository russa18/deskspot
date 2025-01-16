import { Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import { useEffect } from "react";
import useAuthStore from "./store/authStore"; // Import the store
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Layout = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  
  useEffect(() => {
    initializeAuth(); // Initialize Firebase auth listener
  }, [initializeAuth]);
  return (
    <div className="layout flex flex-col items-center min-h-screen ">
       <ToastContainer  autoClose={3000}/>
      <Navbar />
      <main className="grow w-full max-w-screen-xl mx-auto  my-8 bg-black sm:rounded-lg">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
