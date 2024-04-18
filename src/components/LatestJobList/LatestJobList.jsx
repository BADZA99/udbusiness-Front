import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const jobs = [
  // Remplacez ceci par les données réelles de vos jobs
  {
    jobName: "Job 1",
    requester: "Requester 1",
    location: "Location 1",
    deadline: "2022-12-31",
    tarif: "1000",
  },
  {
    jobName: "Job 2",
    requester: "Requester 2",
    location: "Location 2",
    deadline: "2022-12-31",
    tarif: "1000",
  },
  {
    jobName: "Job 2",
    requester: "Requester 2",
    location: "Location 2",
    deadline: "2022-12-31",
    tarif: "1000",
  },
  {
    jobName: "Job 2",
    requester: "Requester 2",
    location: "Location 2",
    deadline: "2022-12-31",
    tarif: "1000",
  },
  // ...
];

export default function LatestJobList() {
  return (
    <div className=" mx-auto w-[70%] space-y-4">
      {jobs.map((job, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b-2 p-5 bg-slate-200 rounded-sm hover:shadow-lg transition-shadow "
        >
          <div>
            <div className="font-bold text-xl font-montserrat text-blue-500">
              {job.jobName}
            </div>
            <div className="font-bold flex">
              By {job.requester} <IoLocationSharp size={15} color="gray" />{" "}
              {job.location}
            </div>
          </div>
          <div className="font-openSans">
            <div className="mb-2 font-semibold">{job.tarif}/mois</div>
            <div className="font-openSans">{job.deadline}</div>
          </div>
        </div>
      ))}
      {/* link voir plus */}
      <div className="flex justify-center items-center h-10 p-5 bg-blue-500 w-[12%] rounded-md shadow-sm mx-auto text-center font-openSans">
        <Link to="/" className="text-white font-openSans">
          Voir plus
        </Link>
      </div>
    </div>
  );
}
