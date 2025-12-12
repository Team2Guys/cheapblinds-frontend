"use client";
import React, { useState, useRef, useEffect, useCallback, TouchEvent, useMemo } from "react";
import Image from "next/image";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";
import Link from "next/link";

export const ShopBySlider = ({
  CategoryList,
}: {
  CategoryList: { posterImageUrl: string; name: string; slug: string }[];
}) => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isVisible, setIsVisible] = useState(false);

  const totalSlides = CategoryList.length;
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  // Create extended array for seamless looping
  const extendedCategoryList = useMemo(() => {
    return [
      ...CategoryList.slice(-3), // Last 3 items
      ...CategoryList, // All original items
      ...CategoryList.slice(0, 3), // First 3 items
    ];
  }, [CategoryList]);

  const extendedTotalSlides = extendedCategoryList.length;
  const centerOffset = 3; // Offset for the extended array

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
      setActiveIndex((prev) => {
        const newIndex = prev + 1;
        // Reset to center section when reaching the end of extended array
        if (newIndex >= totalSlides + centerOffset) {
          return centerOffset;
        }
        return newIndex;
      });
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
    setActiveIndex((prev) => {
      const newIndex = prev + 1;
      // Reset to center section when reaching the end
      if (newIndex >= totalSlides + centerOffset) {
        return centerOffset;
      }
      return newIndex;
    });
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => {
      const newIndex = prev - 1;
      // Reset to end of center section when going before start
      if (newIndex < centerOffset) {
        return totalSlides + centerOffset - 1;
      }
      return newIndex;
    });
  }, [totalSlides]);

  const getPositionClass = useCallback(
    (index: number) => {
      const left3 = (activeIndex - 3 + extendedTotalSlides) % extendedTotalSlides;
      const left2 = (activeIndex - 2 + extendedTotalSlides) % extendedTotalSlides;
      const left1 = (activeIndex - 1 + extendedTotalSlides) % extendedTotalSlides;
      const right1 = (activeIndex + 1) % extendedTotalSlides;
      const right2 = (activeIndex + 2) % extendedTotalSlides;
      const right3 = (activeIndex + 3) % extendedTotalSlides;

      if (index === activeIndex) return "z-40 scale-100 opacity-100 translate-x-0";
      if (index === left1) return "z-30 scale-90 opacity-90 -translate-x-[60%]";
      if (index === left2) return "z-20 scale-80 opacity-80 -translate-x-[120%]";
      if (index === left3) return "z-10 scale-70 opacity-70 -translate-x-[180%]";
      if (index === right1) return "z-30 scale-90 opacity-90 translate-x-[60%]";
      if (index === right2) return "z-20 scale-80 opacity-80 translate-x-[120%]";
      if (index === right3) return "z-10 scale-70 opacity-70 translate-x-[180%]";
      return "hidden";
    },
    [activeIndex, extendedTotalSlides],
  );

  const slideElements = useMemo(
    () =>
      extendedCategoryList.map((item, index) => {
        // Calculate the original index for click handling
        const originalIndex = (index - centerOffset + totalSlides) % totalSlides;

        return (
          <Link
            href={`/${item.slug}`}
            key={index}
            className={`absolute transition-all duration-500 ease-in-out cursor-pointer ${getPositionClass(
              index,
            )}`}
            onClick={() => {
              // When clicking on a slide, set active index to the corresponding position in extended array
              setActiveIndex(originalIndex + centerOffset);
            }}
          >
            <div className="relative 2xl:w-[350px] 2xl:h-[420px] sm:w-[290px] sm:h-[370px] w-[150px] h-[220px] overflow-hidden shadow-lg bg-white">
              <Image
                src={item.posterImageUrl || "/assets/images/bin/product3.webp"}
                alt={item.name}
                fill
                priority={index === activeIndex}
                className="object-cover"
              />
            </div>
            <p className="text-center mt-3 font-semibold font-rubik text-sm md:text-lg">
              {item.name}
            </p>
          </Link>
        );
      }),
    [extendedCategoryList, getPositionClass, activeIndex, totalSlides],
  );

  return (
    <div ref={sliderRef} className="relative my-10 container mx-auto overflow-hidden px-2">
      <div className="text-center font-bold mb-16 md:mb-10">
        <p className="text-heading">Shop By Type</p>
      </div>

      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative flex items-center justify-center sm:h-[580px] h-[250px] overflow-visible top-0"
      >
        {slideElements}

        <button
          onClick={handlePrev}
          className="absolute left-0 -top-14 md:top-0 cursor-pointer text-black bg-secondary rounded-full p-1"
          aria-label="Previous"
        >
          <HiArrowSmallLeft size={28} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 -top-14 md:top-0 cursor-pointer text-black bg-secondary rounded-full p-1"
          aria-label="Next"
        >
          <HiArrowSmallRight size={28} />
        </button>
      </div>
    </div>
  );
};
