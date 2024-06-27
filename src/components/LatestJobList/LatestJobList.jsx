
import { useDemandesFonctions } from "../../utils/DemandesFonctions";
import React from "react";
// import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import DemandeItem from "../Demande/DemandeItem";

export default function LatestJobList() {
const { allDemandes } = useDemandesFonctions();
  return (
    <>
       <div className=" flex mx-auto w-[80%] justify-center items-center space-x-2 flex-wrap">
      {/* les 5 plus recents */}
      {allDemandes
        ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5)
        .map((demande) => (
          <DemandeItem
            titre={demande?.titre}
            nomDemandeur={demande?.nomDemandeur}
            date={demande?.created_at}
            categorie_id={demande?.categorie_id}
            photo={demande?.photo}
            description={demande?.description}
            created_at={demande?.created_at}
            contact={demande?.contact}
            key={demande?.id}
          />
        ))}
     
    </div>
     {/* link voir plus */}
      <div className="flex justify-center items-center h-10 p-5 bg-blue-500 w-[12%] rounded-md shadow-sm mx-auto text-center font-openSans">
        <Link to="/demandes" className="text-white font-openSans">
          Voir plus
        </Link>
      </div>
    </>
 
  );
}
