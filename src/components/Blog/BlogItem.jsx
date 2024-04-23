import React from 'react'
import imgBlog from '../../images/blog/blog-1.jpg';

export default function BlogItem() {
  return (
    <div className="h-[70%] w-96  flex flex-col items-center justify-center drop-shadow-md bg-slate-100">
        <img src={imgBlog} alt="" className="object-cover w-full h-[85%]" />
      <div className="w-full h-[15%] flex flex-col items-start justify-start">
        <h3 className="text-black font-bold">Blog Title</h3>
        <p className="text-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quas.
        </p>
      </div>
    </div>
  );
}
