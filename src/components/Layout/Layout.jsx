import React, { useLayoutEffect } from 'react'
import { Outlet } from 'react-router-dom'
import LayoutMenuBar from '../LayoutMenuBar/LayoutMenuBar';
import { useUserStore } from "../../store/UserStore";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
export default function Layout() {
   const { user, setUser } = useUserStore();
    // console.log(user);
useLayoutEffect(() => {
  const fetchConnectedUser = async () => {
    try {
      const response = await axios.get("/user");
      // console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  fetchConnectedUser();
}, []);
  return (
    <div>
    <Navbar/>
      <Outlet />
    </div>
  );
}
