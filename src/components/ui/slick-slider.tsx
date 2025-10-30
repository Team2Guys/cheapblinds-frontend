"use client";
import React, { useEffect, useState } from "react";
const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";
import { SlickSliderProps } from "types/common";
import dynamic from "next/dynamic";

interface ArrowProps {
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="absolute top-0 md:top-2 right-2 z-10 cursor-pointer text-black bg-secondary rounded-full p-1"
    onClick={onClick}
  >
    <HiArrowSmallRight size={25} />
  </div>
);

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div
    className="absolute top-0 md:top-2 left-2 z-10 cursor-pointer text-black bg-secondary rounded-full p-1"
    onClick={onClick}
  >
    <HiArrowSmallLeft size={25} />
  </div>
);

const SlickSlider = ({ children, slidesToShow = 4 }: SlickSliderProps) => {
  const [slides, setSlides] = useState(slidesToShow);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 480) setSlides(1);
      else if (width <= 768) setSlides(2);
      else if (width <= 1024) setSlides(3);
      else setSlides(slidesToShow);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [slidesToShow]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slides,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    draggable: true,
  };

  return (
    <div className="relative w-full">
      <Slider {...settings} className="pt-14">
        {children}
      </Slider>
    </div>
  );
};

export default SlickSlider;
