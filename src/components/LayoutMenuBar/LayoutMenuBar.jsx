import React from 'react'
import { Link } from 'react-router-dom'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../ui/menubar";
import { useUserStore } from '../../store/UserStore';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


export default function LayoutMenuBar() {
    const { user, setUser } = useUserStore();
      const navigate = useNavigate();

    const logout = async ()=>{
        try {
            const response = await axios.post("/logout");
            if(response.status===200){
                setUser(null);
                 toast.success(`${response.data.message}`);
                 setTimeout(() => {
                   navigate("/");
                 }, 2000);

            }
        } catch (error) {
            toast.error(`${error.response.data.message}`);
            console.error(error);
        }
        console.log(user);

    }
  return (
    <>
    <div className="fixed  top-0  w-full  h-16 z-300 flex flex-row justify-between items-center">
      {/* barre navigation central */}
      <div
        className="fixed top-0 bg-white text-black w-[40%] h-16 z-300 left-[50%] translate-x-[-50%] flex flex-row justify-between items-center px-2 py-2 rounded-lg
       shadow-xl font-bold
      "
      >
        <Link to="/" title="Acceuil">
          Acceuil
        </Link>
        <Link to="/layout/Demandes" title="Offreurs">
          Demandes
        </Link>
        <Link to="/layout/Offres" title="Demandes">
          Offreurs
        </Link>
      </div>

      {/* logo */}
      <div className="m-3 font-bold text-2xl">UD</div>
      {/* profil */}
      <div className="m-6 flex flex-row items-center ">
        <span
          className="font-bold text-xl text-black "
          // style={{ color: "#758283" }}
        >
          {user?.name}
        </span>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Profile</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Mon profile <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>Mes Offres</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Mes Demandes</MenubarItem>
              <MenubarSeparator />
              <MenubarItem
                onClick={logout}
              >Se deconnecter</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
}
