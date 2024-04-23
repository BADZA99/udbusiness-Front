import { fetcher } from '../../utils/fertcher';
import React from 'react'
import { IoLocationSharp } from 'react-icons/io5';
import useSWR from 'swr';
import { Badge } from '../ui/badge';

export default function OffreItem({ titre, nomDemandeur, zone, tarif, date, categorie_id}) {
  const { data } = useSWR("http://localhost:8000/api/categories", fetcher);

  // fonction qui va determiner la couleur du badge
  const badgeColor = (categorieId) => {
    // switch case
    switch (categorieId) {
      case 1:
        return "bg-blue-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-red-500";
      case "4":
        return "bg-green-500";
      case "5":
        return "bg-purple-500";
      case "6":
        return "bg-pink-500";
      case "7":
        return "bg-indigo-500";
      case "8":
        return "bg-gray-500";
      case "9":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };
  // fonction qui retourne le nom du categorie
  const categorieName = (categorieId) => {
    return data?.categories?.map((categorie) => {
      if (categorie.id === categorieId) {
        return categorie.libelle;
      }
    });
  };

  return (
    <div className=" w-full flex justify-between items-center border-b-2 p-7 bg-slate-200 rounded-sm hover:shadow-xl transition-shadow mb-3 ">
      <div className="">
        <div className="font-bold text-xl font-montserrat mb-2">{titre}</div>
        <div className="font-bold flex gap-1">
          poste par <span className="text-blue-500">{nomDemandeur}</span>
          <IoLocationSharp size={15} color="gray" />{" "}
          <span className="text-gray-500">{zone}</span>
        </div>
      </div>
      <div className="font-openSans">
        <div className="mb-2 font-bold">{tarif}Fcfa/mois</div>
        <div className="mb-2 font-bold">
          {" "}
          <Badge className={`${badgeColor(categorie_id)} p-2`}>
            {categorieName(categorie_id)}
          </Badge>
        </div>
        {/* <div className="font-openSans mr-auto">
          {new Date(date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div> */}
      </div>
    </div>
  );
}
