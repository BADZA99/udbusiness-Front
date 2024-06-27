import React from 'react'
import { Badge } from '../ui/badge';
import useSWR from 'swr';
import { fetcher } from '../../utils/fertcher';
import imguser from '../../images/Companies/company-7.png'
import { DemandeUrl } from '../../utils/Urls';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
// import { Button } from '../ui/button';
// import { Label } from '../ui/label';
// import { Input } from '../ui/input';

export default function DemandeItem({
  titre,
  nomDemandeur,
  date,
  categorie_id,
  description,
  photo,
  created_at,
  contact,
}) {
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
      case 4:
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
    return data?.categories.map((categorie) => {
      if (categorie.id === categorieId) {
        return categorie.libelle;
      }
    });
  };

  return (
    <div className=" rounded-lg shadow-lg overflow-hidden w-full max-w-lg min-w-md">
      <img
        src={`${DemandeUrl}/${photo}`}
        alt="Mountain"
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <Dialog>
          <DialogTrigger asChild>
            <h2 className="text-xl font-bold text-gray-800 mb-1 cursor-pointer">{titre}</h2>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{titre}</DialogTitle>
              <DialogDescription>details demande</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span  className="text-right font-bold">
                   Demandeur
                </span>
                <p className="col-span-3">{nomDemandeur}</p>
              </div>
             
              <div className="grid grid-cols-5 items-center gap-5 h-24">
                <span  className="text-right  font-bold">
                  Description
                </span>
                <p className="col-span-4">{description}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span  className="text-right font-bold">
                  Contactez le demandeur au
                </span>
                <p className="col-span-3">{contact}</p>
              </div>
            </div>
            <DialogFooter>
              popup details
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <p className="text-gray-700 leading-tight mb-2">
          Date limite:{" "}
          {new Date(date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-gray-700 leading-tight mb-2">Contact: {contact}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-between">
            <img
              src={imguser}
              alt="Avatar"
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <span className="text-gray-800 font-semibold">{nomDemandeur}</span>
          </div>
          <Badge className={`p-1 ${badgeColor(categorie_id)}`}>
            {categorieName(categorie_id)}
          </Badge>
        </div>
        <p className="text-blue-500 text-lg font-bold">
          <span className="text-black">publie le:</span>{" "}
          {new Date(created_at).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
