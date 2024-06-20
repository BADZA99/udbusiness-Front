import React, { useState } from "react";

import { fetcher } from "../../utils/fertcher";
import useSWR from "swr";

const SearchJob = () => {
  const [jobName, setJobName] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
     const { data } = useSWR("http://localhost:8000/api/categories", fetcher);


  const handleSearch = () => {
    // Handle search logic here
  };

  return (
    <div className="flex items-center justify-center space-x-4 p-4 h-52">
      <input
        type="text"
        placeholder="ex: designer"
        value={jobName}
        onChange={(e) => setJobName(e.target.value)}
        className="border-2 focus:border-none border-gray-300 rounded-md p-3 w-1/4"
      />
      <input
        type="text"
        placeholder="Localisation"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border-2 border-gray-300 rounded-md p-3 w-1/4"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border-2 border-gray-300 rounded-md p-3 w-1/4 font-openSans"
      >
        <option value="">Sélectionnez une catégorie</option>
      {
        data?.categories?.map((categorie) => (
          <option value={categorie?.id} key={categorie?.id}>
            {categorie?.libelle}
          </option>
        ))
      }
     
      </select>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white rounded-md px-5 py-3 font-openSans  hover:bg-blue-600 transition-colors duration-200"
      >
        Rechercher
      </button>
    </div>
  );
};

export default SearchJob;
