"use client";
import React, { useState, useRef, useEffect, useCallback, TouchEvent, useMemo } from "react";
import Image from "next/image";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";
import Link from "next/link";

interface CategoryItem {
  posterImageUrl: string | null;
  name: string;
  slug: string;
}

export const ShopBySlider = ({ CategoryList }: { CategoryList: CategoryItem[] }) => {
  const safeCategoryList = useMemo(() => {
    if (CategoryList.length === 0) return [];
    if (CategoryList.length < 4)
      return [...CategoryList, ...CategoryList, ...CategoryList, ...CategoryList];
    if (CategoryList.length < 6) return [...CategoryList, ...CategoryList];
    return CategoryList;
  }, [CategoryList]);

  const [activeIndex, setActiveIndex] = useState(3);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const totalSlides = safeCategoryList.length;
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  // We need a buffer of 3 items on each side for the loop to look infinite
  const BUFFER_SIZE = 3;

  const extendedCategoryList = useMemo(() => {
    return [
      ...safeCategoryList.slice(-BUFFER_SIZE),
      ...safeCategoryList,
      ...safeCategoryList.slice(0, BUFFER_SIZE),
    ];
  }, [safeCategoryList]);

  const centerOffset = BUFFER_SIZE;

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
    if (!isVisible || isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible, isHovered, totalSlides]);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.changedTouches[0].clientX;
    setIsHovered(true);
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
    setIsHovered(false);
  };

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => {
      const newIndex = prev + 1;
      if (newIndex >= totalSlides + centerOffset) {
        return centerOffset;
      }
      return newIndex;
    });
  }, [totalSlides, centerOffset]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => {
      const newIndex = prev - 1;
      if (newIndex < centerOffset) {
        return totalSlides + centerOffset - 1;
      }
      return newIndex;
    });
  }, [totalSlides, centerOffset]);
  const getPositionClass = useCallback(
    (index: number) => {
      const diff = index - activeIndex;

      if (diff === 0) {
        return "z-40 scale-100 translate-x-0 opacity-100 blur-0 grayscale-0";
      }

      if (Math.abs(diff) === 1) {
        const isRight = diff > 0;
        const tx = isRight
          ? "translate-x-[65%] md:translate-x-[60%]"
          : "-translate-x-[65%] md:-translate-x-[60%]";

        return `z-30 scale-[0.85] ${tx} opacity-100 blur-[0.5px] grayscale-[10%]`;
      }

      if (Math.abs(diff) === 2) {
        const isRight = diff > 0;
        const tx = isRight
          ? "translate-x-[120%] md:translate-x-[120%]"
          : "-translate-x-[120%] md:-translate-x-[120%]";

        return `z-20 scale-[0.70] ${tx} opacity-90 blur-[1px] grayscale-[30%]`;
      }

      if (Math.abs(diff) === 3) {
        const isRight = diff > 0;
        const tx = isRight
          ? "translate-x-[170%] md:translate-x-[180%]"
          : "-translate-x-[170%] md:-translate-x-[180%]";

        return `z-10 scale-[0.55] ${tx} opacity-0 md:opacity-80 blur-[2px] grayscale-[50%]`;
      }

      return "opacity-0 z-0 scale-0 pointer-events-none";
    },
    [activeIndex],
  );

  const slideElements = useMemo(
    () =>
      extendedCategoryList.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={`${item.slug}-${index}`}
            className={`
                absolute top-0 
                transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] 
                flex flex-col items-center
                ${getPositionClass(index)}
            `}
          >
            <Link
              href={`/${item.slug}`}
              className="relative block w-full group cursor-pointer"
              onClick={() => setActiveIndex(index)}
            >
              <div
                className={`
                   relative mx-auto overflow-hidden bg-white 
                   ${isActive ? "shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-white" : "shadow-lg border-gray-100"}
                   border-4
                   transition-all duration-500
                   2xl:h-[450px] 2xl:w-[380px] 
                   xl:h-[400px] xl:w-[320px] 
                   lg:h-[350px] lg:w-[280px] 
                   md:h-[300px] md:w-60 
                   h-[280px] w-[220px]
                `}
              >
                <Image
                  src={item.posterImageUrl || "/assets/images/placeholder.png"}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={isActive}
                  className="object-cover"
                />

                {!isActive && <div className="absolute inset-0 bg-white/10" />}
              </div>
              <div className="mt-4 text-center">
                <p
                  className={`
                        font-bold leading-tight
                        transition-colors duration-300
                        ${isActive ? "text-2xl" : "text-xl"}
                    `}
                >
                  {item.name}
                </p>
              </div>
            </Link>
          </div>
        );
      }),
    [extendedCategoryList, getPositionClass, activeIndex, totalSlides, centerOffset],
  );

  return (
    <div
      ref={sliderRef}
      className="relative w-full overflow-hidden py-16 bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-4 mb-10 ">
        {/* Left Arrow */}
        <div className="flex-1 text-center">
          <h2 className="text-heading">Shop By Type</h2>
        </div>
        <div className="flex items-center justify-between relative">
          <button
            onClick={handlePrev}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-all z-10"
            aria-label="Previous"
          >
            <HiArrowSmallLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-all z-10"
            aria-label="Next"
          >
            <HiArrowSmallRight size={24} />
          </button>
        </div>
      </div>

      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative flex items-center justify-center h-[380px] md:h-[550px] container mx-auto px-2 overflow-visible perspective-1000"
      >
        {slideElements}
      </div>
    </div>
  );
};
