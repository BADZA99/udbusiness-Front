import axios from "axios";
import { useUserStore } from "../../store/UserStore";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const { user, setUser } = useUserStore();
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
        console.log(user);

  return (
    <div className=" fixed top-0 w-full h-12 bg-gray-800 text-white flex justify-between items-center">
      <div className="m-3 font-bold text-2xl cursor-pointer ">
        <Link to="/">LOGO</Link>
      </div>
      <div
        className=" w-[15%] flex flex-row justify-between items-center px-2 py-2 rounded-lg
                shadow-xl font-bold"
      >
        {user === null && (
          <>
            <Link
              to="/connexion"
              className="text-white bg-black rounded-lg px-2 py-2 shadow-xl font-bold hover:bg-white hover:text-black"
            >
              Connection
            </Link>
            <Link
              to="/inscription"
              className="text-white bg-black rounded-lg px-2 py-2 shadow-xl font-bold  hover:bg-white hover:text-black"
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
            className="text-white bg-black rounded-lg px-2 py-2 shadow-xl font-bold  hover:bg-white hover:text-black"
            onClick={logout}
          >
            Deconnexion
          </Link>
        </>
      )}
    </div>
  );
}
