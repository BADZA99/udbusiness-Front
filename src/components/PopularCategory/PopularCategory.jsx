import React from "react";
import { GrPersonalComputer } from "react-icons/gr";
import { PiOfficeChairFill, PiStudentBold } from "react-icons/pi";
import { SiBigcommerce } from "react-icons/si";
// import { Icon1, Icon2, Icon3, Icon4 } from "./icons"; // Remplacez par les vrais noms de vos icônes

export default function PopularCategory() {
    const categories = [
      { icon: <GrPersonalComputer size={60} />, name: "Informatique" },
      { icon: <PiOfficeChairFill size={60} />, name: "bureautique" },
      { icon: <PiStudentBold size={60} />, name: "Stage" },
      { icon: <SiBigcommerce size={60} />, name: "Commerce" },
    ];

  return (
    <div className="flex justify-between mx-auto w-[70%] p-10">
      {categories.map((category, index) => (
        <div
          key={index}
          className="w-1/4 p-4 bg-white hover:bg-blue-500 transition-colors duration-200 rounded-lg flex flex-col items-center justify-center"
        >
          {category.icon}
          <div className="mt-2 text-xl font-openSans">{category.name}</div>
        </div>
      ))}
    </div>
  );
}
