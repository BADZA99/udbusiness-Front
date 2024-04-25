import axios from "axios";
import { useUserStore } from "../../store/UserStore";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserFunctions } from "../../utils/UserFonctions";
import { useLocation } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  // MenubarShortcut,
  MenubarTrigger,
} from "../ui/menubar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { Input } from "../ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { Calendar } from "../ui/calendar";


import "react-toastify/dist/ReactToastify.css";
import { Label } from "../ui/label";

export default function Navbar() {
  const { user,setUser } = useUserStore();
    const { logoutUser } = useUserFunctions();
      const location = useLocation();
        const [navBackground, setNavBackground] = useState(
          location.pathname !== "/"
        );

      const navRef = React.useRef();
      navRef.current = navBackground;

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.post("/logout");
      if (response.status === 200) {
        localStorage.removeItem("token");
        setUser(null);
        //    toast.success(`${response.data.message}`);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error(`${error.response.data.message}`);
    }
  };
  
 useEffect(() => {
   const handleScroll = () => {
     const show = window.scrollY > 50;
     if (navRef.current !== show) {
       setNavBackground(show);
     }
   };

   // Liste des chemins des pages sur lesquelles je veux désactiver la fonction handleScroll
   const pathsToDisable = [
     "/inscription",
     "/connexion",
     "/offres",
     "/contact",
     "/demandes",
     "/layout/MyOffers",
     "/layout/MyDemands",
     
   ];

   if (!pathsToDisable.includes(location.pathname)) {
     document.addEventListener("scroll", handleScroll);
   }
 

   return () => {
     document.removeEventListener("scroll", handleScroll);
   };
 }, [location]);

     const [date, setDate] = useState();
     const {
       register,
       handleSubmit,
       formState: { errors },
     } = useForm();
     const fetcher = (url) => fetch(url).then((res) => res.json());
     const { data } = useSWR("http://localhost:8000/api/categories", fetcher);
// fonction ajout service
     const onSubmitService = async (data) => {
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
             tarif: data?.tarif,
             date: dateFormated,
             lieu: data?.lieu,
             categorie_id: data?.categorie_id,
             photo: data?.photo[0].name,
             user_id: user?.id,
             nomPrestataire: user?.name,
             telephonePresta: user?.telephone,
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
    //  fonction ajout demande
     const onSubmitDemande = async (data) => {
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
           const response = await axios.post("/createDemande", {
             titre: data?.titre,
             description: data?.description,
             categorie_id: data?.categorie_id,
             date_limite: dateFormated,
             photo: data?.photo[0].name,
             user_id: user?.id,
             nomDemandeur: user?.name,
           });
           if (response?.status === 201) {
             toast.success(`${response.data.message}`);
             console.log(response);
           }
         } else {
           toast.warning("Vous devez vous connecter pour publier une demande");
         }
       } catch (error) {
         console.log(error);
         toast.error(`${error.response.data.message}`);
       }
     };

  return (
    <div
      className={`fixed top-0 w-full h-20 text-white flex justify-between items-center font-openSans p-16 z-30 ${
        navBackground ? "bg-blue-500" : "bg-transparent"
      }`}
    >
      <div className="flex items-center font-bold text-4xl cursor-pointer ">
        <Link to="/">UDFreelance</Link>
      </div>
      {/* menu milieu */}
      <div
        className="w-[40%] mx-auto flex flex-row justify-between items-center rounded-lg
              space-x-2 text-lg p-4"
      >
        {/* acceuil,offres,demandes et contact */}
        <Link to="/" className="">
          Acceuil
        </Link>
        <Link to="/offres" className="">
          Offres
        </Link>
        <Link to="/demandes" className="">
          Demandes
        </Link>
        {/* {user !==null && <Link to="/layout/Profile" title="Profile">
          Mon profile
        </Link>} */}
        <Link to="/contact" className="">
          Contactez-Nous
        </Link>
      </div>
      {/* auth buttons */}
      {user === null && (
        <div
          className=" w-[17%] flex flex-row justify-between items-center rounded-lg
                font-bold "
        >
          <>
            <Link
              to="/connexion"
              className="text-white bg-black rounded-lg p-4  hover:bg-white hover:text-black"
            >
              Connection
            </Link>
            <Link
              to="/inscription"
              className="text-white bg-black rounded-lg p-4 m-2    hover:bg-white hover:text-black"
            >
              Inscription
            </Link>
          </>
        </div>
      )}
      {user !== null && (
        <div className=" w-[15%] flex flex-row items-center justify-center space-x-2">
          {user && (
            <span
              className="font-bold text-xl text-white "
              // style={{ color: "#758283" }}
            >
              {user?.name}
            </span>
          )}
          <Menubar className="">
            <MenubarMenu>
              <MenubarTrigger className="text-black">Profile</MenubarTrigger>
              <MenubarContent>
                {/* popup ajout service */}
                <Dialog>
                  <DialogTrigger className="text-black  pl-2 mb-2">
                    {" "}
                    Publier un Service
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit(onSubmitService)}>
                      <DialogHeader>
                        <DialogTitle>Ajouter un service</DialogTitle>
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
                          {errors?.titre &&
                            errors.titre.type === "required" && (
                              <span className="text-red-500 col-span-3">
                                Ce champ est obligatoire
                              </span>
                            )}
                          {errors?.titre &&
                            errors.titre.type === "maxLength" && (
                              <span className="text-red-500 col-span-3">
                                Le titre ne doit pas dépasser 20 caractères
                              </span>
                            )}
                          {errors?.titre &&
                            errors.titre.type === "minLength" && (
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
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
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
                              La description doit contenir au moins 10
                              caractères
                            </span>
                          )}
                      </div>
                      <DialogFooter>
                        <Button type="submit">Publier</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>{" "}
                <br />
                <MenubarSeparator />
                {/* fin popup ajout service */}
                {/* popup ajout demande */}
                <Dialog>
                  <DialogTrigger className="text-black  mb-2 pl-2">
                    {" "}
                    Publier une demande
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit(onSubmitDemande)}>
                      <DialogHeader>
                        <DialogTitle>Ajouter une Demande</DialogTitle>
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
                              maxLength: 20,
                              minLength: 5,
                            })}
                          />
                          {errors?.titre &&
                            errors.titre.type === "required" && (
                              <span className="text-red-500 col-span-3">
                                Ce champ est obligatoire
                              </span>
                            )}
                          {errors?.titre &&
                            errors.titre.type === "maxLength" && (
                              <span className="text-red-500 col-span-3">
                                Le titre ne doit pas dépasser 20 caractères
                              </span>
                            )}
                          {errors?.titre &&
                            errors.titre.type === "minLength" && (
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
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
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
                            {data?.categories?.map((categorie) => (
                              <option value={categorie?.id} key={categorie?.id}>
                                {categorie?.libelle}
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
                            //   value="Pedro Duarte"
                            type="file"
                            className="col-span-3"
                            {...register("photo")}
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
                              La description doit contenir au moins 10
                              caractères
                            </span>
                          )}
                      </div>
                      <DialogFooter>
                        <Button type="submit">Publier</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                {/* fin popup ajout demande */}
                <MenubarSeparator />
                <MenubarItem>
                  <Link to="/layout/Profile" title="Profile">
                    Mon profile
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  {" "}
                  <Link to="/layout/MyOffers" title="MyOffers">
                    Mes Offres
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  {" "}
                  <Link to="/layout/MyDemands" title="MyDemands">
                    Mes Demandes
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={logout}>Se deconnecter</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      )}
      {/* profil */}
    </div>
  );
}
