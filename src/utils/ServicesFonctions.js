// importer axios
import axios from "axios";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSWR from "swr";
import { fetcher } from "./fertcher";
import { BaseUrl } from "./Urls";

// cree le composant qui va retourner les fonctions suivantes:allservices,allcategories

export const useServicesFonctions = () => {

  const { data } = useSWR(`${BaseUrl}services`, fetcher);
  const allServices = data?.services;

  // fonction qui va recuperer toutes les categories
  const allCategories = async () => {
    try {
      const response = await axios.get("/categories");
      return response.categories;
    } catch (error) {
      console.error(error);
      //toast.error(`${error.response.data.message}`);
    }
  };

  return { allServices, allCategories };
};
