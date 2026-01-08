"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import { SideBySideMagnifier } from "@components";
import "../../styles/swiper.css";

export const Thumbnail = ({ images = [] }: { images?: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, []);

  if (!images.length) return null;

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={10}
        slidesPerView={1}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="main-swiper"
      >
        {images &&images.map((img, index) => (
          <SwiperSlide key={index}>
            <SideBySideMagnifier
              imageSrc={img}
              largeImageSrc={img}
              zoomScale={1.5}
              inPlace
              alignTop
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[FreeMode, Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={3}
        freeMode
        watchSlidesProgress
        className="thumbs-swiper mt-3"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="cursor-pointer">
            <div
              className={`relative aspect-square border-2 overflow-hidden transition-all duration-200 ${
                index === activeIndex ? "border-black" : "border-transparent"
              }`}
            >
              <Image
                unoptimized
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                priority
                className="object-cover"
                sizes="200px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
