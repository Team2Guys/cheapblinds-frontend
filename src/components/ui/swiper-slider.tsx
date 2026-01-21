"use client";

import React, { useState } from "react";
import { Swiper } from "swiper/react"; // Added SwiperSlide for context
import { Pagination, Navigation, Autoplay, A11y } from "swiper/modules";
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
  prevArrowClassName?: string;
  nextArrowClassName?: string;
}

export const SwiperSlider: React.FC<SwiperSliderProps> = ({
  children,
  spaceBetween = 10,
  slidesPerView = 1,
  breakpoints,
  autoplay = false,
  pagination = false,
  navigation = false,
  loop = false,
  className = "",
  prevArrowClassName = "top-1/2 -translate-y-1/2 left-2",
  nextArrowClassName = "top-1/2 -translate-y-1/2 right-2",
}) => {
  // Use state instead of useRef to store the DOM elements
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  return (
    <div className="relative w-full group">
      {/* Custom Navigation Arrows */}
      {navigation && (
        <>
          <button
            ref={(node) => setPrevEl(node)}
            className={`
              absolute z-30 cursor-pointer rounded-full p-2
              bg-white/80 hover:bg-white text-black
              shadow-md transition-all hover:scale-105
              disabled:opacity-50 disabled:cursor-not-allowed
              ${prevArrowClassName}
            `}
            aria-label="Previous slide"
          >
            <HiArrowSmallLeft size={25} />
          </button>
          <button
            ref={(node) => setNextEl(node)}
            className={`
              absolute z-30 cursor-pointer rounded-full p-2
              bg-white/80 hover:bg-white text-black
              shadow-md transition-all hover:scale-105
              disabled:opacity-50 disabled:cursor-not-allowed
              ${nextArrowClassName}
            `}
            aria-label="Next slide"
          >
            <HiArrowSmallRight size={25} />
          </button>
        </>
      )}

      <Swiper
        modules={[Pagination, Navigation, Autoplay, A11y]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        loop={loop}
        breakpoints={breakpoints}
        autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
        pagination={
          pagination
            ? {
                clickable: true,
                el: ".custom-pagination",
              }
            : false
        }
        navigation={{
          prevEl,
          nextEl,
        }}
        // This key forces a re-render when the navigation buttons are found
        key={navigation ? (prevEl && nextEl ? "ready" : "not-ready") : "no-nav"}
        className={className}
      >
        {children}
      </Swiper>

      {pagination && <div className="custom-pagination flex justify-center gap-2 mt-4" />}
    </div>
  );
};
