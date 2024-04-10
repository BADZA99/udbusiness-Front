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

export default function Demandes() {
  const { user } = useUserStore();
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/api/demandes",
    fetcher
  );
  return (
    <div className=" mt-16 mx-auto w-[95%] h-[100%] flex justify-center space-x-3 space-y-3 items-center flex-wrap text-white">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {data &&
        data?.demandes.map((demande) => (
          <Card className="w-[30%] bg-gray-300 text-black shadow-lg">
            <CardHeader>
              <CardTitle>{demande?.titre}</CardTitle>
              <CardDescription className="text-black font-semibold">
                Publie par : {demande?.user_id === user?.id ? "Vous" : demande?.nomDemandeur} le{" "}
                {new Date(demande?.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{demande?.description}</p>
            </CardContent>
            <CardFooter>
              <p>
                Date limite:{" "}
                {new Date(demande?.date_limite).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </CardFooter>
          </Card>
        ))}     
    </div>
  );
}
