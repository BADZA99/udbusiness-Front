
import useSWR from "swr";
import axios from "axios";
import { useUserStore } from "../store/UserStore";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useUserFunctions = () => {
    const { setUser } = useUserStore();
    // const navigate = useNavigate();
  // fonction qui va inscrir le user
  const registerUser = async (data) => {
    try {
      const response = await axios.post("/register", {
        name: data?.name,
        email: data?.email,
        password: data?.password,
        adresse: data?.adresse,
        telephone: data?.telephone,
        idProfile: data?.role,
        sexe: data?.sexe,
      });
       if (response?.status === 200) {
         toast.success(`${response.data.message}`);
        //  setTimeout(() => {
        // navigate("/connexion");
        //  }, 2000);
       }
    } catch (error) {
      console.error(error);
      toast.error(`${error.response.data.message}`);
    }
  };

  // fonction qui va connecter le user
  const loginUser = async (data) => {
    try {
      const response = await axios.post("/login", {
        email: data?.email,
        password: data?.password,
      });
      if (response?.status === 200) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data);
        // toast.success(`${response?.data.message}`);
      } else{
          toast.error(`Email ou mot de passe incorrect`);
      }
    } catch (error) {
      console.log(error);
        toast.error(`${error.response.data.message}`);
    }
  };

  // cree une fonction qui va recuperer le user connecte via axios
  const fetchConnectedUser = async () => {
    try {
      const response = await axios.get("/user");
      // console.log(response.data);
      if (response?.status === 200) {
        // localStorage.setItem("token", response.data.token);
        setUser(response.data);
        // toast
        // toast.success(`Bienvenue ${response.data.name}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fonction qui va deconnecter le user
  const logoutUser = async () => {
    try {
      const response = await axios.post("/logout");
      if (response.status === 200) {
        localStorage.removeItem("token");
        setUser(null);
        //    toast.success(`${response.data.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(`${error.response.data.message}`);
    }
  };

    return { registerUser, fetchConnectedUser, loginUser, logoutUser };
};


