"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";
import { fittingTypes } from "@data/home";

export const BlindFitting = React.memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 8;

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerSlide >= fittingTypes.length ? 0 : prev + itemsPerSlide,
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerSlide < 0
        ? Math.max(fittingTypes.length - itemsPerSlide, 0)
        : prev - itemsPerSlide,
    );
  };

  const currentItems = fittingTypes.slice(currentIndex, currentIndex + itemsPerSlide);
  const currentSlide = Math.floor(currentIndex / itemsPerSlide);

  return (
    <div className="px-2">
      <div className="container mx-auto px-4 bg-primary-light mt-10 md:mt-16 pb-8 pt-20 space-y-5">
        {/* Header Section */}
        <div className="flex items-center justify-center gap-4">
          <div className="w-20 h-20 relative">
            <Image
              src="/assets/images/home/fitting.png"
              alt="Checklist Icon"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-center text-2xl md:text-4xl lg:text-6xl font-bold text-black mb-2">
            {currentSlide === 0 ? "Blinds Fitting Instructions" : "Blinds Measuring Instructions"}
          </h2>
          <div className="w-20 h-20 relative">
            <Image
              src="/assets/images/home/fitting.png"
              alt="Checklist Icon"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <p className="text-center">
          Our measuring and fitting guides help towards a flawless fit, so you can enjoy the high
          life without spending a fortune.
        </p>

        <div className="flex justify-between md:justify-end items-center gap-4  md:mr-16">
          <button onClick={handlePrev} className="bg-primary p-1 rounded-full cursor-pointer">
            <HiArrowSmallLeft size={25} />
          </button>
          <button onClick={handleNext} className="bg-primary p-1 rounded-full cursor-pointer">
            <HiArrowSmallRight size={25} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {currentItems.map((item, index) => (
            <Link
              key={index}
              href={item.pdf}
              download
              className="text-center flex flex-col items-center transition-transform duration-200 hover:scale-105 cursor-pointer"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 relative">
                <Image
                  src="/assets/images/home/fitting.png"
                  alt={`${item.name} Icon`}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-medium font-rubik text-base mt-2">
                How to <span className="underline">{currentSlide === 0 ? "Fit" : "Measuring"}</span>
              </h3>
              <p className="text-xl font-semibold font-rubik">{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});
