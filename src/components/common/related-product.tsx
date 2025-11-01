"use client";
import SwiperSlider from "@components/ui/swiper-slider";
import { generateSlug } from "@config/Sociallinks";
import { RelatedBreakpoints } from "@data/Slider-breakpoints";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SwiperSlide } from "swiper/react";
import { RelatedProductProps } from "@/types/common";

const RelatedProduct = ({ title, description, data, titleStart }: RelatedProductProps) => {
  return (
    <div className="container mx-auto px-2 space-y-3 mt-10 md:mt-16 ">
      <h2 className={`text-heading ${titleStart ? "text-start" : "text-center"}`}>{title}</h2>
      <p className="text-center">{description}</p>
      <SwiperSlider navigation spaceBetween={10} loop breakpoints={RelatedBreakpoints}>
        {data.map((array, index) => (
          <SwiperSlide key={index}>
            <Link href={`/roller-blinds/roller/${generateSlug(array.title)}`}>
              <div className="overflow-hidden hover:shadow-md ">
                <div className="relative w-full h-auto max-h-[350px] aspect-square">
                  <Image src={array.image} alt={array.title ?? ""} fill className="h-auto" />
                </div>
                <div className="py-3 space-y-1 px-2">
                  <h3>{array.title}</h3>
                  <p className="text-medium underline">{array.description}</p>
                  {array.price && (
                    <p className="text-2xl font-rubik font-semibold">
                      <span className="font-currency text-2xl mb-1"></span>
                      {array.price}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </SwiperSlider>
    </div>
  );
};

export default RelatedProduct;
