import React from "react";
import useSWR from "swr";
import Navbar from "../components/Navbar/Navbar";
import Pagination from '../components/Pagination/Pagination';
import { fetcher } from "../utils/fertcher";
import { useDemandesFonctions } from "../utils/DemandesFonctions";
import DemandeItem from "../components/Demande/DemandeItem";
import { useState } from "react";
import { BaseUrl } from "../utils/Urls";

export default function Demandes() {
  // const { user } = useUserStore();
  // const [alldemandes, setAlldemandes] = useState();

  const { allDemandes } = useDemandesFonctions();
  const { data } = useSWR(`${BaseUrl}categories`, fetcher);
 const [keyword, setKeyword] = useState("");
 const [category, setCategory] = useState("all");

//  const [maxPrice, setMaxPrice] = useState(1000000000);
  const [currentPage, setCurrentPage] = useState(1);
  const [demandesPerPage] = useState(10);
const filteredDemandes = allDemandes
  ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Tri par date de création, du plus récent au plus ancien
  ?.filter(
    (demande) =>
      demande?.titre.includes(keyword) &&
      (category === "all" || demande?.categorie_id === Number(category))
  );

 const indexOfLastDemande = currentPage * demandesPerPage;
const indexOfFirstDemande = indexOfLastDemande - demandesPerPage;
const currentDemandes = filteredDemandes?.slice(indexOfFirstDemande, indexOfLastDemande);

  return (
    <>
      <Navbar />
      <h2 className="text-3xl font-bold text-center text-black  mt-40 font-openSans">
        Liste des Demandes
      </h2>
      {/* offres container */}
      <div className="w-[95%] mx-auto flex flex-col justify-center items-center mt-2 space-y-5">
        {/* ligne filtre */}
        <div className=" w-[80%] bg-gray-400 mx-auto rounded-md flex flex-row items-center justify-between space-x-2 font-openSans  h-14 p-2 shadow-lg ">
          {/* Search Keywords */}
          <input
            type="text"
            placeholder="mot cle"
            className="w-[25%] h-10 rounded-lg p-2"
            onChange={(e) => setKeyword(e.target.value)}
          />
          {/* category */}
          <select
            className="rounded-md p-3"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option label="All Categories" value="all" />
            {data?.categories?.map((categorie) => (
              <option value={categorie?.id} key={categorie?.id}>
                {categorie?.libelle}
              </option>
            ))}
          </select>

      
          {/* Search offre date posted */}
          <select className="p-3 font-montserrat rounded-md bg-white">
            <option>Periode</option>
            <option>Most Recent</option>
            <option>Most Popular</option>
            <option>Best Rating</option>
            <option>Lowest Price</option>
          </select>
        </div>
        {/* grille demandes */}
        <div className="w-[90%]  flex flex-col justify-start">
          {/* list demande */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* titre,nomDemandeur, zone, tarif, date */}
            {currentDemandes?.length > 0 ? (
              currentDemandes?.map((demande) => (
                <DemandeItem
                  titre={demande?.titre}
                  nomDemandeur={demande?.nomDemandeur}
                  date={demande?.date_limite}
                  categorie_id={demande?.categorie_id}
                  description={demande?.description}
                  photo={demande?.photo}
                  created_at={demande?.created_at}
                  contact={demande?.contact}
                  key={demande?.id}
                />
              ))
            ) : (
              <p className="font-bold text-2xl font-openSans">Aucun résultat</p>
            )}
          </div>
        </div>

        
        {/* pagination */}
        <Pagination
          itemsPerPage={demandesPerPage}
          totalItems={filteredDemandes?.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

