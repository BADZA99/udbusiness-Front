import axios from "axios";
import { useUserStore } from "../../store/UserStore";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserFunctions } from "../../utils/UserFonctions";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const { user,setUser } = useUserStore();
    const { logoutUser } = useUserFunctions();
      const location = useLocation();
        const [navBackground, setNavBackground] = useState(
          location.pathname !== "/"
        );

      const navRef = React.useRef();
      navRef.current = navBackground;

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.post("/logout");
      if (response.status === 200) {
        localStorage.removeItem("token");
        setUser(null);
        //    toast.success(`${response.data.message}`);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error(`${error.response.data.message}`);
    }
  };
  
 useEffect(() => {
   const handleScroll = () => {
     const show = window.scrollY > 50;
     if (navRef.current !== show) {
       setNavBackground(show);
     }
   };

   // Liste des chemins des pages sur lesquelles je veux désactiver la fonction handleScroll
   const pathsToDisable = ["/inscription", "/connexion", "/offres", "/contact","/demandes"];

   if (!pathsToDisable.includes(location.pathname)) {
     document.addEventListener("scroll", handleScroll);
   }
 

   return () => {
     document.removeEventListener("scroll", handleScroll);
   };
 }, [location]);

  return (
    <div
      className={`fixed top-0 w-full h-20 text-white flex justify-between items-center font-openSans p-16 z-30 ${
        navBackground ? "bg-blue-500" : "bg-transparent"
      }`}
    >
      <div className="m-3 font-bold text-4xl cursor-pointer ">
        <Link to="/">UDFreelance</Link>
      </div>
      {/* menu milieu */}
      <div
        className="w-[40%] flex flex-row justify-between items-center px-2 py-2 rounded-lg
              text-lg"
      >
        {/* acceuil,offres,demandes et contact */}
        <Link to="/" className="mx-2">
          Acceuil
        </Link>
        <Link to="/offres" className="mx-2">
          Offres
        </Link>
        <Link to="/demandes" className="mx-2">
          Demandes
        </Link>
        <Link to="/contact" className="mx-2">
          Contactez-Nous
        </Link>
      </div>
      {/* auth buttons */}
      <div
        className=" w-[17%] flex flex-row justify-between items-center rounded-lg
                font-bold "
      >
        {user === null && (
          <>
            <Link
              to="/connexion"
              className="text-white bg-black rounded-lg p-4  hover:bg-white hover:text-black"
            >
              Connection
            </Link>
            <Link
              to="/inscription"
              className="text-white bg-black rounded-lg p-4 m-2    hover:bg-white hover:text-black"
            >
              Inscription
            </Link>
          </>
        )}
      </div>
      {user !== null && (
        <>
          <Link
            to="/"
            className="text-white bg-black rounded-lg p-3 shadow-xl   hover:bg-white hover:text-black"
            onClick={logout}
          >
            Deconnexion
          </Link>
        </>
      )}
    </div>
  );
}
