import React from 'react'
import useSWR from 'swr';
import Navbar from '../components/Navbar/Navbar';
import OffreItem from '../components/Offre/OffreItem';
import { Checkbox } from '../components/ui/checkbox';
import { useServicesFonctions } from '../utils/ServicesFonctions';
import { fetcher } from '../utils/fertcher';
import { useState } from 'react';
export default function Offres() {
  const {allServices} = useServicesFonctions();
  const { data } = useSWR("http://localhost:8000/api/categories", fetcher);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000000000);
  const filteredServices = allServices?.filter(
    (service) =>
      service.titre.includes(keyword) &&
      (category === "all" || service.categorie_id === Number(category)) &&
      service.lieu.includes(location) &&
      service.tarif <= maxPrice
  );
  return (
    <>
      <Navbar />
      <h2 className="text-3xl font-bold text-center text-black  mt-40 font-openSans">
        Liste des Offres
      </h2>
      {/* offres container */}
      <div className="w-[90%] mx-auto flex justify-between mt-2">
        {/* colonne offres */}
        <div className="w-[70%] flex flex-col items-center justify-start ">
          {/* show nb result and sort by */}
          <div className=" w-full flex justify-between items-center mr-auto p-4  mb-7 font-montserrat">
            <span>Showing 1-10 of 34 results</span>
            <select className="p-3 font-montserrat bg-gray-300">
              <option>Sort by</option>
              <option>Most Recent</option>
              <option>Most Popular</option>
              <option>Best Rating</option>
              <option>Lowest Price</option>
            </select>
          </div>
          {/* list offre */}
          <div className=" h-full w-full flex flex-col justify-start items-center">
            {/* titre,nomDemandeur, zone, tarif, date */}
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <OffreItem
                  titre={service?.titre}
                  nomDemandeur={service?.nomPrestataire}
                  zone={service?.lieu}
                  tarif={service?.tarif}
                  date={service?.date}
                  categorie_id={service?.categorie_id}
                  key={service.id}
                />
              ))
            ) : (
              <p className='font-bold text-2xl font-openSans'>Aucun résultat</p>
            )}
          </div>
        </div>
        {/* colonne filtre */}
        <div className=" w-[25%] flex flex-col items-center justify-center gap-y-3 font-openSans ">
          {/* Search Keywords */}
          <div className=" w-full p-7 flex flex-col justify-between items-center bg-gray-300 font-bold border border-black ">
            <label htmlFor="Search Keywords">Search Keywords</label>
            <input
              type="text"
              placeholder="entrer un mot cle"
              className="w-[90%] h-10 rounded-lg p-2 mt-3"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          {/* category */}
          <div className="p-7 flex flex-col justify-between items-center bg-gray-300 w-full font-bold border border-black  ">
            <label htmlFor="Search Keywords font-bold">Category</label>
            <select
              className="mt-3 p-3"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option label="All Categories" value="all" />
              {data?.categories?.map((categorie) => (
                <option value={categorie?.id} key={categorie?.id}>
                  {categorie?.libelle}
                </option>
              ))}
            </select>
          </div>
          {/* Search Location */}
          <div className=" w-full p-7 flex flex-col justify-between items-center bg-gray-300 font-bold">
            <label htmlFor="Search Keywords">Search Location</label>
            <input
              type="text"
              placeholder="mot cle"
              className="w-[90%] h-10 rounded-lg p-2 mt-3"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          {/* Search offre type */}
          <div className=" w-full p-7 flex flex-col justify-between items-center bg-gray-300 font-bold">
            <label htmlFor="Search Keywords" className=" mb-3">
              Offre Type
            </label>
            {/* group checkbox libelle */}
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
          </div>
          {/* tarif range */}
          <div className=" w-full p-7 flex flex-col justify-between items-center bg-gray-300 font-bold">
            <label htmlFor="Search Keywords">Tarif Range</label>
            <span className="text-center m-3">
              Tarif maximum : {maxPrice} Fcfa
            </span>
            <input
              type="range"
              className="w-[90%] h-10 rounded-lg p-2 mt-3"
              defaultValue={10}
              min={100000}
              max={10000000}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
          {/* Search offre date posted */}
          <div className=" w-full p-7 flex flex-col justify-between items-center bg-gray-300 font-bold">
            <label htmlFor="Search Keywords" className=" mb-3">
              posted at
            </label>
            {/* group checkbox libelle */}
            <div className="flex items-center space-x-2 mb-2 ">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                poste aujourd'hui
              </label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                poste il y'a 1 mois
              </label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                poste il y'a 3 mois
              </label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                poste il y'a 6 mois
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
