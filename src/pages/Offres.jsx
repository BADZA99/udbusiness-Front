import React from 'react'
import useSWR from 'swr';
import Navbar from '../components/Navbar/Navbar';
import OffreItem from '../components/Offre/OffreItem';
import Pagination from '../components/Pagination/Pagination';
import { useServicesFonctions } from '../utils/ServicesFonctions';
import { fetcher } from '../utils/fertcher';
import { useState } from 'react';
export default function Offres() {
  const {allServices} = useServicesFonctions();
  const { data } = useSWR("http://localhost:8000/api/categories", fetcher);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000000000);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(10);
  const filteredServices = allServices?.filter(
    (service) =>
      service.titre.includes(keyword) &&
      (category === "all" || service.categorie_id === Number(category)) &&
      service.lieu.includes(location) &&
      service.tarif <= maxPrice
  );

    // Calculer le nombre total de pages
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices?.slice(indexOfFirstService, indexOfLastService);

  // Changer de page
  const paginate = pageNumber => setCurrentPage(pageNumber);

console.log("current services",currentServices,"servicesPerPage: ",servicesPerPage,"total service",filteredServices?.length)
  return (
    <>
      <Navbar />
      <h2 className="text-3xl font-bold text-center text-black  mt-40 font-openSans">
        Liste des Offres
      </h2>
      {/* offres container */}
      <div className="w-[95%] mx-auto flex flex-col justify-center items-center mt-2 space-y-5">
        {/* ligne filtre */}
        <div className=" w-[80%] bg-gray-400 mx-auto rounded-md flex flex-row items-center justify-between space-x-2 font-openSans  h-14 p-2 shadow-lg ">
          {/* Search Keywords */}
          <div className="flex items-center justify-between">
            <label htmlFor="">Trier</label>
            <input
              type="text"
              placeholder="entrer un mot cle"
              className="w-[80%] h-10 rounded-lg p-2"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          {/* Search Location */}
          <div className="flex items-center justify-between">
            <label htmlFor="">Location</label>
            <input
              type="text"
              placeholder="Location"
              className="w-[70%] h-10 rounded-lg p-2"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          {/* category */}
          <select
            className=" p-3"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option label="All Categories" value="all" />
            {data?.categories?.map((categorie) => (
              <option value={categorie?.id} key={categorie?.id}>
                {categorie?.libelle}
              </option>
            ))}
          </select>

          {/* show nb result and sort by */}
          <select className="p-3 font-montserrat bg-wite">
            <option>Periode</option>
            <option>Most Recent</option>
            <option>Most Popular</option>
            <option>Best Rating</option>
            <option>Lowest Price</option>
          </select>
        </div>
        {/* grille offre */}
        <div className=" w-[90%] grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* titre,nomDemandeur, zone, tarif, date */}
          {currentServices?.length > 0 ? (
            currentServices?.map((service) => (
              <OffreItem
                titre={service?.titre}
                nomPrestataire={service?.nomPrestataire}
                telPrestataire={service?.telephonePresta}
                zone={service?.lieu}
                tarif={service?.tarif}
                date={service?.date}
                categorie_id={service?.categorie_id}
                description={service?.description}
                created_at={service?.created_at}
                photo={service?.photo}
                key={service.id}
              />
            ))
          ) : (
            <p className="font-bold text-2xl font-openSans">Aucun résultat</p>
          )}
        </div>

        {/* pagination */}
        <Pagination
          itemsPerPage={servicesPerPage}
          totalItems={filteredServices?.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}


