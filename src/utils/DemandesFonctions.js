
import "react-toastify/dist/ReactToastify.css";
import useSWR from "swr";
import { fetcher } from "./fertcher";
import { BaseUrl } from "./Urls";

export const useDemandesFonctions = () => {
    // fonction qui va recuperer toutes les demandes
    //  utilise swr
    const { data } = useSWR(`${BaseUrl}demandes`, fetcher);
    const allDemandes = data?.demandes;
    return { allDemandes };
    };
