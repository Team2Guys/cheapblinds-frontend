"use client";

import React, { useRef } from "react";
import { Swiper } from "swiper/react";
import { Pagination, Navigation, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HiArrowSmallRight, HiArrowSmallLeft } from "react-icons/hi2";
import type { SwiperOptions } from "swiper/types";

interface SwiperSliderProps {
  children: React.ReactNode;
  spaceBetween?: number;
  slidesPerView?: number;
  breakpoints?: SwiperOptions["breakpoints"];
  autoplay?: boolean;
  pagination?: boolean;
  navigation?: boolean;
  loop?: boolean;
  className?: string;
}

interface ArrowProps {
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="absolute -top-5 md:top-0 right-2 z-20 cursor-pointer text-black bg-secondary rounded-full p-1 hover:scale-105 transition-transform shadow"
    onClick={onClick}
  >
    <HiArrowSmallRight size={25} />
  </div>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="absolute -top-5 md:top-0 left-2 z-20 cursor-pointer text-black bg-secondary rounded-full p-1 hover:scale-105 transition-transform shadow"
    onClick={onClick}
  >
    <HiArrowSmallLeft size={25} />
  </div>
);

const SwiperSlider: React.FC<SwiperSliderProps> = ({
  children,
  spaceBetween = 10,
  slidesPerView = 1,
  breakpoints,
  autoplay = false,
  pagination = false,
  navigation = false,
  loop = false,
  className = "",
}) => {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={`relative w-full ${navigation ? "pt-16" : ""}`}>
      {navigation && (
        <>
          <PrevArrow onClick={() => prevRef.current?.click()} />
          <NextArrow onClick={() => nextRef.current?.click()} />
        </>
      )}

      <Swiper
        className={className}
        modules={[Pagination, Navigation, Autoplay, A11y]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        loop={loop}
        autoplay={
          autoplay
            ? {
                delay: 3000,
                disableOnInteraction: false,
              }
            : false
        }
        pagination={
          pagination
            ? {
                clickable: true,
                el: ".custom-pagination",
                renderBullet: (_, className) => `<span class="${className} custom-bullet"></span>`,
              }
            : false
        }
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation === "object") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        breakpoints={breakpoints}
      >
        {children}
      </Swiper>

      {pagination && <div className="custom-pagination flex justify-center gap-2 mt-4"></div>}

      <div ref={prevRef} className="hidden" />
      <div ref={nextRef} className="hidden" />
    </div>
  );
};

export default SwiperSlider;
