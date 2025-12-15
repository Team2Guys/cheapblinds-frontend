"use client";

import React, { useEffect, useState } from "react";
import CategoryFeatures from "./CategoryFeatures";
import { categoryFeatures } from "@data/data";
import { decodeHtml } from "@utils/helperFunctions";
import { SortDropdown } from "@components/ui";
import Image from "next/image";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { Filters } from "@components/filters";
type FilterOption = {
  name: string;
  count: number;
};

type ColorFilterOption = {
  name: string;
  color: string;
  count: number;
};
type CategoryHeaderProps = {
  description: string;
  categoryName: string;
  sort: "default" | "low" | "high" | "new";
  setSort: (_value: "default" | "low" | "high" | "new") => void;

  typeOptions: FilterOption[];
  patternOptions: FilterOption[];
  compositionOptions: FilterOption[];
  widthOptions: FilterOption[];
  colourOptions: ColorFilterOption[];
  selectedType: string[];
  setSelectedType: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPattern: string[];
  setSelectedPattern: React.Dispatch<React.SetStateAction<string[]>>;
  selectedComposition: string[];
  setSelectedComposition: React.Dispatch<React.SetStateAction<string[]>>;
  selectedWidth: string[];
  setSelectedWidth: React.Dispatch<React.SetStateAction<string[]>>;
  selectedColour: string[];
  setSelectedColour: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPrice: [number, number];
  setSelectedPrice: React.Dispatch<React.SetStateAction<[number, number]>>;
  showTypeFilter?: boolean;
  selectedMotorized: boolean;
  setSelectedMotorized: React.Dispatch<React.SetStateAction<boolean>>;
  motorizedCount?: number;
};

const CategoryHeader = ({
  description,
  categoryName,
  sort,
  setSort,
  typeOptions,
  patternOptions,
  compositionOptions,
  widthOptions,
  colourOptions,
  selectedType,
  setSelectedType,
  selectedPattern,
  setSelectedPattern,
  selectedComposition,
  setSelectedComposition,
  selectedWidth,
  setSelectedWidth,
  selectedColour,
  setSelectedColour,
  selectedPrice,
  setSelectedPrice,
  showTypeFilter,
  selectedMotorized,
  setSelectedMotorized,
  motorizedCount = 0,
}: CategoryHeaderProps) => {
  const [displayText, setDisplayText] = useState(description || "");
  const [isTruncated, setIsTruncated] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // mobile description truncate
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        const words = description.split(" ");
        const truncated = words.slice(0, 38).join(" ");
        setDisplayText(truncated);
        setIsTruncated(true);
      } else {
        setDisplayText(description);
        setIsTruncated(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [description]);

  return (
    <>
      <div className="space-y-3">
        <h1 className="font-rubik font-semibold text-4xl">{categoryName}</h1>

        <div className="leading-7 text-gray-800">
          <div dangerouslySetInnerHTML={{ __html: decodeHtml(displayText) }} />
          {isTruncated && (
            <button
              onClick={() => {
                setDisplayText(description);
                setIsTruncated(false);
              }}
              className="text-primary font-medium mt-1 hover:underline"
            >
              Read More...
            </button>
          )}
        </div>
      </div>

      <div className="pt-6">
        <CategoryFeatures categoryFeatures={categoryFeatures} />
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-between bg-white w-full py-4 gap-4 mt-6 border-t border-[#0000003D] border-b md:border-b-0">
        {/* Measuring + Fitting */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full">
          {/* Measuring */}
          <div className="flex border cursor-pointer w-full md:w-1/2">
            <div className="flex items-center gap-3 px-3 py-2 bg-[#FEE7AC] grow">
              <Image
                src="/assets/images/category/measuring.png"
                width={28}
                height={28}
                alt="measure"
              />
              <div>
                <p className="font-semibold text-sm">Measuring Instructions</p>
                <p className="text-xs">How to Measure</p>
              </div>
            </div>
            <Link
              href="/assets/pdf/how-to-measure.pdf"
              download
              className="bg-[#FFB800] h-[72px] w-28 flex justify-center items-center font-semibold text-center"
            >
              Download Now
            </Link>
          </div>

          {/* Fitting */}
          <div className="flex border cursor-pointer w-full md:w-1/2">
            <div className="flex items-center gap-3 px-3 py-2 bg-[#FEE7AC] grow">
              <Image
                src="/assets/images/category/fetting.png"
                width={28}
                height={28}
                alt="fitting"
              />
              <div>
                <p className="font-semibold text-sm">Fitting Instructions</p>
                <p className="text-xs">How to Measure</p>
              </div>
            </div>
            <Link
              href="/assets/pdf/how-to-measure.pdf"
              download
              className="bg-[#FFB800] h-[72px] w-28 flex justify-center items-center font-semibold text-center"
            >
              Download Now
            </Link>
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="flex lg:hidden items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowFilters(true)}
          >
            <Image src="/assets/icons/filter.png" width={24} height={24} alt="filter" />
            <p className="font-semibold">Filters</p>
          </div>

          {showFilters && (
            <div className="fixed top-0 left-0 w-full bg-white px-6 pt-10 z-50 h-screen overflow-y-auto">
              <Filters
                typeOptions={typeOptions}
                patternOptions={patternOptions}
                compositionOptions={compositionOptions}
                widthOptions={widthOptions}
                colourOptions={colourOptions}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedPattern={selectedPattern}
                setSelectedPattern={setSelectedPattern}
                selectedComposition={selectedComposition}
                setSelectedComposition={setSelectedComposition}
                selectedWidth={selectedWidth}
                setSelectedWidth={setSelectedWidth}
                selectedColour={selectedColour}
                setSelectedColour={setSelectedColour}
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
                showTypeFilter={showTypeFilter}
                selectedMotorized={selectedMotorized}
                setSelectedMotorized={setSelectedMotorized}
                motorizedCount={motorizedCount}
              />

              <button className="absolute top-4 right-4" onClick={() => setShowFilters(false)}>
                <RxCross2 size={22} />
              </button>
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="hidden md:block">
          <SortDropdown value={sort} onChange={(val) => setSort(val)} />
        </div>
      </div>
    </>
  );
};

export default CategoryHeader;
