"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

interface Features {
  imageUrl: string;
  name: string;
}

export default function CategoryFeatures({ categoryFeatures }: { categoryFeatures: Features[] }) {
  return (
    <div className="pt-6">
      <Swiper
        modules={[Pagination]}
        spaceBetween={10}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          renderBullet: (_, className) => `<span class="${className} custom-bullet"></span>`,
        }}
        breakpoints={{
          0: { slidesPerView: 2 },
          350: { slidesPerView: 3 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
      >
        {categoryFeatures.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center gap-2">
              <Image
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
      </Swiper>

      {/* Custom pagination container */}
      <div className="custom-pagination flex justify-center gap-2 mt-4"></div>
    </div>
  );
}
