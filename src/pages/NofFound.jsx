import React from 'react'
import { Link } from 'react-router-dom';

const NofFound = () => {
return (
  <div className="flex flex-col items-center justify-center min-h-screen text-center">
    <h1 className="text-6xl font-bold text-red-500">404</h1>
    <p className="mt-2 text-lg text-gray-600">Page introuvable</p>
    <Link to="/" className="mt-6 text-blue-500 hover:underline">
      Retour à l'accueil
    </Link>
  </div>
);
}

export default NofFound
