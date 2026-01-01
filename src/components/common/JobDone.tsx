"use client";
import { SwiperSlider } from "@components";
import { RelatedBreakpoints } from "@data/Slider-breakpoints";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { RelatedProductProps } from "@/types/common";
import React from "react";

export const JobDone = React.memo(({ title, description, data }: RelatedProductProps) => {
  return (
    <div className="container mx-auto px-2 space-y-3 mt-10 md:mt-16">
      <h2 className="text-heading text-center">{title}</h2>
      <p className="text-center">{description}</p>
      <SwiperSlider navigation loop spaceBetween={10} breakpoints={RelatedBreakpoints}>
        {data.map((array, index) => (
          <SwiperSlide key={index}>
            <div>
              <div className="relative overflow-hidden group">
                <div className="relative w-full aspect-square">
                  <Image
                    src={array.posterImageUrl ?? "/assets/images/bin/product3.webp"}
                    alt={array.name ?? ""}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-white text-center px-3">
                  <p className="text-lg font-semibold">{array.name}</p>
                  <p>{array.description}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </SwiperSlider>
    </div>
  );
});
