"use client";

import React, { useRef, useEffect } from "react";
import { Swiper, SwiperClass } from "swiper/react";
import { Pagination, Navigation, Autoplay, A11y } from "swiper/modules";
import { HiArrowSmallRight, HiArrowSmallLeft } from "react-icons/hi2";
import type { SwiperOptions } from "swiper/types";
import "../../styles/swiper.css";

interface SwiperSliderProps {
  children: React.ReactNode;
  spaceBetween?: number;
  slidesPerView?: number;
  breakpoints?: SwiperOptions["breakpoints"];
  autoplay?: boolean;
  pagination?: boolean;
  navigation?: boolean;
  loop?: boolean;
  isCart?: boolean; // ✅ new prop
  className?: string;
}

interface ArrowProps {
  onClick?: () => void;
  isCart?: boolean;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick, isCart }) => (
  <div
    className={`absolute z-20 cursor-pointer text-black rounded-full p-1 hover:scale-105 transition-transform shadow
      ${isCart ? "top-1/2 -translate-y-1/2 right-0 bg-primary-light hover:bg-primary" : "-top-5 md:top-0 right-0 bg-secondary"}
    `}
    onClick={onClick}
  >
    <HiArrowSmallRight size={25} />
  </div>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick, isCart }) => (
  <div
    className={`absolute z-20 cursor-pointer text-black rounded-full p-1 hover:scale-105 transition-transform shadow
      ${isCart ? "top-1/2 -translate-y-1/2 left-0 bg-primary-light hover:bg-primary" : "-top-5 md:top-0 left-0 bg-secondary"}
    `}
    onClick={onClick}
  >
    <HiArrowSmallLeft size={25} />
  </div>
);

export const SwiperSlider: React.FC<SwiperSliderProps> = ({
  children,
  spaceBetween = 10,
  slidesPerView = 1,
  breakpoints,
  autoplay = false,
  pagination = false,
  navigation = false,
  loop = false,
  isCart = false,
  className = "",
}) => {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    if (navigation && swiperRef.current && prevRef.current && nextRef.current) {
      type NavParams = {
        prevEl?: HTMLElement | string | null;
        nextEl?: HTMLElement | string | null;
      };
      const paramsNav = (
        swiperRef.current.params as unknown as {
          navigation?: NavParams;
        }
      ).navigation;
      if (paramsNav) {
        paramsNav.prevEl = prevRef.current;
        paramsNav.nextEl = nextRef.current;
      } else {
        (swiperRef.current.params as unknown as { navigation?: NavParams }).navigation = {
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        };
      }

      if (swiperRef.current.navigation) {
        swiperRef.current.navigation.init();
        swiperRef.current.navigation.update();
      }
    }
  }, [navigation]);

  return (
    <div className={`relative w-full ${navigation ? (isCart ? "px-14" : "pt-14") : ""}`}>
      {navigation && (
        <>
          <PrevArrow onClick={() => prevRef.current?.click()} isCart={isCart} />
          <NextArrow onClick={() => nextRef.current?.click()} isCart={isCart} />
        </>
      )}

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
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
        breakpoints={breakpoints}
        className={className}
      >
        {children}
      </Swiper>

      {pagination && <div className="custom-pagination flex justify-center gap-2 mt-4"></div>}

      {/* Hidden elements for Swiper navigation control */}
      <div ref={prevRef} className="hidden" />
      <div ref={nextRef} className="hidden" />
    </div>
  );
};
