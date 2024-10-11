import React from 'react'
import { useState } from 'react';

export default function Pricing() {
   const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    <div className="sm:flex sm:flex-col sm:align-center p-10">
      <div className="relative self-center bg-slate-200 rounded-lg p-0.5 flex">
        <button
          type="button"
          onClick={() => setBillingCycle("monthly")}
          className={`relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 ${
            billingCycle === "monthly"
              ? "bg-slate-50 border-slate-50 text-slate-900 shadow-sm"
              : "border-transparent text-slate-900"
          }`}
        >
          Monthly billing
        </button>
        <button
          type="button"
          onClick={() => setBillingCycle("yearly")}
          className={`ml-0.5 relative w-1/2 border rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 ${
            billingCycle === "yearly"
              ? "bg-slate-50 border-slate-50 text-slate-900 shadow-sm"
              : "border-transparent text-slate-900"
          }`}
        >
          Yearly billing
        </button>
      </div>

      <div className="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
        {/* Plan 1: Starter */}
        <div className="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200">
          <div className="p-6">
            <h2 className="text-xl leading-6 font-bold text-slate-900">
              Starter
            </h2>
            <p className="mt-2 text-base text-slate-700 leading-tight">
              Pour ceux qui débutent et veulent tester leur première annonce.
            </p>
            <p className="mt-8">
              <span className="text-4xl font-bold text-slate-900 tracking-tighter">
                $0
              </span>
              <span className="text-base font-medium text-slate-500">/mo</span>
            </p>
            <a
              href="/sign-up"
              className="mt-8 block w-full bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center"
            >
              Publier avec Starter
            </a>
          </div>
          <div className="pt-6 pb-8 px-6">
            <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
              Ce qui est inclus
            </h3>
            <ul role="list" className="mt-4 space-y-3">
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
                <span className="text-base text-slate-700">
                  1 service ou offre d'emploi par mois
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
                <span className="text-base text-slate-700">
                  Statistiques de base
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
                <span className="text-base text-slate-700">
                  Description simple et lien de contact
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Plan 2: Superior */}
        <div className="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200">
          <div className="p-6">
            <h2 className="text-xl leading-6 font-bold text-slate-900">
              Superior
            </h2>
            <p className="mt-2 text-base text-slate-700 leading-tight">
              Pour les créateurs avec plusieurs idées à tester efficacement.
            </p>
            <p className="mt-8">
              <span className="text-4xl font-bold text-slate-900 tracking-tighter">
                $8
              </span>
              <span className="text-base font-medium text-slate-500">/mo</span>
            </p>
            <a
              href="/sign-up"
              className="mt-8 block w-full bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center"
            >
              Publier avec Superior
            </a>
          </div>
          <div className="pt-6 pb-8 px-6">
            <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
              Ce qui est inclus
            </h3>
            <ul role="list" className="mt-4 space-y-3">
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
                <span className="text-base text-slate-700">
                  Jusqu'à 5 services ou offres d'emploi par mois
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
                <span className="text-base text-slate-700">
                  Statistiques détaillées
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
                <span className="text-base text-slate-700">
                  Ajout d'images et vidéos
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
                <span className="text-base text-slate-700">
                  Réédition et republication gratuite
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Plan 3: Shipper */}
        <div className="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200">
          <div className="p-6">
            <h2 className="text-xl leading-6 font-bold text-slate-900">
              Shipper
            </h2>
            <p className="mt-2 text-base text-slate-700 leading-tight">
              Pour les pros cherchant une visibilité maximale.
            </p>
            <p className="mt-8">
              <span className="text-4xl font-bold text-slate-900 tracking-tighter">
                $20
              </span>
              <span className="text-base font-medium text-slate-500">/mo</span>
            </p>
            <a
              href="/sign-up"
              className="mt-8 block w-full bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center"
            >
              Publier avec Shipper
            </a>
          </div>
          <div className="pt-6 pb-8 px-6">
            <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
              Ce qui est inclus
            </h3>
            <ul role="list" className="mt-4 space-y-3">
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
                <span className="text-base text-slate-700">
                  Jusqu'à 20 services ou offres par mois
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
                <span className="text-base text-slate-700">
                  Statistiques premium complètes
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
                <span className="text-base text-slate-700">
                  Annonces en tête de page
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
                <span className="text-base text-slate-700">
                  Newsletter automatique
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
