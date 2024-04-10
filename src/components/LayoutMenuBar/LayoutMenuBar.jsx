import React, { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  // MenubarShortcut,
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
            if(response?.status===200){
              localStorage.setItem("token", response?.data.token);
                setUser(null);
                 toast.success(`deconnexion reussi`);
                 setTimeout(() => {
                   navigate("/");
                 }, 2000);

            }
        } catch (error) {
            console.error(error);
            toast.error(`erreur lors de la deconnexion`);
        }
        console.log(user);

    }
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
      }
    , []);
  return (
    <>
      <div className="fixed  top-0  w-full bg-white  h-16 z-300 flex flex-row justify-between items-center">
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
          {user && (
            <span
              className="font-bold text-xl text-black "
              // style={{ color: "#758283" }}
            >
              {user?.name}
            </span>
          )}
          <Menubar>
            <MenubarMenu className="bg-red-600">
              <MenubarTrigger>Profile</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Link to="/layout/Profile" title="Profile">
                    Mon profile
                  </Link>
                </MenubarItem>
                <MenubarItem>
                  {" "}
                  <Link to="/layout/MyOffers" title="MyOffers">
                    Mes Offres
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  {" "}
                  <Link to="/layout/MyDemands" title="MyDemands">
                    Mes Demandes
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={logout}>Se deconnecter</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}
