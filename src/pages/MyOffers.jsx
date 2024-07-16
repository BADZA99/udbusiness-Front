import React from 'react'
import { useState } from 'react';
import { useUserStore } from '../store/UserStore';
// import useSWR from 'swr';

// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllUserServices from '../components/AllUserServices/AllUserServices';
// import { BaseUrl } from '../utils/Urls';

export default function MyOffers() {
     const [date, setDate] = useState();
     const { user } = useUserStore();
  
    //  const fetcher = (url) => fetch(url).then((res) => res.json());
    //  const { data } = useSWR(`${BaseUrl}categories`, fetcher);

      // const onSubmit = async (data) => {
      //   try {
      //     if (user) {
      //       // format la date en Y-m-d
      //       let d = new Date(date),
      //         month = "" + (d.getMonth() + 1),
      //         day = "" + d.getDate(),
      //         year = d.getFullYear();
      //       if (month.length < 2) month = "0" + month;
      //       if (day.length < 2) day = "0" + day;
      //       let dateFormated = [year, month, day].join("-");
      //       // console.log("Photo",data?.photo[0].name);
      //       const response = await axios.post("/createService", {
      //         titre: data?.titre,
      //         description: data?.description,
      //         tarif:data?.tarif,
      //         date: dateFormated,
      //         lieu: data?.lieu,
      //         categorie_id: data?.categorie_id,
      //         photo: data?.photo[0].name,
      //         user_id: user?.id,
      //         nomPrestataire: user?.name,
      //         telephonePresta:user?.telephone,
      //       });
      //       if (response?.status === 201) {
      //         toast.success(`${response.data.message}`);
      //       //   console.log(response);
      //       }
      //     } else {
      //       toast.warning("Vous devez vous connecter pour publier un service");
      //     }
      //   } catch (error) {
      //     console.log(error);
      //     toast.error(`${error.response.data.message}`);
      //   }
      // };
  return (


        <div className="mt-[5%] ml-auto">
          <AllUserServices />
        </div>
  
  );
}
