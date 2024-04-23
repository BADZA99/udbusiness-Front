
import { useDemandesFonctions } from "../../utils/DemandesFonctions";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import DemandeItem from "../Demande/DemandeItem";

export default function LatestJobList() {
const { allDemandes } = useDemandesFonctions();
  return (
    <div className=" mx-auto w-[70%] space-y-4">
      {allDemandes?.map((service) => (
        <DemandeItem
          titre={service?.titre}
          nomDemandeur={service?.nomDemandeur}
          date={service?.date_limite}
          categorie_id={service?.categorie_id}
          key={service.id}
        />
      ))}
      {/* link voir plus */}
      <div className="flex justify-center items-center h-10 p-5 bg-blue-500 w-[12%] rounded-md shadow-sm mx-auto text-center font-openSans">
        <Link to="/" className="text-white font-openSans">
          Voir plus
        </Link>
      </div>
    </div>
  );
}
