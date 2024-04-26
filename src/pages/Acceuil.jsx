import React, { useEffect } from 'react'
import { Button } from "../components/ui/button";
import LayoutMenuBar from '../components/LayoutMenuBar/LayoutMenuBar';
import Navbar from '../components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
// import { useUserStore } from '../store/UserStore';
// import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/react";
import backgroundImage from '../images/bg.jpg';
import SearchJob from '../components/SearchJob/SearchJob';
import LatestJobList from '../components/LatestJobList/LatestJobList';
import PopularCategory from '../components/PopularCategory/PopularCategory';
import Footer from '../components/Footer/Footer';
import Testimonials from '../components/Testimonials/Testimonials';
import CompaniesSlider from '../components/CompaniesSlider/CompaniesSlider';
import Blog from '../components/Blog/Blog';
import { useDemandesFonctions } from '../utils/DemandesFonctions';


export default function Acceuil() {
  const { allDemandes } = useDemandesFonctions();
  return (
    <div className="relative bg-[#ffffff]">
      <Navbar />
      <div className=" mt-0 w-full h-screen">
        {/* bg image */}
        <div
          className="w-full h-[100vh] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${backgroundImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="
            w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white  text-6xl
          "
          >
            <h1 className="mb-3 font-montserrat text-7xl font-bold">
              Trouvez votre prochain travail
            </h1>
            <h3 className="font-openSans text-3xl">
              Plus de {allDemandes?.length} jobs disponibles.
            </h3>
          </div>
        </div>
      </div>
      {/* search bar */}
      <SearchJob />
      {/* latest job */}
      <h2
        className="
        text-center text-3xl font-bold p-5 font-montserrat"
      >
        Derniers Jobs
      </h2>
      <h5
        className="
        text-center text-xl  p-5 font-openSans"
      >
        Trouvez votre prochain travail parmi les derniers jobs disponibles.
      </h5>
      <LatestJobList />
      {/* popular Category */}
      <h2
        className="
        text-center text-3xl font-bold p-5 mt-5 font-montserrat"
      >
        Catégories populaires
      </h2>
      {/* categories */}
      <PopularCategory />
      {/* textimonials */}
      <Testimonials />

      {/* blog */}
      <Blog />
      {/* companie carousel */}
      <CompaniesSlider />
      {/* footer */}
      {/* <Footer /> */}
    </div>
  );
}
