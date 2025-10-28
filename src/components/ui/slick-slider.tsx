"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";
import { SlickSliderProps } from "types/common";

interface ArrowProps {
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="absolute top-5 right-2 -translate-y-1/2 z-10 cursor-pointer text-black bg-secondary rounded-full p-1"
    onClick={onClick}
  >
    <HiArrowSmallRight size={25} />
  </div>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="absolute top-5 left-2 -translate-y-1/2 z-10 cursor-pointer text-black bg-secondary rounded-full p-1"
    onClick={onClick}
  >
    <HiArrowSmallLeft size={25} />
  </div>
);

const SlickSlider = ({ children, slidesToShow = 4, responsive = [] }: SlickSliderProps) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    swipeToSlide: true,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    draggable: true,
    responsive: responsive.length
      ? responsive
      : [
          {
            breakpoint: 1024,
            settings: { slidesToShow: 3 },
          },
          {
            breakpoint: 768,
            settings: { slidesToShow: 2 },
          },
          {
            breakpoint: 480,
            settings: { slidesToShow: 1 },
          },
        ],
  };

  return (
    <div className="relative ">
      <Slider {...settings} className="pt-16">
        {children}
      </Slider>
    </div>
  );
};

export default SlickSlider;
