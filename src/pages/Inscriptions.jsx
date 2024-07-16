import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

import useSWR from "swr";
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
// import { useUserFunctions } from '../utils/UserFonctions';
import { fetcher } from '../utils/fertcher';
import { BaseUrl } from '../utils/Urls';
// import { handleShowAlert } from '../utils/ShowAlert';


export default function Inscriptions() {
    // const { registerUser } =
    //   useUserFunctions();
  const [ setSexe] = useState("");
  const [allprofile, setAllprofiles] = useState([]);
       const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const { data,} = useSWR(
    `${BaseUrl}profiles`,
    fetcher
  );




  useEffect(() => {
    if (data) {
      // console.log(data)
      setAllprofiles(data);
    }
  }, [data]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("/register", {
        name: data?.name,
        email: data?.email,
        password: data?.password,
        adresse: data?.adresse,
        telephone: data?.telephone,
        idProfile: data?.role,
        sexe: data?.sexe,
      });
      if(response?.status=== 200){
        toast.success(`${response.data.message}`);
        setLoading(false);
        setTimeout(()=>{
          navigate("/connexion");
        
        },2000)
      }
    } catch (error) {
      console.log(error);
       toast.error(`${error.response.data.message}`);
      setLoading(false);
    }
  };
  
  
  return (
    <>
      <Navbar />
     <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="mt-12 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" class="block text-sm font-medium leading-5 text-gray-700">Nom Complet</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="name"
              name="name"
              placeholder="John Doe"
              type="text"
              {...register("name", {
                required: true,
                maxLength: 20,
                minLength: 5,
              })}
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
            {errors.name?.type === "required" && (
              <span className="text-red-600">Ce champ est obligatoire.</span>
            )}
            {errors.name?.type === "maxLength" && (
              <span className="text-yellow-700">
                Le nom doit contenir au maximum 20 caractères.
              </span>
            )}
            {errors.name?.type === "minLength" && (
              <span className="text-yellow-700">
                Le nom doit contenir au minimum 5 caractères.
              </span>
            )}
          </div>
        </div>

        <div class="mt-6">
          <label htmlFor="adresse" class="block text-sm font-medium leading-5 text-gray-700">Adresse</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <input
              id="adresse"
              name="adresse"
              placeholder="106 zone de captage"
              type="text"
              {...register("adresse", {
                required: true,
                minLength: 5,
              })}
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
            {errors.adresse && errors.adresse?.type === "required" && (
              <span className="text-red-600">Le champ adresse est requis</span>
            )}
            {errors.adresse && errors.adresse?.type === "minLength" && (
              <span className="text-yellow-700">Adresse trop courte</span>
            )}
          </div>
        </div>

        <div class="mt-6">
          <label htmlFor="telephone" class="block text-sm font-medium leading-5 text-gray-700">Téléphone</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <input
              id="telephone"
              name="telephone"
              placeholder="774327640"
              type="text"
              {...register("telephone", {
                required: true,
                pattern: {
                  value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/gm,
                  message: "Format de téléphone incorrect",
                },
              })}
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
            {errors.telephone && errors.telephone?.type === "required" && (
              <span className="text-red-600">Le champ téléphone est requis</span>
            )}
            {errors.telephone && errors.telephone?.type === "pattern" && (
              <span className="text-yellow-700">Format de téléphone incorrect</span>
            )}
          </div>
        </div>

        <div class="mt-6">
          <label htmlFor="email" class="block text-sm font-medium leading-5 text-gray-700">Email</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="email"
              name="email"
              placeholder="user@example.com"
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                  message: "Veuillez entrer une adresse email valide.",
                },
              })}
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
            {errors.email && errors.email?.type === "required" && (
              <span className="text-red-600">Le champ email est requis</span>
            )}
            {errors.email && errors.email?.type === "pattern" && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>
        </div>

        <div class="mt-6">
          <label htmlFor="password" class="block text-sm font-medium leading-5 text-gray-700">Mot de passe</label>
          <div class="mt-1 rounded-md shadow-sm">
            <input
              id="password"
              name="password"
              type="password"
              {...register("password", {
                required: true,
                maxLength: 20,
                minLength: 5,
              })}
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
            {errors.password && errors.password?.type === "required" && (
              <span className="text-red-600">Le champ mot de passe est requis</span>
            )}
            {errors.password && errors.password?.type === "maxLength" && (
              <span className="text-yellow-700">Mot de passe trop long</span>
            )}
            {errors.password && errors.password?.type === "minLength" && (
              <span className="text-yellow-700">Mot de passe trop court</span>
            )}
          </div>
        </div>

        <div class="mt-6">
          <label htmlFor="role" class="block text-sm font-medium leading-5 text-gray-700">Je suis :</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <select
              id="role"
              name="role"
              {...register("role", {
                required: true,
              })}
              class="block w-full text-sm font-medium transition duration-75 border border-gray-800 rounded-lg shadow-sm h-9 focus:border-blue-600 focus:ring-1 focus:ring-inset focus:ring-blue-600 bg-none"
            >
              {allprofile?.map((profile) => (
                <option value={profile.id} key={profile.id}>
                  {profile.NomProfile}
                </option>
              ))}
            </select>
            {errors.role && errors.role?.type === "required" && (
              <span className="text-red-600">Le champ rôle est requis</span>
            )}
          </div>
        </div>

        <div class="mt-6">
          <label class="block text-sm font-medium leading-5 text-gray-700">Sexe :</label>
          <div class="mt-1 flex flex-row items-center gap-x-4">
            <label htmlFor="homme" class="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer">
              <input
                class="w-3 h-3"
                type="radio"
                name="sexe"
                id="homme"
                value="homme"
                onChange={(event) => setSexe(event.target.value)}
                {...register("sexe", {
                  required: true,
                })}
              />
              <i class="pl-2">Homme</i>
            </label>

            <label htmlFor="femme" class="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer">
              <input
                class="w-3 h-3"
                type="radio"
                name="sexe"
                id="femme"
                value="femme"
                onChange={(event) => setSexe(event.target.value)}
                {...register("sexe", {
                  required: true,
                })}
              />
              <i class="pl-2">Femme</i>
            </label>

            {errors.sexe && errors.sexe?.type === "required" && (
              <span className="text-red-600">Le champ sexe est requis</span>
            )}
          </div>
        </div>

        <div class="mt-6">
          <span class="block w-full rounded-md shadow-sm">
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">
           {
              Loading ? "loading..." : "S'inscrire"
           }
            </button>
          </span>
        </div>
      </form>
    </div>
  </div>
</div>

    </>
  );
}
