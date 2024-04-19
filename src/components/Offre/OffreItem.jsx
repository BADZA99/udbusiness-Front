import React from 'react'
import { IoLocationSharp } from 'react-icons/io5';

export default function OffreItem() {
  return (
    <div className=" w-full flex justify-between items-center border-b-2 p-7 bg-slate-200 rounded-sm hover:shadow-lg transition-shadow mb-3 ">
      <div className=''>
        <div className="font-bold text-xl font-montserrat mb-2">developer web </div>
        <div className="font-bold flex gap-1">
          poste par <span className="text-blue-500">papa</span>
          <IoLocationSharp size={15} color="gray" />{" "}
          <span className="text-gray-500">Zone de captage</span>
        </div>
      </div>
      <div className="font-openSans">
        <div className="mb-2 font-bold">10000 Fcfa/mois</div>
        <div className="font-openSans mr-auto">12/23/30</div>
      </div>
    </div>
  );
}
