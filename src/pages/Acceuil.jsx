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

export default function Acceuil() {

  return (
    <div className="relative bg-[#ffffff]">
      <Navbar />
      <div className=" mt-0 w-full h-screen">
        {/* bg image */}
        <div
          className="w-full h-[100vh] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${backgroundImage})`,
          }}
        >
          <div
            className="
            w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white  text-6xl
            
          "
          >
            <h1 className="mb-3 font-montserrat text-8xl font-bold">
              Find Your Next Job
            </h1>
            <h3 className="font-openSans text-3xl">
              More then 1,524 job listed here.
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
        Latest Jobs
      </h2>
      <h5
        className="
        text-center text-xl  p-5 font-openSans"
      >
        Here's the most recent job listed on the website.
      </h5>
      <LatestJobList />
      {/* popular Category */}
      <h2
        className="
        text-center text-3xl font-bold p-5 mt-5 font-montserrat"
      >
        Proffesional By Category
      </h2>
      <PopularCategory />

      {/* footer */}
      <Footer />
    </div>
  );
}
