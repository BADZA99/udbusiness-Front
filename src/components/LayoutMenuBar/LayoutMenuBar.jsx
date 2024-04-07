import React from 'react'
import { Link } from 'react-router-dom'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../ui/menubar";


export default function LayoutMenuBar() {
  return (
    <div className="fixed top-0  w-full h-16 z-300 flex flex-row justify-between items-center">
      {/* barre navigation central */}
      <div
        className="fixed top-0 bg-white text-black w-[40%] h-16 z-300 left-[50%] translate-x-[-50%] flex flex-row justify-between items-center px-2 py-2 rounded-lg
       shadow-xl font-bold
      "
      >
        <Link to="/Acceuil" title="Acceuil">
          Acceuil
        </Link>
        <Link to="/home" title="Home">
          Offreurs
        </Link>
        <Link to="/home" title="Home">
          Demandes
        </Link>
      </div>

      {/* logo */}
      <div className="m-3 font-bold text-2xl">UD</div>
      {/* profil */}
      <div className="m-6 flex flex-row items-center ">
        <span
          className="font-bold text-xl"
          // style={{ color: "#758283" }}
        >
          Nom
        </span>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Profile</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Mon profile <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>Mes Offres</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Mes Demandes</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Se deconnecter</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
}
