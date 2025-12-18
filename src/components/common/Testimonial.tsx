"use client";
import React from "react";
import { MdStarRate } from "react-icons/md";
import { TestimonialProps } from "@/types/common";
import { SwiperSlider } from "@components";
import { SwiperSlide } from "swiper/react";
import { TestimonialBreakpoints } from "@data/Slider-breakpoints";
import Image from "next/image";

export const Testimonial = ({ reviews, showPaymentInfo = false }: TestimonialProps) => {
  return (
    <div className="px-2 container mx-auto">
      {/* ---------- CONDITIONAL PAYMENT INFO BANNER ---------- */}
      {showPaymentInfo && (
        <div className="bg-primary rounded-lg p-2 px-4 flex flex-wrap md:flex-nowrap gap-4 my-10 max-md:justify-center items-center">
          <p className="md:text-[30px] font-semibold font-rubik text-center md:text-left">
            Pay in 4 interest-free payments with
          </p>
          <div className="flex gap-3 justify-center md:justify-start">
            <Image
              src="/assets/images/cart/tabby.png"
              className="w-20 h-9 md:w-28 md:h-11 rounded-xl object-contain"
              alt="Tabby"
              width={200}
              height={200}
            />
            <Image
              src="/assets/images/cart/tamara.png"
              className="w-20 h-9 md:w-28 md:h-11 rounded-xl object-contain"
              alt="Tamara"
              width={200}
              height={200}
            />
          </div>
        </div>
      )}

      {/* ---------- TESTIMONIAL SECTION ---------- */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-3 lg:col-span-2">
          <div className="bg-primary-light p-4 text-center h-full py-6 flex flex-col justify-center">
            <p className="font-medium mb-2">Excellent</p>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <MdStarRate size={30} key={i} className="bg-primary text-white p-1 mx-0.5" />
              ))}
            </div>
            <p className="text-sm">
              Based on <span className="underline font-medium">456 reviews</span>
            </p>
            <div className="flex justify-center items-center mt-2">
              <MdStarRate size={25} className="text-primary mr-1" />
              <span className="font-medium">TrustPilot</span>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 lg:col-span-10">
          <SwiperSlider
            navigation
            isCart
            loop
            spaceBetween={10}
            breakpoints={TestimonialBreakpoints}
          >
            {reviews.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-primary-light p-4 flex flex-col justify-between min-h-[200px] h-full">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex">
                        {[...Array(item.rating)].map((_, i) => (
                          <MdStarRate key={i} className="bg-primary text-white mx-0.5" />
                        ))}
                      </div>
                      <p className="text-xs">{item.date}</p>
                    </div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm">{item.text}</p>
                  </div>
                  <div>
                    <hr className="w-14 my-2" />
                    <p className="font-medium">{item.author}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </SwiperSlider>
        </div>
      </div>
    </div>
  );
};
