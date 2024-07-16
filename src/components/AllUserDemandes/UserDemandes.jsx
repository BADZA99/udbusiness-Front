
import React from 'react'
import useSWR from 'swr';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,DialogDescription } from '../ui/dialog';
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
// import { cn } from "../../lib/utils";
import { Calendar } from "../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { useUserStore } from '../../store/UserStore';

import { useLayoutEffect } from 'react';
import { useState } from 'react';
import { Button } from '../ui/button';
import axios from 'axios';
import { BaseUrl, DemandeUrl } from "../../utils/Urls";

export default function AllUserDemandes() {
  const { user } = useUserStore();
     const [date, setDate] = useState();
     const [Loading, setLoading] = useState(false);
       const [loadingDemandeId, setLoadingDemandeId] = useState(null);
     const [Categories, setCategories] = useState([]);
    
       const [ImgDemandefile, setImgDemandeFile] = useState(null);

  const [userdemandes, setUserdemandes] = useState([]);
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm();
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${BaseUrl}userDemandes/${user?.id}`,
    fetcher
  );
  // console.log(user);



  //  fonction qui supprime une demande avec axios
  const deleteDemande = async (id) => {
        setLoadingDemandeId(id); 
    try {
      setLoading(true);
      const response = await axios.delete(`/deleteDemande/${id}`);
   if(response.status === 200) {
      toast.success("Demande supprimée avec succès");
      setLoading(false);
   }else{
      toast.error("Erreur lors de la suppression");
      setLoading(false);
      
   }
    } catch (error) {
      // console.error(error);
      toast.error("Erreur lors de la suppression");
      setLoading(false);

    }finally {
      setLoadingDemandeId(null); // Arrête le chargement une fois terminé
    }
  };

  // fonction qui modifie une demande 
  const onSubmit = async (data) => {
    console.log(ImgDemandefile)
     let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      let dateFormated = [year, month, day].join("-");
    // const formData = new FormData();
    // formData.append("titre", data.titre);
    // formData.append("description", data.description);

    // formData.append("categorie_id", data.categorie_id);
    // formData.append("photo", ImgDemandefile);
    // formData.append("user_id", user?.id);
    // formData.append("nomDemandeur", user?.name);
    // formData.append("date_limite", dateFormated);
    // formData.append("idDemande", data?.idDemande);
  try {
    setLoading(true);
  const response = await axios.patch( `/updateDemande/${data?.idDemande}?titre=${data?.titre}&description=${data?.description}&date_limite=${dateFormated}&categorie_id=${data?.categorie_id}&user_id${data?.user_id}&nomDemandeur=${user?.name}
        `, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  if (response?.status === 200) {
    toast.success(`${response?.data.message}`);
      setLoading(false);

  } else {
    toast.error(`erreur lors de la modification`);
      setLoading(false);

  }
} catch (error) {
  console.log(error);
  toast.error(`erreur lors de la modification`);
      setLoading(false);


}
  };

  // fonction qui recupere tous les categories
  const getCategories = async () => {
    try {
      const response = await axios.get("/categories");
      setCategories(response?.data?.categories);
    } catch (error) {
      console.log(error);
    }
  };

  // fonction qui va reset les champs du formulaire
  const resetForm = () => {
    reset();
  };



  useLayoutEffect(() => {
    if (data) {
      setUserdemandes(data?.demandes);
      getCategories();
    }
  }, [data]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-10 md:px-20">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {data &&
        userdemandes?.map((demande) => (
          <div
            className="bg-white rounded-xl shadow-md overflow-hidden"
            key={demande?.id}
          >
            <div className="relative">
              <img
                className="w-full h-48 object-cover"
                src={`${DemandeUrl}/${demande.photo}`}
                alt={demande?.titre}
              />
              <div className="absolute top-0 right-0 bg-indigo-500 text-white font-bold px-2 py-1 m-2 rounded-md">
                New
              </div>
              <div className="absolute bottom-0 right-0 bg-gray-800 text-white px-2 py-1 m-2 rounded-md text-xs">
                {new Date(demande?.created_at).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
            <div className="p-4">
              <div className="text-lg font-medium text-gray-800 mb-2">
                {demande?.titre}
              </div>
              <p className="text-gray-500 text-sm">{demande?.description}</p>
              <p className="text-gray-600 font-medium">
                Date limite:{" "}
                {new Date(demande?.date_limite).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="p-4 flex justify-between items-center">
              <Dialog>
                <DialogTrigger>
                  <Button className="font-bold bg-blue-600 text-white shadow-md hover:bg-blue-700 transition duration-300 m-2">
                    Modifier
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                      <DialogTitle>Mettre à jour une Demande</DialogTitle>
                      <DialogDescription>
                        Soyez le plus explicite possible
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="titre" className="text-right">
                          Titre
                        </Label>
                        <Input
                          id="titre"
                          defaultValue={demande?.titre}
                          className="col-span-3"
                          {...register("titre", {
                            required: true,
                            maxLength: 20,
                            minLength: 5,
                          })}
                        />
                        <Input
                          id="idDemande"
                          value={demande?.id}
                          type="hidden"
                          className="col-span-3"
                          {...register("idDemande")}
                        />
                        {errors?.titre && (
                          <span className="text-red-500 col-span-3">
                            {errors.titre.type === "required" &&
                              "Ce champ est obligatoire"}
                            {errors.titre.type === "maxLength" &&
                              "Le titre ne doit pas dépasser 20 caractères"}
                            {errors.titre.type === "minLength" &&
                              "Le titre doit contenir au moins 5 caractères"}
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
                              variant={"outline"}
                              className={`w-[240px] justify-start text-left font-normal ${
                                !date && "text-muted-foreground"
                              }`}
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
                          defaultValue={demande?.categorie_id}
                          className="col-span-3 w-[240px] h-10 border border-gray-300 rounded-md"
                          {...register("categorie_id", { required: true })}
                        >
                          {Categories?.map((categorie) => (
                            <option value={categorie.id} key={categorie?.id}>
                              {categorie.libelle}
                            </option>
                          ))}
                        </select>
                      </div>
                      <Textarea
                        placeholder="Type your description here."
                        className="resize-none"
                        defaultValue={demande?.description}
                        {...register("description", {
                          required: true,
                          maxLength: 100,
                          minLength: 10,
                        })}
                      />
                      {errors?.description && (
                        <span className="text-red-500">
                          {errors.description.type === "required" &&
                            "La description est obligatoire"}
                          {errors.description.type === "maxLength" &&
                            "La description ne doit pas dépasser 100 caractères"}
                          {errors.description.type === "minLength" &&
                            "La description doit contenir au moins 10 caractères"}
                        </span>
                      )}
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="bg-blue-500 text-white shadow-md hover:bg-blue-600 transition duration-300"
                      >
                     {
                        Loading ? "Chargement..." : "Modifier"
                     }
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button
                className="bg-red-600 text-white shadow-md hover:bg-red-700 transition duration-300"
                onClick={() => deleteDemande(demande?.id)}
                
              >
                   {loadingDemandeId === demande?.id ? "Chargement..." : "Supprimer"}
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
}
