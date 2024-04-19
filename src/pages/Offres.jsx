import React from 'react'
import { useUserStore } from '../store/UserStore';
import useSWR from 'swr';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import LatestJobList from '../components/LatestJobList/LatestJobList';
import OffreItem from '../components/Offre/OffreItem';
import { Select } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { useServicesFonctions } from '../utils/ServicesFonctions';
export default function Offres() {
  const { user } = useUserStore();
  const [searchValue, setsearchValue] = useState();
    const {allServices} = useServicesFonctions();
   const fetcher = (url) => fetch(url).then((res) => res.json());
  //  const { data, error, isLoading } = useSWR(
  //    "http://localhost:8000/api/services",
  //    fetcher
  //  );
     const { data } = useSWR("http://localhost:8000/api/categories", fetcher);

    // const handleSearchChange = (e) => {
    //   setsearchValue(e.target.value);
    // };


  return (
    <>
      <Navbar />
      <h2 className="text-3xl font-bold text-center text-black  mt-40 font-openSans">
        Liste des Offres
      </h2>
      {/* offres container */}
      <div className="w-[90%] mx-auto bg-black flex justify-between mt-2">
        {/* colonne offres */}
        <div className="w-[70%] flex flex-col items-center justify-start bg-violet-700">
          {/* show nb result and sort by */}
          <div className=" w-full flex justify-between items-center mr-auto p-4 bg-red-700 mb-7 font-montserrat">
            <span>Showing 1-10 of 34 results</span>
            <select className="p-3 font-montserrat">
              <option>Sort by</option>
              <option>Most Recent</option>
              <option>Most Popular</option>
              <option>Best Rating</option>
              <option>Lowest Price</option>
            </select>
          </div>
          {/* list offre */}
          <div className=" h-full w-full flex flex-col justify-start items-center bg-lime-600">
            {/* titre,nomDemandeur, zone, tarif, date */}
            {
              allServices?.map((service) => (
                <OffreItem
                  titre={service?.titre}
                  nomDemandeur={service?.nomPrestataire}
                  zone={service?.lieu}
                  tarif={service?.tarif}
                  date={service?.date}
                />
              ))
            }
          </div>
        </div>
        {/* colonne filtre */}
        <div className=" w-[25%] flex flex-col items-center justify-center font-openSans ">
          {/* Search Keywords */}
          <div className=" w-full p-7 flex flex-col justify-between items-center bg-amber-600 font-bold border border-black ">
            <label htmlFor="Search Keywords">Search Keywords</label>
            <input type="text" className="w-[90%] h-10 rounded-lg p-2 mt-3" />
          </div>
          {/* category */}
          <div className="p-7 flex flex-col justify-between items-center bg-blue-500 w-full font-bold border border-black  ">
            <label htmlFor="Search Keywords font-bold">Category</label>
            <select className="mt-3 p-3">
              <option label="All Categories" value="all" />
              {data?.categories?.map((categorie) => (
                <option value={categorie?.id} key={categorie?.id}>
                  {categorie?.libelle}
                </option>
              ))}
            </select>
          </div>
          {/* Search Location */}
          <div className=" w-full p-7 flex flex-col justify-between items-center bg-amber-600 font-bold">
            <label htmlFor="Search Keywords">Search Location</label>
            <input type="text" className="w-[90%] h-10 rounded-lg p-2 mt-3" />
          </div>
          {/* Search offre type */}
          <div className=" w-full p-7 flex flex-col justify-between items-center bg-yellow-300 font-bold">
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
          <div className=" w-full p-7 flex flex-col justify-between items-center bg-blue-500 font-bold">
            <label htmlFor="Search Keywords">Tarif Range</label>
            <input
              type="range"
              className="w-[90%] h-10 rounded-lg p-2 mt-3"
              defaultValue={10}
            />
          </div>
          {/* Search offre date posted */}
          <div className=" w-full p-7 flex flex-col justify-between items-center bg-yellow-300 font-bold">
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
