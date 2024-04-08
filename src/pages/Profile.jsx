import React, { useEffect, useLayoutEffect } from 'react'

import { useForm } from "react-hook-form";
import { Input } from '../components/ui/input';
import { useUserStore } from '../store/UserStore';
import { Button } from '../components/ui/button';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, setUser } = useUserStore();
const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) =>{
    try {
        if(user != null){
            const response = await axios.post(`/updateUser/${user?.id}`, {
            name: data?.nom,
            adresse: data?.adresse,
            tarif: data?.tarif,
            telephone: data?.telephone,
            cv: data?.cv,
          });   
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
      <div className="mt-[5%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" mt-[8%]  w-[43%] space-y-4 mx-auto"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <Input
              {...register("nom", { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            //   value={user?.name}
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
            //   value={user?.adresse}
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
            //   value={user?.tarif}
              {...register("tarif", { required: true })}
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.tarif && (
              <span className="text-red-500 text-xs">Ce champ est requis</span>
            )}
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Image de profil
            </label>
            <Input
              value={user?.image}
              {...register("imageProfile", { required: true })}
              type="file"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.imageProfile && (
              <span className="text-red-500 text-xs">Ce champ est requis</span>
            )}
          </div> */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              telephone
            </label>
            <Input
            //   value={user?.telephone}
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
             
              {...register("cv", { required: true })}
              type="file"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {errors.cv && (
              <span className="text-red-500 text-xs">Ce champ est requis</span>
            )}
          </div>
          {/* <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Soumettre
        </button> */}
          <Button>Mettre a jour</Button>
        </form>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </>
  );
}
