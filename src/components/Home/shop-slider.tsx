"use client";
import React, { useState, useRef, useEffect, useCallback, TouchEvent, useMemo } from "react";
import Image from "next/image";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";

export default function ShopByTypeSlider({
  productData,
}: {
  productData: { image: string; name: string }[];
}) {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isVisible, setIsVisible] = useState(false);

  const totalSlides = productData.length;
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.3,
    });
    const currentRef = sliderRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible, totalSlides]);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > minSwipeDistance) handleNext();
      else if (distance < -minSwipeDistance) handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const getPositionClass = useCallback(
    (index: number) => {
      const left3 = (activeIndex - 3 + totalSlides) % totalSlides;
      const left2 = (activeIndex - 2 + totalSlides) % totalSlides;
      const left1 = (activeIndex - 1 + totalSlides) % totalSlides;
      const right1 = (activeIndex + 1) % totalSlides;
      const right2 = (activeIndex + 2) % totalSlides;
      const right3 = (activeIndex + 3) % totalSlides;

      if (index === activeIndex) return "z-40 scale-100 opacity-100 translate-x-0";
      if (index === left1) return "z-30 scale-90 opacity-90 -translate-x-[60%]";
      if (index === left2) return "z-20 scale-80 opacity-80 -translate-x-[120%]";
      if (index === left3) return "z-10 scale-70 opacity-70 -translate-x-[180%]";
      if (index === right1) return "z-30 scale-90 opacity-90 translate-x-[60%]";
      if (index === right2) return "z-20 scale-80 opacity-80 translate-x-[120%]";
      if (index === right3) return "z-10 scale-70 opacity-70 translate-x-[180%]";
      return "hidden";
    },
    [activeIndex, totalSlides],
  );

  const slideElements = useMemo(
    () =>
      productData.map((item, index) => (
        <div
          key={index}
          className={`absolute transition-all duration-500 ease-in-out cursor-pointer ${getPositionClass(
            index,
          )}`}
          onClick={() => setActiveIndex(index)}
        >
          <div className="relative 2xl:w-[350px] 2xl:h-[420px] sm:w-[290px] sm:h-[370px] w-[150px] h-[220px] overflow-hidden shadow-lg bg-white">
            <Image
              src={item.image}
              alt={item.name}
              fill
              priority={index === activeIndex}
              className="object-cover"
            />
          </div>
          <p className="text-center mt-3 font-semibold font-rubik text-lg">{item.name}</p>
        </div>
      )),
    [productData, getPositionClass, activeIndex],
  );

  return (
    <div ref={sliderRef} className="relative mt-10 container mx-auto overflow-hidden px-2">
      <div className="text-center font-bold mb-10">
        <p className="text-heading">Shop By Type</p>
      </div>

      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative flex items-center justify-center sm:h-[580px] h-[250px] overflow-visible"
      >
        {slideElements}

        <button
          onClick={handlePrev}
          className="absolute left-0 top-0  cursor-pointer text-black bg-secondary rounded-full p-1"
          aria-label="Previous"
        >
          <HiArrowSmallLeft size={28} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-0  cursor-pointer text-black bg-secondary rounded-full p-1"
          aria-label="Next"
        >
          <HiArrowSmallRight size={28} />
        </button>
      </div>
    </div>
  );
}
