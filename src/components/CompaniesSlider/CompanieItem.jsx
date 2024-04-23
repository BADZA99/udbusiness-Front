import React from 'react'

export default function CompanieItem() {
  return (
    <div className="h-[50%] w-[50%] flex flex-col items-center justify-center">
      <div className="w-12 h-12">
        <img
          // src="../../images/Companies/company-1.png"
          src="https://randomuser.me/api/portraits/men/95.jpg"
          alt=""
          className="rounded-full"
        />
      </div>
      <p className="text-xl font-bold font-montserrat">Company Name</p>
    </div>
  );
}
