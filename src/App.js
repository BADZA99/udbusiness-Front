import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Inscriptions from "./pages/Inscriptions";
import Acceuil from "./pages/Acceuil";
// import axios from "axios";
import Axios from "axios";
import { ToastContainer } from "react-toastify";
import Connexion from "./pages/Connexion";
import Layout from "./components/Layout/Layout";
import Demandes from "./pages/Demandes";
import Offres from "./pages/Offres";
// import Navbar from "./components/Navbar/Navbar";
import { useUserStore } from "./store/UserStore";
import {  useLayoutEffect } from "react";
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
// import LayoutMenuBar from "./components/LayoutMenuBar/LayoutMenuBar";


Axios.defaults.baseURL = BaseUrl;
// pass cookie from the backend
Axios.defaults.withCredentials = true;


function App() {
    const { user } = useUserStore();
    const { fetchConnectedUser } = useUserFunctions();

    // const fetchConnectedUser = async ()=>{
    //     try {
    //         const response = await axios.get("/user");
    //       // console.log(response.data);
    //       if(response?.status ===200){
    //           localStorage.setItem("token", response.data.token);
    //         setUser(response.data);
    //       }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    // console.log(user)
      useLayoutEffect(() => {
        fetchConnectedUser();
      }, []);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="*" element={<NofFound />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscriptions />} />
          <Route path="/offres" element={<Offres />} />
          <Route path="/Demandes" element={<Demandes />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path={user ? "/profile" : "/"} element={<Profile />} />
          <Route path={user ? "/UserProfile" : "/"} element={<UserProfile />} />
          <Route
            path={user ? "/layout" : "/"}
            element={user ? <Layout /> : <Acceuil />}
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
