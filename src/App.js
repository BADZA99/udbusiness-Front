import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Inscriptions from "./pages/Inscriptions";
import Acceuil from "./pages/Acceuil";
import axios from "axios";
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
// import LayoutMenuBar from "./components/LayoutMenuBar/LayoutMenuBar";


Axios.defaults.baseURL = "http://localhost:8000/api/";
// pass cookie from the backend
Axios.defaults.withCredentials = true;


function App() {
    const { user, setUser } = useUserStore();
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
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscriptions />} />
          <Route path="*" element={<NofFound/>} />
          <Route
            path={user ? "/layout" : "/"}
            element={user ? <Layout /> : <Acceuil />}
          >
            <Route
              path={user ? "/layout/Demandes" : "/"}
              element={<Demandes />}
            />
            <Route path={user ? "/layout/Offres" : "/"} element={<Offres />} />
            <Route path="/layout/Profile" element={<Profile />} />
            <Route path="/layout/MyDemands" element={<MyDemands />} />
            <Route path="/layout/MyOffers" element={<MyOffers />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}

export default App;
