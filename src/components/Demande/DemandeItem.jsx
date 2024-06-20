import React from 'react'
import { Badge } from '../ui/badge';
import useSWR from 'swr';
import { fetcher } from '../../utils/fertcher';
import imguser from '../../images/Companies/company-7.png'

export default function DemandeItem({ titre, nomDemandeur, date,categorie_id }) {
    const { data } = useSWR("http://localhost:8000/api/categories", fetcher);

    // fonction qui va determiner la couleur du badge 
    const badgeColor =(categorieId) =>{
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
    }
    // fonction qui retourne le nom du categorie 
    const categorieName = (categorieId) =>{
      return data?.categories.map((categorie) => {
        if (categorie.id === categorieId) {
          return categorie.libelle;
        }
      });
    }

  return (
    <div className=" w-full flex justify-between items-center border-b-2 p-7 bg-slate-200 rounded-sm hover:shadow-xl transition-shadow mb-3 ">
      <div className=" flex ">
        {/* user profile image */}
        <div className="h-42 w-42">
          <img src={imguser} alt="img user" className='rounded-full ' />
        </div>
        {/* infos offre */}
        <div className="flex flex-col">
          <div className="font-bold text-xl font-montserrat mb-2">
          {titre}
          </div>
          <div className="font-bold flex gap-1 flex-col">
            <span>poste par</span> <span className="text-blue-500">{nomDemandeur}</span> le{" "}
            <span>
              {new Date(date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
      <div className="font-openSans">
        <div className="font-openSans mr-auto">
          <Badge className={`${badgeColor(categorie_id)} p-2`}>
            {categorieName(categorie_id)}
          </Badge>
        </div>
      </div>
    </div>
  );
}
