"use client";
import React from "react";
import { MdStarRate } from "react-icons/md";
import { TestimonialProps } from "@/types/common";
import SwiperSlider from "@components/ui/swiper-slider";
import { SwiperSlide } from "swiper/react";
import { TestimonialBreakpoints } from "@data/Slider-breakpoints";

const Testimonial = ({ reviews }: TestimonialProps) => {
  return (
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
            <span className="font-medium">Trustpilot</span>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-9 lg:col-span-10">
        <SwiperSlider navigation isCart loop spaceBetween={10} breakpoints={TestimonialBreakpoints}>
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
  );
};

export default Testimonial;
