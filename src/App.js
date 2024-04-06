import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Inscriptions from "./pages/Inscriptions";
import Acceuil from "./pages/Acceuil";

function App() {
  return (
    <div>
    <Router>
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/inscription" element={<Inscriptions />} />
        </Routes>
    </Router>
      </div>
  );
}

export default App;
