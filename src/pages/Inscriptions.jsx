import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import useSWR from "swr";
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
// import { handleShowAlert } from '../utils/ShowAlert';


export default function Inscriptions() {
  const [sexe, setSexe] = useState("");
  const [allprofile, setAllprofiles] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/api/profiles",
    fetcher
  );
  // console.log(process.env.BASE_URL)



  useEffect(() => {
    if (data) {
      // console.log(data)
      setAllprofiles(data);
    }
  }, [data]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        adresse: data.adresse,
        telephone: data.telephone,
        idProfile: data.role,
        sexe: data.sexe,
      });
      if(response.status=== 200){
        toast.success(`${response.data.message}`);
        setTimeout(()=>{
          navigate("/connexion");
        
        },2000)
      }
      // console.log(response);
    } catch (error) {
       toast.error(`${error.response.data.message}`);
    }
  };
  return (
    <>
      <Navbar />
    <div className="flex flex-col items-center  h-screen">
      {/* <h2 className="mt-7 text-xl font-bold ">Page inscription</h2> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-16 flex flex-col gap-y-4 w-[400px]"
      >
        <label htmlFor="nom">Nom Complet</label>
        <Input
          type="text"
          placeholder="Nom Complet"
          {...register("name", {
            required: true,
            maxLength: 20,
            minLength: 5,
          })}
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
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          placeholder="exemple@gmail.com"
          {...register("email", {
            required: true,
            pattern: {
              value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              message: "Veuillez entrer une adresse email valide.",
            },
          })}
        />
        {errors.email && errors.email?.type === "required" && (
          <span className="text-red-600">Le champ email est requis</span>
        )}
        {errors.email && errors.email?.type === "pattern" && (
          <span className="text-red-600">{errors.email.message}</span>
        )}
        <label htmlFor="Mot de passe">Mot de passe</label>
        <Input
          type="password"
          placeholder="Mot de passe"
          {...register("password", {
            required: true,
            maxLength: 20,
            minLength: 5,
          })}
        />
        {errors.password && errors.password?.type === "required" && (
          <span className="text-red-600">Le champ password est requis</span>
        )}
        {errors.password && errors.password?.type === "maxLength" && (
          <span className="text-yellow-700">Mot de passe trop long</span>
        )}
        {errors.password && errors.password?.type === "minLength" && (
          <span className="text-yellow-700">Mot de passe trop court</span>
        )}
        <label htmlFor="Adresse">Adresse</label>
        <Input
          type="text"
          placeholder="Adresse"
          {...register("adresse", {
            required: true,
            minLength: 5,
          })}
        />
        {errors.adresse && errors.adresse?.type === "required" && (
          <span className="text-red-600">Le champ adresse est requis</span>
        )}
        {errors.adresse && errors.adresse?.type === "minLength" && (
          <span className="text-yellow-700">adresse trop court</span>
        )}
        <label htmlFor="Telephone">Telephone</label>
        <Input
          type="text"
          placeholder="Ex:774327640"
          {...register("telephone", {
            //  le numero doit comporter 9 chiffres maximum
            pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/gm,
            required: true,
          })}
        />
        {errors.telephone && errors.telephone?.type === "pattern" && (
          <span className="text-yellow-700">format telephone incorrect</span>
        )}
        {errors.telephone && errors.telephone?.type === "required" && (
          <span className="text-red-600">telephone est requis</span>
        )}
        <div className="flex flex-row items-center gap-x-4">
          <label htmlFor="role">Je suis : </label>
          <select
            {...register("role", {
              required: true,
            })}
            className="w-[30%] h-6 border border-gray-300 rounded-md"
          >
            {allprofile?.map((profile) => (
              <option value={profile.id} key={profile.id}>
                {profile.NomProfile}
              </option>
            ))}
          </select>
          {errors.role && errors.role?.type === "required" && (
            <span className="text-red-600">Le champ role est requis</span>
          )}
        </div>
        <label htmlFor="sexe">Sexe :</label>
        <div className="flex flex-row items-center gap-x-4">
          <label htmlFor="homme">Homme</label>
          <Input
            className="w-3 h-3"
            type="radio"
            name="sexe"
            id="homme"
            value="homme"
            onChange={(event) => setSexe(event.target.value)}
            {...register("sexe", {
              required: true,
            })}
          />
          <label htmlFor="femme">Femme</label>
          <Input
            className="w-3 h-3"
            type="radio"
            name="sexe"
            id="femme"
            value="femme"
            onChange={(event) => setSexe(event.target.value)}
            {...register("sexe", {
              required: true,
            })}
          />
          {errors.sexe && errors.sexe?.type === "required" && (
            <span className="text-red-600">Le champ sexe est requis</span>
          )}
        </div>
        <Button>S'inscrire</Button>
      </form>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
    </>
  );
}
