import React from 'react'

import { useForm } from "react-hook-form";
import { Input } from '../components/ui/input';
import { useUserStore } from '../store/UserStore';
import { Button } from '../components/ui/button';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
// import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user } = useUserStore();
  const [UserCv, setUserCv] = useState(null);

// const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) =>{
    try {
        if(user != null){
            const response = await axios.post(
              `/updateUser/${user?.id}`,
              {
                name: data?.nom,
                adresse: data?.adresse,
                tarif: data?.tarif,
                telephone: data?.telephone,
                cv: UserCv,
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );   
          if(response?.status=== 200){
            toast.success(`${response.data.message}`);
          }
        }
    } catch (error) {
    //   console.log(error);
       toast.error(`${error.response.data.message}`);
    }

  };
  

  return (
    <>
      <Navbar />
      {/* <div className="mt-[5%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" mt-[10%]  w-[43%] space-y-4 mx-auto"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <Input
              {...register("nom", { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
         
            />
            {errors.nom && (
              <span className="text-red-500 text-xs">Ce champ est requis</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Adresse
            </label>
            <Input
    
              {...register("adresse", { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.adresse && (
              <span className="text-red-500 text-xs">Ce champ est requis</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Votre Tarif
            </label>
            <Input
       
              {...register("tarif", { required: true })}
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.tarif && (
              <span className="text-red-500 text-xs">Ce champ est requis</span>
            )}
          </div>
       
          <div>
            <label className="block text-sm font-medium text-gray-700">
              telephone
            </label>
            <Input
              {...register("telephone", { required: true })}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.solde && (
              <span className="text-red-500 text-xs">Ce champ est requis</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              CV
            </label>
            <Input
         
              type="file"
              onChange={(e) => setUserCv(e.target.files[0])}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.cv && (
              <span className="text-red-500 text-xs">Ce champ est requis</span>
            )}
          </div>
        
          <Button>Mettre a jour</Button>
        </form>
      </div> */}

      <section className="py-10 mt-[5%] dark:bg-gray-900">
        <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
          <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
            <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
              Profile
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full mb-4 mt-6">
                  <label className="mb-2 dark:text-gray-300">Nom Complet</label>
                  <input
                    type="text"
                    {...register("nom", { required: true })}
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="ex: papabn"
                  />
                  {errors.nom && (
                    <span className="text-red-500 text-xs">
                      Ce champ est requis
                    </span>
                  )}
                </div>
                <div className="w-full mb-4 lg:mt-6">
                  <label className="dark:text-gray-300">Adresse</label>
                  <input
                    type="text"
                    {...register("adresse", { required: true })}
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="ex: 205 zone de captage"
                  />
                  {errors.adresse && (
                    <span className="text-red-500 text-xs">
                      Ce champ est requis
                    </span>
                  )}
                </div>
                <div className="w-full mb-4 lg:mt-6">
                  <label className="dark:text-gray-300">Tarif</label>
                  <input
                    type="text"
                    {...register("tarif", { required: true })}
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="ex: 150.000"
                  />
                  {errors.tarif && (
                    <span className="text-red-500 text-xs">
                      Ce champ est requis
                    </span>
                  )}
                </div>
                <div className="w-full mb-4 lg:mt-6">
                  <label className="dark:text-gray-300">Contact</label>
                  <input
                    type="text"
                    {...register("telephone", { required: true })}
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="email ou telephone"
                  />
                  {errors.telephone && (
                    <span className="text-red-500 text-xs">
                      Ce champ est requis
                    </span>
                  )}
                </div>
              </div>

              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full">
                  <h3 className="dark:text-gray-300 mb-2">Profile</h3>
                  <select
                    {...register("statut", { required: true })}
                    className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  >
                    <option disabled value="">
                      choisir statut
                    </option>
                    <option value="Entreprise">Entreprise</option>
                    <option value="Particulier">Particulier</option>
                    <option value="auto-entrepreneur">auto-entrepreneur</option>
                  </select>
                  {errors.statut && (
                    <span className="text-red-500 text-xs">
                      Ce champ est requis
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <label className="mb-1 block text-sm font-medium text-white">
                    cv
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setUserCv(e.target.files[0])}
                    className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                <button type="submit" className="w-full/2 p-4">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
