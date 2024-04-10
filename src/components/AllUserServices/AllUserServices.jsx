import React from 'react'
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useUserStore } from "../../store/UserStore";
// import { useEffect } from 'react';
import { useLayoutEffect } from "react";
import { useState } from "react";
import { Button } from '../ui/button';
export default function AllUserServices() {
     const { user } = useUserStore();
     const [userservices, setUserservices] = useState([]);
     const fetcher = (url) => fetch(url).then((res) => res.json());
     const { data, error, isLoading } = useSWR(
       `http://localhost:8000/api/services/${user?.id}`,
       fetcher
     );

     useLayoutEffect(() => {
       if (data) {
         setUserservices(data.services);
        //  console.log(data.services);
       }
     }, [data]);
  return (
    <div className=" mt-16 mx-auto w-[95%] h-[100%] flex justify-center space-x-3 space-y-3 items-center flex-wrap text-white">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {data &&
        userservices?.map((service) => (
          <Card
            className="w-[30%] bg-gray-300 text-black shadow-lg"
            key={service?.id}
          >
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
              <p>Contactez le Prestataire au: {service?.telephonePresta}</p>
            </CardContent>
            <CardFooter>
              <Button className="bg-blue-600 m-2">Modifier</Button>
              <Button className="bg-red-600">Supprimer</Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
