import React, { useEffect } from 'react'
import { Button } from "../components/ui/button";
import LayoutMenuBar from '../components/LayoutMenuBar/LayoutMenuBar';
import Navbar from '../components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
// import { useUserStore } from '../store/UserStore';
// import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/react";

export default function Acceuil() {

  return (
    <div className="w-full h-full">
      <Navbar />
      <div className=" mt-16 w-full h-full">ACCEUIL</div>
    </div>
  );
}
