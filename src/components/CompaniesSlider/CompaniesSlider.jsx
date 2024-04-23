import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import CompanieItem from "./CompanieItem";

export default function CompaniesSlider() {
  return (
    <div className="h-[300px] w-full">
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className=""
      >
        <SwiperSlide className="bgSlider">
          <CompanieItem /> <CompanieItem /> <CompanieItem />
        </SwiperSlide>

        <SwiperSlide className="bgSlider">
          {" "}
          <CompanieItem /> <CompanieItem /> <CompanieItem />
        </SwiperSlide>

        <SwiperSlide className="bgSlider">
          {" "}
          <CompanieItem /> <CompanieItem /> <CompanieItem />
        </SwiperSlide>

        <SwiperSlide className="bgSlider">
          {" "}
          <CompanieItem /> <CompanieItem /> <CompanieItem />
        </SwiperSlide>

        <SwiperSlide className="bgSlider">
          {" "}
          <CompanieItem /> <CompanieItem /> <CompanieItem />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
