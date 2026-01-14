"use client";
import { SwiperSlider } from "@components";
import { RelatedBreakpoints } from "@data/Slider-breakpoints";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SwiperSlide } from "swiper/react";
import { RelatedProductProps } from "@/types/common";

export const RelatedProduct = React.memo(
  ({ title, description, data, titleStart }: RelatedProductProps) => {
    return (
      <div className="container mx-auto px-2 space-y-3 mt-10 md:mt-16 ">
        <h2 className={`text-heading pb-5 ${titleStart ? "text-start" : "text-center"}`}>
          {title}
        </h2>
        <p className="text-center">{description}</p>
        <SwiperSlider navigation spaceBetween={10} loop breakpoints={RelatedBreakpoints}>
          {data.slice(0, 12).map((array) => (
            <SwiperSlide key={array.id} className="mb-5">
              <Link href={array.newPath ?? "/"}>
                <div className="overflow-hidden hover:shadow-md ">
                  <div className="relative w-full h-auto max-h-[350px] aspect-square">
                    <Image
                      unoptimized
                      src={array.posterImageUrl ?? ""}
                      alt={array.name ?? ""}
                      fill
                      className="h-auto"
                    />
                  </div>
                  <div className="py-3 space-y-1 px-2">
                    <h3>{array.category?.name}</h3>
                    <p className="text-medium underline">{array.name}</p>

                    {array.price && (
                      <p className="text-2xl font-rubik font-semibold flex items-center gap-2">
                        <span className="text-2xl font-currency mb-1"></span>
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
  },
);
