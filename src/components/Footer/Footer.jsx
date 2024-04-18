import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"; 
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 px-10">
      <div className="grid grid-cols-4 gap-8 items-center">
        <div className=" ">
          <h3 className="text-4xl font-bold mb-3 font-montserrat font-montserrat">
            udFreelance
          </h3>
          <p className="mb-3 font-openSans ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
            repellat voluptatum assumenda.
          </p>
          <div className="flex space-x-3">
            <Link>
              <FaFacebook size={30} />
            </Link>
            <FaInstagram size={30} />
            <FaLinkedin size={30} />
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-bold mb-3 font-montserrat">
            Quick Links
          </h3>
          <ul className="text-xl  mb-3 font-openSans ">
            <li>
              <Link className="pointer">Demandes list</Link>
            </li>
            <li>
              <Link className="pointer">Post demande</Link>
            </li>
            <li>
              <Link className="pointer">Catégories</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-3xl font-bold mb-3 font-montserrat">
            Trading Jobs
          </h3>
          <ul className="text-xl  mb-3 font-openSans ">
            <li>Developer</li>
            <li>Designer</li>
            <li>Technicien</li>
          </ul>
        </div>
        <div className="w-full">
          <h3 className="text-3xl font-bold mb-3 font-montserrat">
            Newsletter
          </h3>
          <p className="mb-3 font-openSans">
            Inscrivez-vous à notre newsletter pour rester à jour.
          </p>
          <div className="flex justify-between items-center ">
            <input
              type="email"
              placeholder="Votre email"
              className="w-[75%] p-2 rounded border border-gray-300 font-openSans  text-black  "
            />
            <button className="bg-blue-500 p-2 w-[22%]  ">Envoyer</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
