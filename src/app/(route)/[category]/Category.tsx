"use client";
import CategoryFeatures from "@components/category/CategoryFeatures";
import Herobanner from "@components/common/hero-banner";
import Filters from "@components/filters/Filters";
import Card from "@components/ui/Card";
import SortDropdown from "@components/ui/SortDropdown";
import { categoryFeatures, products } from "@data/data";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Category = () => {
  const [showFilters, setShowFilters] = useState(false);
  const fullText = `Elevate your home with the timeless elegance of our Roman blinds, seamlessly blending classic style, practical light control, and effortless functionality. Made from premium fabrics, these blinds showcase soft, graceful folds that exude sophistication whether raised or lowered. With an array of colors, textures, and patterns to choose from, they perfectly complement both traditional and contemporary interiors. Designed for durability and long-lasting beauty, their foldable structure adds a touch of refinement to any window. Plus, Roman blinds are energy-efficient, offering insulation to help regulate room temperature. Redefine your space with Roman blinds that bring charm, practicality, and lasting style to your home.`;

  const [displayText, setDisplayText] = useState(fullText);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        const words = fullText.split(" ");
        const truncated = words.slice(0, 38).join(" ");
        setDisplayText(truncated);
        setIsTruncated(true);
      } else {
        setDisplayText(fullText);
        setIsTruncated(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [fullText]);

  const handleReadMore = () => {
    setDisplayText(fullText);
    setIsTruncated(false);
  };
  return (
    <>
      <Herobanner
        desktopImage="/assets/images/category/desktop-banner.jpg"
        mobileImage="/assets/images/category/mobile-banner.png"
      />
      <div className="container mx-auto px-2 flex gap-6 xl:gap-10 mt-10">
        <div className="hidden lg:block lg:w-[25%]">
          <Filters />
        </div>
        <div className="w-full lg:w-[75%]">
          <div className="space-y-3">
            <h1 className="font-rubik font-semibold text-4xl">Roller Blinds</h1>
            <div>
              <p className="leading-7 text-gray-800">
                {displayText}{" "}
                {isTruncated && (
                  <button
                    onClick={handleReadMore}
                    className="text-primary font-medium mt-1 hover:underline"
                  >
                    Read More...
                  </button>
                )}
              </p>
            </div>
          </div>
          <div className="pt-6">
            <CategoryFeatures categoryFeatures={categoryFeatures} />
          </div>
          <div className="flex flex-wrap lg:flex-nowrap md:items-center justify-between bg-white w-full py-2 gap-4 md:gap-2 xl:gap-4 mt-6 pt-6 border-t border-[#0000003D] border-b md:border-b-0">
            {/* Left Section */}
            <div className="flex items-center flex-wrap md:flex-nowrap gap-2 xl:gap-4 w-full lg:w-auto lg:grow">
              {/* Measuring Card */}
              <div className="flex border cursor-pointer w-full md:w-1/2">
                <div className="flex items-center gap-3 px-3 py-2 bg-[#FEE7AC] grow">
                  <Image
                    src="/assets/images/category/measuring.png"
                    width={28}
                    height={28}
                    alt="measure"
                  />
                  <div className="leading-tight">
                    <p className="font-semibold text-sm">How to Measuring</p>
                    <p className="text-xs">How to Measure</p>
                  </div>
                </div>
                <Link
                  href="/assets/pdf/how-to-measure.pdf"
                  download
                  className="bg-[#FFB800] h-[72px] xl:h-[60px] w-32 flex justify-center text-center items-center font-semibold px-2 text-black"
                >
                  Download Now
                </Link>
              </div>

              {/* Fitting Card */}
              <div className="flex border cursor-pointer w-full md:w-1/2">
                <div className="flex items-center gap-3 px-3 py-2 bg-[#FEE7AC] grow">
                  <Image
                    src="/assets/images/category/fetting.png"
                    width={28}
                    height={28}
                    alt="Fitting"
                  />
                  <div className="leading-tight">
                    <p className="font-semibold text-sm">How to Fitting</p>
                    <p className="text-xs">How to Measure</p>
                  </div>
                </div>
                <Link
                  href="/assets/pdf/how-to-measure.pdf"
                  download
                  className="bg-[#FFB800] h-[72px] xl:h-[60px] w-32 flex justify-center text-center items-center font-semibold px-2 text-black"
                >
                  Download Now
                </Link>
              </div>
            </div>

            <div className="flex lg:hidden">
              {/* Button Row */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Image src="/assets/icons/filter.png" alt="filter icon" width={24} height={24} />
                <p className="font-semibold">Filters</p>
              </div>
              <div
                className={`fixed top-0 left-0 ${showFilters ? "left-0 w-full" : "left-[150%] w-0"} bg-white px-4 xs:px-6 pt-10 z-50`}
              >
                <div className="overflow-y-auto overflow-x-visible h-screen">
                  <Filters />
                </div>
                <button
                  className="text-black absolute top-3 right-3"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <RxCross2 size={20} />
                </button>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="hidden md:block">
              <SortDropdown />
            </div>
          </div>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 pt-6">
            {Array(3)
              .fill(products)
              .flat()
              .map((item, index) => (
                <Card card={item} key={index} />
              ))}
          </div>
          <div className="flex justify-center items-center gap-2 pt-6">
            <MdKeyboardArrowLeft className="text-2xl" />
            <button className="w-7 h-7 flex justify-center items-center border border-black font-medium text-xl">
              1
            </button>
            <button className="w-9 h-9 flex justify-center items-center font-medium text-xl bg-primary text-white shadow-xl">
              2
            </button>
            <button className="w-7 h-7 flex justify-center items-center border border-black font-medium text-xl">
              3
            </button>
            <MdKeyboardArrowRight className="text-2xl" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
