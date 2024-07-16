import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate,currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // console.log(pageNumbers, itemsPerPage, paginate);

  return (
    <div className="flex justify-center">
      <nav className="bg-gray-200 rounded-full px-4 py-2">
        <ul className="flex text-gray-600 gap-4 font-medium py-2">
          {pageNumbers?.map((number) => (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={`rounded-full px-4 py-2 transition duration-300 ease-in-out cursor-pointer ${
                currentPage === number
                  ? 'bg-white text-blue-500 font-bold' // Classe pour la page courante
                  : 'hover:bg-white hover:text-gray-600' // Classe pour les autres pages
              }`}
            >
              {number}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;