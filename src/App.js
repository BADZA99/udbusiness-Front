import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Inscriptions from "./pages/Inscriptions";
import Acceuil from "./pages/Acceuil";
// import axios from "axios";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Connexion from "./pages/Connexion";
import Layout from "./components/Layout/Layout";
import Demandes from "./pages/Demandes";
import Offres from "./pages/Offres";
// import Navbar from "./components/Navbar/Navbar";
import { useUserStore } from "./store/UserStore";
import {  useEffect, useLayoutEffect } from "react";
// import useSWR from "swr";
import Profile from "./pages/Profile";
import MyDemands from "./pages/MyDemands";
import MyOffers from "./pages/MyOffers";
import { useUserFunctions } from "./utils/UserFonctions";
import NofFound from "./pages/NofFound";
// import Navbar from "./components/Navbar/Navbar";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import UserProfile from "./pages/UserProfile";
import { BaseUrl } from "./utils/Urls";
import axios from "axios";
// import LayoutMenuBar from "./components/LayoutMenuBar/LayoutMenuBar";


Axios.defaults.baseURL = BaseUrl;
// pass cookie from the backend
Axios.defaults.withCredentials = true;


function App() {
     const { user, setUser } = useUserStore();
    //  const navigate = useNavigate();
     useEffect(() => {
       // Récupérer le token depuis l'URL
       const params = new URLSearchParams(window.location.search);
       const token = params.get("token");

       if (token) {
         // Stocker le token dans le localStorage ou dans un state manager
         localStorage.setItem("authToken", token);

         // Envoyer une requête pour récupérer les informations de l'utilisateur
         axios
           .get("/user", {
             headers: {
               Authorization: `Bearer ${token}`,
             },
           })
           .then((response) => {
             setUser(response.data); // Stocker les informations du user
            //  navigate("/layout/profile");
           })
           .catch((error) => {
             toast.error(
               "Erreur lors de la récupération des informations utilisateur :",
               error
             );
           });
       } else {
         // Rediriger vers la page de connexion si pas de token
        //  navigate("/connexion");
        //  toast.error("con");
       }
     }, []);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="*" element={<NofFound />} />
          <Route path={user ? "/" : "/connexion"} element={ <Connexion />} />
          <Route path="/inscription" element={<Inscriptions />} />
          <Route path="/offres" element={<Offres />} />
          <Route path="/Demandes" element={<Demandes />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path={user ? "/profile" : "/"} element={<Profile />} />
          <Route path={user ? "/UserProfile" : "/"} element={<UserProfile />} />
          <Route
            path={"/layout" }
            element={ <Layout />}
          >
            <Route path="/layout/profile" element={<UserProfile />} />
            <Route path="/layout/MyDemands" element={<MyDemands />} />
            <Route path="/layout/MyOffers" element={<MyOffers />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}

export default App;
