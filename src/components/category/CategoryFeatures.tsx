"use client";

import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import { SwiperSlider } from "@components";
import { CategoryBreakpoints } from "@data/Slider-breakpoints";

interface Features {
  imageUrl: string;
  name: string;
}

export default function CategoryFeatures({ categoryFeatures }: { categoryFeatures: Features[] }) {
  return (
    <div className="pt-6">
      <SwiperSlider pagination loop spaceBetween={10} breakpoints={CategoryBreakpoints}>
        {categoryFeatures.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center gap-2">
              <Image
                unoptimized
                src={item.imageUrl}
                alt={item.name}
                width={80}
                height={80}
                className="object-contain"
              />
              <button className="bg-primary font-semibold px-4 py-2 rounded-md w-fit text-sm">
                {item.name}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </SwiperSlider>
    </div>
  );
}
