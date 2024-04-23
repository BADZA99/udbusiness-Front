import React from 'react'
import BlogItem from './BlogItem';

export default function Blog() {
  return (
    <div className='mx-auto'>
      <h3 className='text-center m-5 font-openSans font-bold text-3xl'>Blog</h3>
      <p className='text-center m-2 font-montserrat'>Get more tips & tricks from out blog post.</p>
      <div className="w-full h-[500px] flex items-center justify-center space-x-5 ">
       <BlogItem/>
       <BlogItem/>
       <BlogItem/>
      </div>
    </div>
  );
}
