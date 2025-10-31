import React from "react";
import { MdStarRate } from "react-icons/md";
import { TestimonialProps } from "types/common";
import SwiperSlider from "@components/ui/swiper-slider";
import { SwiperSlide } from "swiper/react";
import { TestimonialBreakpoints } from "data/Slider-breakpoints";

const Testimonial = ({ reviews }: TestimonialProps) => {
  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-12 md:col-span-3 lg:col-span-2">
        <div className="bg-white p-4 text-center h-auto py-6 ">
          <p className="font-medium mb-2">Excellent</p>
          <div className="flex justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <MdStarRate size={30} key={i} className="bg-primary text-white p-1 mx-0.5" />
            ))}
          </div>
          <p className="text-sm">
            Based on <span className="underline font-medium">456 reviews</span>
          </p>
          <div className="flex justify-center items-center">
            <MdStarRate size={25} className="text-primary mr-1" />
            <span className="font-medium">Trustpilot</span>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-10">
        <SwiperSlider pagination spaceBetween={10} breakpoints={TestimonialBreakpoints}>
          {reviews.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white border p-4 space-y-1 h-full flex flex-col justify-between">
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
                <hr className="w-14" />
                <p className="font-medium">{item.author}</p>
              </div>
            </SwiperSlide>
          ))}
        </SwiperSlider>
      </div>
    </div>
  );
};

export default Testimonial;
