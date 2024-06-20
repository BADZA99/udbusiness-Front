import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import TestimonialItem from "./TestimonialItem";
export default function Testimonials() {
  return (
    <>
      <div className="h-[500px]  w-full flex items-center">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          <SwiperSlide>
            <TestimonialItem />
          </SwiperSlide>
          <SwiperSlide> <TestimonialItem /></SwiperSlide>
          <SwiperSlide> <TestimonialItem /></SwiperSlide>
          <SwiperSlide> <TestimonialItem /></SwiperSlide>
          <SwiperSlide> <TestimonialItem /></SwiperSlide>
          <SwiperSlide> <TestimonialItem /></SwiperSlide>
          <SwiperSlide> <TestimonialItem /></SwiperSlide>
          <SwiperSlide> <TestimonialItem /></SwiperSlide>
          <SwiperSlide> <TestimonialItem /></SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
