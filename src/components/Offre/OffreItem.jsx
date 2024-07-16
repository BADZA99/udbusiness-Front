import { fetcher } from '../../utils/fertcher';
import React from 'react'
import { IoLocationSharp } from 'react-icons/io5';
import useSWR from 'swr';
import { Badge } from '../ui/badge';
import imguser from "../../images/Companies/company-7.png";
import { BaseUrl, ServiceUrl } from '../../utils/Urls';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useUserStore } from '../../store/UserStore';
export default function OffreItem({
  titre,
  nomPrestataire,
  zone,
  tarif,
  // date,
  categorie_id,
  created_at,
  photo,
  description,
  telPrestataire
}) {
  const { data } = useSWR(`${BaseUrl}categories`, fetcher);
   const { user } = useUserStore();
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
    <div className=" rounded-lg shadow-lg overflow-hidden w-full max-w-lg min-w-md">
      <img
        src={`${ServiceUrl}/${photo}`}
        alt={`${photo}`}
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <Dialog>
          <DialogTrigger asChild>
            <h2 className="text-xl font-bold text-gray-800 mb-1 cursor-pointer">
              {titre}
            </h2>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{titre}</DialogTitle>
              <DialogDescription>publie le {new Date(created_at).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-bold">Prestataire</span>
                <p className="col-span-3">{nomPrestataire === user?.name ? "vous" : nomPrestataire }</p>
                
              </div>

              <div className="grid grid-cols-5 items-center gap-5 h-24">
                <span className="text-right  font-bold">Description</span>
                <p className="col-span-4">{description}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-bold">
                  Contactez le prestataire au
                </span>
                <p className="col-span-3">{telPrestataire}</p>
              </div>
            </div>
            <DialogFooter>popup details</DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="text-gray-700 leading-tight mb-2">
          <div className="flex items-center">
            <img
              src={imguser}
              alt="Avatar"
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <span className="text-gray-800 font-semibold">
              {nomPrestataire}
            </span>
            <IoLocationSharp size={15} color="gray" className="ml-2" />
            <span className="text-gray-500">{zone}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <Badge className={`p-1 ${badgeColor(categorie_id)}`}>
            {categorieName(categorie_id)}
          </Badge>
        </div>
        <div className="font-openSans text-lg font-bold text-blue-500">
          {tarif} Fcfa/mois
        </div>
      </div>
    </div>
  );
}
