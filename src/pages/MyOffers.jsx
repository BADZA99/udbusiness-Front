import React from 'react'
import { useState } from 'react';
import { useUserStore } from '../store/UserStore';
import useSWR from 'swr';
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllUserServices from '../components/AllUserServices/AllUserServices';
import { BaseUrl } from '../utils/Urls';

export default function MyOffers() {
     const [date, setDate] = useState();
     const { user } = useUserStore();
     const {
       register,
       handleSubmit,
       formState: { errors },
     } = useForm();
     const fetcher = (url) => fetch(url).then((res) => res.json());
     const { data } = useSWR(`${BaseUrl}categories`, fetcher);

      const onSubmit = async (data) => {
        try {
          if (user) {
            // format la date en Y-m-d
            let d = new Date(date),
              month = "" + (d.getMonth() + 1),
              day = "" + d.getDate(),
              year = d.getFullYear();
            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;
            let dateFormated = [year, month, day].join("-");
            // console.log("Photo",data?.photo[0].name);
            const response = await axios.post("/createService", {
              titre: data?.titre,
              description: data?.description,
              tarif:data?.tarif,
              date: dateFormated,
              lieu: data?.lieu,
              categorie_id: data?.categorie_id,
              photo: data?.photo[0].name,
              user_id: user?.id,
              nomPrestataire: user?.name,
              telephonePresta:user?.telephone,
            });
            if (response?.status === 201) {
              toast.success(`${response.data.message}`);
            //   console.log(response);
            }
          } else {
            toast.warning("Vous devez vous connecter pour publier un service");
          }
        } catch (error) {
          console.log(error);
          toast.error(`${error.response.data.message}`);
        }
      };
  return (
    <div className="mt-[5%]">
      <div className=" mt-[10%] w-[90%] h-[100vh] mx-auto bg-gray-500 border border-3">
        <div className=" ml-auto">
          <Dialog>
            <DialogTrigger>
              {" "}
              <Button className="font-bold">Ajouter service</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle>Ajouter une un service</DialogTitle>
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
                      //   value="Pedro Duarte"
                      className="col-span-3"
                      {...register("titre", {
                        required: true,
                        maxLength: 30,
                        minLength: 5,
                      })}
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
                      className="col-span-3 w-[240px] h-10 border border-gray-300 rounded-md"
                      {...register("categorie_id", {
                        required: true,
                      })}
                    >
                      {data?.categories.map((categorie) => (
                        <option value={categorie.id} key={categorie?.id}>
                          {categorie.libelle}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* photo */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="photo" className="text-right">
                      photo
                    </Label>
                    <Input
                      id="photo"
                      //   value="Pedro Duarte"
                      type="file"
                      className="col-span-3"
                      {...register("photo")}
                    />
                  </div>
                  {/* lieu */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="lieu" className="text-right">
                      lieu
                    </Label>
                    <Input
                      id="lieu"
                      //   value="Pedro Duarte"
                      type="text"
                      className="col-span-3"
                      {...register("lieu")}
                    />
                  </div>
                  {/* tarif */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tarif" className="text-right">
                      tarif
                    </Label>
                    <Input
                      id="tarif"
                      type="text"
                      className="col-span-3"
                      {...register("tarif")}
                    />
                  </div>
                  <Textarea
                    placeholder="Type your description here."
                    className="resize-none"
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
          <AllUserServices />
        </div>
      </div>
    </div>
  );
}
