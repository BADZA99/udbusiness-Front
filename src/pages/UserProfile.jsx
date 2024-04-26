import React from 'react'

export default function UserProfile() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-64 rounded overflow-hidden shadow-lg bg-white">
        <img
          className="w-full"
          src="https://via.placeholder.com/150"
          alt="Profile"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Username</div>
          <p className="text-gray-700 text-base">
            Bio: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Email: user@example.com
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Joined: January 2021
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Location: Paris, France
          </span>
        </div>
      </div>
    </div>
  );
}
