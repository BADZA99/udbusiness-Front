import React from 'react'

export default function DemandeItem({ titre, nomDemandeur, date }) {
  return (
    <div className=" w-full flex justify-between items-center border-b-2 p-7 bg-slate-200 rounded-sm hover:shadow-lg transition-shadow mb-3 ">
      <div className="">
        <div className="font-bold text-xl font-montserrat mb-2">{titre}</div>
        <div className="font-bold flex gap-1">
          poste par <span className="text-blue-500">{nomDemandeur}</span>
        </div>
      </div>
      <div className="font-openSans">
        <div className="font-openSans mr-auto">{date}</div>
      </div>
    </div>
  );
}
