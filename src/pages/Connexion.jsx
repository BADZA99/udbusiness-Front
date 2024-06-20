
import React from "react";
import { useForm } from "react-hook-form";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar/Navbar";
import { useUserStore } from "../store/UserStore";
// import { useUserFunctions } from "../utils/UserFonctions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Connexion() {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 const onSubmit = async (data) => {
    try {
      const response = await axios.post("/login", {
        email: data?.email,
        password: data?.password,
      });
      if (response?.status === 200) {
        // localStorage.setItem("token", response.data.token);
        setUser(response.data);
        toast.success(`${response.data.message}`);
        setTimeout(() => {
          navigate("/layout");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`);
    }
 };


  return (
    <>
      <Navbar />
      <div className=" mt-5 flex flex-col items-center justify-center  h-screen">
        {/* <h2 className=" text-xl font-bold ">Page connection</h2> */}
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col gap-y-4 w-[400px]"
        >
          <label htmlFor="email" className="font-openSans font-bold text-xl">
            Email
          </label>
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
          {errors?.email && errors?.email?.type === "required" && (
            <span className="text-red-600">Le champ email est requis</span>
          )}
          {errors?.email && errors?.email?.type === "pattern" && (
            <span className="text-red-600">{errors.email.message}</span>
          )}
          <label
            htmlFor="Mot de passe"
            className="font-openSans font-bold text-xl"
          >
            Mot de passe
          </label>
          <Input
            type="password"
            placeholder="Mot de passe"
            {...register("password", {
              required: true,
              maxLength: 20,
              minLength: 5,
            })}
            className="h-10"
          />
          {errors?.password && errors?.password?.type === "required" && (
            <span className="text-red-600">Le champ password est requis</span>
          )}
          {errors?.password && errors?.password?.type === "maxLength" && (
            <span className="text-yellow-700">Mot de passe trop long</span>
          )}
          {errors?.password && errors?.password?.type === "minLength" && (
            <span className="text-yellow-700">Mot de passe trop court</span>
          )}
          <Button className="bg-blue-500 font-openSans w-28 mx-auto">Connexion</Button>
        </form>
      </div>
    </>
  );
}
