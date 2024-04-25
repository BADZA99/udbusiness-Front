import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer';

export default function ContactUs() {
  return (
    <>
      <Navbar />
      <div className=" mt-40 w-[80%] h-[500px] mx-auto flex justify-between items-center   p-3">
        {/* contact left */}
        <div className=" w-[35%] h-[77%]   flex flex-col space-y-6  p-6 rounded-lg shadow-md text-black">
          <h2 className="text-2xl font-bold mb-4 font-openSans ">
            Informations
          </h2>
          <p className="text-2xl mb-2">Adresse: 3 rue de la paix</p>
          <p className="text-2xl mb-2">Code postal: 75000</p>
          <p className="text-2xl mb-2">Ville: Paris</p>
          <p className="text-2xl mb-2">Tél: 01 02 03 04 05</p>
          <p className="text-2xl mb-2">Email: contact@lecoin.fr</p>
        </div>
        {/* contact right */}
        <div className=" flex flex-col w-[60%] h-full  ">
          <h2 className="text-3xl font-bold text-center text-black  mt-4 font-openSans">
            contactez Nous
          </h2>
          <form
            className="flex flex-col space-y-4  p-6"
          >
            <input
              type="text"
              placeholder="Nom Complet"
              className="border border-gray-300 p-4"
            />
           
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300  p-4"
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Message"
              className="border border-gray-300 p-2"
            ></textarea>
            <button className="bg-blue-500 text-white p-3">
              Envoyer
            </button>
          </form>
        </div>
      </div>
     
    </>
  );
}
