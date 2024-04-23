import React from 'react'

const TestimonialItem = () => {
  return (
    <div className="h-[80%] w-[60%] flex flex-col items-center justify-center  text-white ">
      {/* testimonial */}
      <p className="mx-auto font-openSans text-xl mt-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati in,
        iste quisquam commodi minus at adipisci aperiam, similique ipsam
        veritatis ab. Eum labore necessitatibus quis, assumenda repellat nihil
        doloribus rem!
      </p>
      {/* user */}
      <div className="flex flex-col items-center justify-center   mt-4">
        {/* user image */}
        <div className="w-12 h-12">
          <img
            src="https://randomuser.me/api/portraits/men/95.jpg"
            alt=""
            className="rounded-full"
          />
        </div>
        <div className=" text-lg font-bold font-montserrat m-2">John Doe</div>
      </div>
    </div>
  );
}

export default TestimonialItem
