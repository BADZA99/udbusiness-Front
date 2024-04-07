import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Inscriptions from "./pages/Inscriptions";
import Acceuil from "./pages/Acceuil";
import axios from "axios";
import Axios from "axios";
import { ToastContainer } from "react-toastify";
import Connexion from "./pages/Connexion";


Axios.defaults.baseURL = "http://localhost:8000/api/";
// pass cookie from the backend
Axios.defaults.withCredentials = true;


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscriptions />} />
        </Routes>
      </Router>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
