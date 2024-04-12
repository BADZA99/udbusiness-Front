
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
import { cn } from "../../lib/utils";
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

export default function AllUserDemandes() {
  const { user } = useUserStore();
     const [date, setDate] = useState();
     const [Categories, setCategories] = useState([]);

  const [userdemandes, setUserdemandes] = useState([]);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/api/userDemandes/${user?.id}`,
    fetcher
  );

  //  fonction qui supprime une demande avec axios
  const deleteDemande = async (id) => {
    try {
      const response = await axios.delete(`/deleteDemande/${id}`);
   if(response.status === 200) {
      toast.success("Demande supprimée avec succès");
   }else{
      toast.error("Erreur lors de la suppression");
   }
    } catch (error) {
      // console.error(error);
    }
  };

  // fonction qui modifie une demande 
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("titre", data.titre);
    formData.append("description", data.description);
    formData.append("date_limite", date);
    formData.append("categorie_id", data.categorie_id);
    formData.append("photo", data.photo[0]);
    formData.append("user_id", user?.id);
      let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      let dateFormated = [year, month, day].join("-");
    try {
      const response = await axios.patch(
        `/updateDemande/${data.idDemande}?titre=${data.titre}&description=${data.description}&date_limite=${dateFormated}&categorie_id=${data.categorie_id}&photo=${data.photo}&user_id${data.user_id}?
        `
      );
      if (response?.status === 200) {
        toast.success(`${response?.data.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`);
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




  useLayoutEffect(() => {
    if (data) {
      setUserdemandes(data?.demandes);
      getCategories();
    }
  }, [data]);
  return (
    <div className=" mt-16 mx-auto w-[95%] h-[100%] flex justify-center space-x-3 space-y-3 items-center flex-wrap text-white">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {data &&
        userdemandes?.map((demande) => (
          <Card
            className="w-[30%] bg-gray-300 text-black shadow-lg"
            key={demande?.id}
          >
            <CardHeader>
              <CardTitle>{demande?.titre}</CardTitle>
              <CardDescription className="text-black font-semibold">
                Publie par :{" "}
                {demande?.user_id === user?.id ? "Vous" : demande?.nomDemandeur}{" "}
                le{" "}
                {new Date(demande?.created_at).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{demande?.description}</p> <br />
              <p>
                Date limite:{" "}
                {new Date(demande?.date_limite).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger>
                  {" "}
                  <Button className="font-bold bg-blue-600 m-2">
                    Modifier
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                      <DialogTitle>Mettre a jour une Demande</DialogTitle>
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
                        {errors?.titre && errors.titre.type === "required" && (
                          <span className="text-red-500 col-span-3">
                            Ce champ est obligatoire
                          </span>
                        )}
                        {errors?.titre && errors.titre.type === "maxLength" && (
                          <span className="text-red-500 col-span-3">
                            Le titre ne doit pas dépasser 20 caractères
                          </span>
                        )}
                        {errors?.titre && errors.titre.type === "minLength" && (
                          <span className="text-red-500 col-span-3">
                            Le titre doit contenir au moins 5 caractères
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
                      {/* select categorie */}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="categorie" className="text-right">
                          Categorie
                        </Label>
                        <select
                          id="categorie"
                          // mettre la valeur de la demande selectionner
                          defaultValue={demande?.categorie_id}
                          className="col-span-3 w-[240px] h-10 border border-gray-300 rounded-md"
                          {...register("categorie_id", {
                            required: true,
                          })}
                        >
                          {Categories?.map((categorie) => (
                            <option value={categorie.id} key={categorie?.id}>
                              {categorie.libelle}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="photo" className="text-right">
                          photo
                        </Label>
                        <Input
                          id="photo"
                          // mettre la valeur de la demande selectionner
                       
                          type="file"
                          className="col-span-3"
                          {...register("photo")}
                        />
                      </div>
                      <Textarea
                        placeholder="Type your description here."
                        className="resize-none"
                        // mettre la valeur de la demande selectionner
                        defaultValue={demande?.description}
                        {...register("description", {
                          required: true,
                          maxLength: 100,
                          minLength: 10,
                        })}
                      />
                      {errors?.description &&
                        errors.description.type === "required" && (
                          <span className="text-red-500">
                            la description est obligatoire
                          </span>
                        )}
                      {errors?.description &&
                        errors.description.type === "maxLength" && (
                          <span className="text-red-500">
                            La description ne doit pas dépasser 100 caractères
                          </span>
                        )}
                      {errors?.description &&
                        errors.description.type === "minLength" && (
                          <span className="text-red-500 ">
                            La description doit contenir au moins 10 caractères
                          </span>
                        )}
                    </div>
                    <DialogFooter>
                      <Button type="submit">Publier</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button
                className="bg-red-600"
                onClick={() => deleteDemande(demande?.id)}
              >
                Supprimerrr
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
