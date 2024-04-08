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
import Navbar from "./components/Navbar/Navbar";
import { useUserStore } from "./store/UserStore";
import { useEffect } from "react";
import useSWR from "swr";
// import LayoutMenuBar from "./components/LayoutMenuBar/LayoutMenuBar";


Axios.defaults.baseURL = "http://localhost:8000/api/";
// pass cookie from the backend
Axios.defaults.withCredentials = true;


function App() {
    const { user, setUser } = useUserStore();
    //  const fetcher = (url) => fetch(url).then((res) => res.json());
    //  const { data, error, isLoading } = useSWR(
    //    "http://localhost:8000/api/user",
    //    fetcher
    //  );
    // console.log(data)

    const fetchConnectedUser = async ()=>{
        try {
            const response = await axios.get("/user");
          //  console.log(response.data);
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    }
      useEffect(() => {
        fetchConnectedUser();
      }, [user]);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscriptions />} />
          <Route path="/layout" element={<Layout />}>
            <Route path="/layout/Demandes" element={<Demandes />} />
            <Route path="/layout/Offres" element={<Offres />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
