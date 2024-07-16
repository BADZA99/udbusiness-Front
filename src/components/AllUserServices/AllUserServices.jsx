import React from 'react'
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useUserStore } from "../../store/UserStore";
// import { useEffect } from 'react';
import { useLayoutEffect } from "react";
import { useState } from "react";
import { Button } from '../ui/button';
import { BaseUrl, ServiceUrl } from "../../utils/Urls";
import { fetcher } from "../../utils/fertcher";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { cn } from "../../lib/utils";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from 'react-toastify';
import axios from 'axios';
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from 'date-fns';
import { Textarea } from '../ui/textarea';


export default function AllUserServices() {
     const { user } = useUserStore();
     const [userservices, setUserservices] = useState([]);
const [loading, setLoading] = useState(true);
       const [loadingServiceId, setLoadingServiceId] = useState(null);
  // const [ImgServicefile, setImgServiceFile] = useState(null);
       const [Categories, setCategories] = useState([]);
  const [date, setDate] = useState();
     const { data, error, isLoading } = useSWR(
       `${BaseUrl}services/${user?.id}`,
       fetcher
     );
  
   const {
       register:registerService,
       handleSubmit:handlesubmitService,
       formState: { errors:Serviceerrors },
     } = useForm();
  // fonction qui recupere tous les categories
  const getCategories = async () => {
    try {
      const response = await axios.get("/categories");
      setCategories(response?.data?.categories);
    } catch (error) {
      console.log(error);
    }
  };
  // update service
const onSubmitService = async (data) => {
  try {
    setLoading(true);
    if (user) {
      // Formater la date en Y-m-d
      let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      let dateFormated = [year, month, day].join("-");

      // Construire l'URL avec les paramètres de requête
      const queryParams = `titre=${data?.titre}&description=${data?.description}&tarif=${data?.tarif}&date=${dateFormated}&lieu=${data?.lieu}&categorie_id=${data?.categorie_id}&user_id=${user?.id}&nomPrestataire=${user?.name}&telephonePresta=${user?.telephone}`;

      // Envoyer la requête avec les paramètres dans l'URL
      const response = await axios.patch(`/updateService/${data?.idService}?${queryParams}`);

      if (response?.status === 200) {
        toast.success(`${response.data.message}`);
        setLoading(false);
      }
    } else {
      toast.warning("Vous devez vous connecter pour publier un service");
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
    toast.error(`Erreur lors de la modification du service`);
    setLoading(false);
  }
};

  // delete service
    const deleteService = async (id) => {
      setLoadingServiceId(id);
      try {
        setLoading(true);
        const response = await axios.delete(`/deleteService/${id}`);
        if (response.status === 200) {
          toast.success("Demande supprimée avec succès");
          setLoading(false);
        } else {
          toast.error("Erreur lors de la suppression");
          setLoading(false);
        }
      } catch (error) {
        // console.error(error);
        toast.error("Erreur lors de la suppression");
        setLoading(false);
      }finally{
        setLoadingServiceId(null);
      }
    };
     useLayoutEffect(() => {
       if (data) {
         setUserservices(data.services);
        //  console.log(data.services);
         getCategories();
       }
     }, [data]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-10 md:px-20">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {userservices?.map((service) => (
        <div
          className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
          key={service?.id}
        >
          <div className="relative">
            <img
              className="w-full h-44 object-cover"
              src={`${ServiceUrl}/${service.photo}`}
              alt="Service"
            />
            <div className="absolute top-0 right-0 bg-indigo-500 text-white font-bold px-2 py-1 m-2 rounded-md shadow-md">
              New
            </div>
            <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-2 py-1 m-2 rounded-md text-xs shadow-md">
              {new Date(service?.created_at).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
          <div className="p-6">
            <div className="text-xl font-semibold text-gray-800 mb-2">
              {service?.titre}
            </div>
            <p className="text-gray-600 font-medium mb-4">
              Description: {service?.description}
            </p>
            <p className="text-gray-600 font-medium">
              Tarif: {service?.tarif}/mois
            </p>
            <p className="text-gray-600 font-medium">Lieu: {service?.lieu}</p>
            <p className="text-gray-600 font-medium">
              Contactez le Prestataire au: {service?.telephonePresta}
            </p>
          </div>
          <div className="p-4 flex justify-between items-center">
            {/* modifier demande */}
            <Dialog>
              <DialogTrigger className="pl-2 mb-2">
                <Button className="bg-blue-500 text-white shadow-md hover:bg-blue-600 transition duration-300">
                  Modifier
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handlesubmitService(onSubmitService)}>
                  <DialogHeader>
                    <DialogTitle>Modifier le service</DialogTitle>
                    <DialogDescription>
                      Soyez le plus explicite possible
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <input
                      type="hidden"
                      defaultValue={service?.id}
                      {...registerService("idService", { required: true })}
                    />
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="titre" className="text-right">
                        Titre
                      </Label>
                      <Input
                        id="titre"
                        defaultValue={service?.titre}
                        className="col-span-3"
                        {...registerService("titre", {
                          required: true,
                          maxLength: 30,
                          minLength: 5,
                        })}
                      />
                      {Serviceerrors?.titre && (
                        <span className="text-red-500 col-span-3">
                          {Serviceerrors.titre.message}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Date limite
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[240px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Choisir une date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="categorie" className="text-right">
                        Categorie
                      </Label>
                      <select
                        id="categorie"
                        className="col-span-3 w-[240px] h-10 border border-gray-300 rounded-md"
                        {...registerService("categorie_id", { required: true })}
                      >
                        {Categories?.map((categorie) => (
                          <option value={categorie.id} key={categorie?.id}>
                            {categorie.libelle}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="lieu" className="text-right">
                        Lieu
                      </Label>
                      <Input
                        id="lieu"
                        defaultValue={service?.lieu}
                        className="col-span-3"
                        {...registerService("lieu", {
                          required: true,
                          maxLength: 20,
                          minLength: 5,
                        })}
                      />
                      {Serviceerrors?.lieu && (
                        <span className="text-red-500 col-span-3">
                          {Serviceerrors.lieu.message}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="tarif" className="text-right">
                        Tarif
                      </Label>
                      <Input
                        id="tarif"
                        defaultValue={service?.tarif}
                        className="col-span-3"
                        {...registerService("tarif", {
                          required: true,
                          maxLength: 20,
                          minLength: 5,
                        })}
                      />
                      {Serviceerrors?.tarif && (
                        <span className="text-red-500 col-span-3">
                          {Serviceerrors.tarif.message}
                        </span>
                      )}
                    </div>
                    <Textarea
                      placeholder="Type your description here."
                      className="resize-none"
                      defaultValue={service?.description}
                      {...registerService("description", {
                        required: true,
                        maxLength: 100,
                        minLength: 10,
                      })}
                    />
                    {Serviceerrors?.description && (
                      <span className="text-red-500">
                        {Serviceerrors.description.message}
                      </span>
                    )}
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="bg-blue-500 text-white shadow-md hover:bg-blue-600 transition duration-300"
                    >
                   {
                      loading ? "Chargement..." : "Modifier"  
                   }
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            {/* supprimer demande */}
            <Button
              className="bg-red-600 text-white shadow-md hover:bg-red-700 transition duration-300"
              onClick={() => deleteService(service?.id)}
            >
         {
            loadingServiceId === service?.id ? "Suppression..." : "Supprimer"
         }
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
