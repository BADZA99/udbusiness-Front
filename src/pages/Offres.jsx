import React from 'react'
import { useUserStore } from '../store/UserStore';
import useSWR from 'swr';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useState } from 'react';
export default function Offres() {
   const { user } = useUserStore();
  const [searchValue, setsearchValue] = useState();

   const fetcher = (url) => fetch(url).then((res) => res.json());
   const { data, error, isLoading } = useSWR(
     "http://localhost:8000/api/services",
     fetcher
   );

    const handleSearchChange = (e) => {
      setsearchValue(e.target.value);
    };
  return (
    <>
      {/* barre de recherche */}
      <div
        className=" mt-20 flex justify-center m
      t-5"
      >
        <input
          type="text"
          placeholder="Rechercher une demande"
          className="w-[50%] h-10 rounded-lg p-2"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      <div className="mt-10 p-3 mx-auto w-[95%] h-[100%] flex justify-center space-x-3  items-center flex-wrap text-white ">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error</p>}
        {data &&
          data?.services
            .filter((service) =>
              searchValue
                ? service.titre
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                  service.description
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                : true
            )
            .map((service) => (
              <Card className="w-[30%] bg-gray-300 text-black shadow-lg">
                <CardHeader>
                  <CardTitle>{service?.titre}</CardTitle>
                  <CardDescription className="text-black font-semibold">
                    Publie par :{" "}
                    {service?.user_id === user?.id
                      ? "Vous"
                      : service?.nomPrestataire}{" "}
                    le{" "}
                    {new Date(service?.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{service?.description}</p>
                  <p>tarif: {service?.tarif}/mois</p>
                  <p>Lieu: {service?.lieu}</p>
                </CardContent>
                <CardFooter>
                  <p>Contactez le Prestataire au: {service?.telephonePresta}</p>
                </CardFooter>
              </Card>
            ))}
      </div>
    </>
  );
}
