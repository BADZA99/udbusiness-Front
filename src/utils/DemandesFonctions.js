import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSWR from "swr";
import { fetcher } from "./fertcher";
import { BaseUrl } from "./Urls";

// cree le composant qui va retourner les fonctions suivantes:alldemandes

export const useDemandesFonctions = () => {
    // fonction qui va recuperer toutes les demandes
    //  utilise swr
    const { data } = useSWR(`${BaseUrl}demandes`, fetcher);
    const allDemandes = data?.demandes;
    
    return { allDemandes };
    };
