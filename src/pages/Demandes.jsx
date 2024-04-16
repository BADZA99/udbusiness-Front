import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import useSWR from "swr";
import { useUserStore } from "../store/UserStore";
import { Button } from "../components/ui/button";
import { fetcher } from "../utils/fertcher";
import { useState } from "react";

export default function Demandes() {
  const { user } = useUserStore();
  const [searchValue, setsearchValue] = useState();
  const [alldemandes, setAlldemandes] = useState();

  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/api/demandes",
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
      <div className=" mt-10 mx-auto w-[95%] h-[100%] flex justify-center space-x-3 space-y-3 items-center flex-wrap text-white">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error</p>}
        {data &&
          data?.demandes
            .filter((demande) =>
              searchValue
                ? demande.titre
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                  demande.description
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                : true
            )
            .map((demande) => (
              <Card className="w-[30%] bg-gray-300 text-black shadow-lg">
                <CardHeader>
                  <CardTitle>{demande?.titre}</CardTitle>
                  <CardDescription className="text-black font-semibold">
                    Publie par :{" "}
                    {demande?.user_id === user?.id
                      ? "Vous"
                      : demande?.nomDemandeur}{" "}
                    le{" "}
                    {new Date(demande?.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{demande?.description}</p>
                </CardContent>
                <CardFooter>
                  <p>
                    Date limite:{" "}
                    {new Date(demande?.date_limite).toLocaleDateString(
                      "fr-FR",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </CardFooter>
              </Card>
            ))}
      </div>
    </>
  );
}
