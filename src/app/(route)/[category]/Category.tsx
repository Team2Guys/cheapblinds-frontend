"use client";

import CategoryFeatures from "@components/category/CategoryFeatures";
import { Herobanner, Card, SortDropdown, Filters } from "@components";
import { categoryFeatures } from "@data/data";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Product, Subcategory } from "@/types/category";

interface CategoryPageProps {
  categoryName: string;
  categoryUrl: string;
  description: string;
  ProductList: Subcategory | Subcategory[];
}

const PRODUCTS_PER_PAGE = 9;

const CategoryPage = ({
  categoryName,
  description,
  categoryUrl,
  ProductList,
}: CategoryPageProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [displayText, setDisplayText] = useState(description || "");
  const [isTruncated, setIsTruncated] = useState(false);

  // Local state for pagination and sorting
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"default" | "low" | "high" | "new">("default");

  // --- HANDLE DESCRIPTION FOR MOBILE ---
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        const words = description?.split(" ") || [];
        const truncated = words.slice(0, 38).join(" ");
        setDisplayText(truncated);
        setIsTruncated(true);
      } else {
        setDisplayText(description || "");
        setIsTruncated(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [description]);

  const handleReadMore = () => {
    setDisplayText(description || "");
    setIsTruncated(false);
  };

  // --- FLATTEN SUBCATEGORY PRODUCTS ---
  const subcategoryArray = Array.isArray(ProductList)
    ? ProductList
    : ProductList
      ? [ProductList]
      : [];

  const allProducts = useMemo(() => {
    return subcategoryArray.flatMap((subCat) =>
      (subCat.products || []).map((product) => ({
        ...product,
        parentSubcategoryUrl: subCat.customUrl,
      })),
    );
  }, [subcategoryArray]);

  // --- SORTING ---
  const sortedProducts = useMemo(() => {
    const products = [...allProducts];

    // Sort using discountPrice if exists, otherwise price
    const getPrice = (product: Product) => product.discountPrice ?? product.price ?? 0;

    if (sort === "low") {
      products.sort((a, b) => getPrice(a) - getPrice(b));
    }

    if (sort === "high") {
      products.sort((a, b) => getPrice(b) - getPrice(a));
    }

    if (sort === "new") {
      products.sort((a, b) => {
        const dateA = new Date(a.createdAt ?? 0).getTime();
        const dateB = new Date(b.createdAt ?? 0).getTime();
        return dateB - dateA;
      });
    }

    return products;
  }, [allProducts, sort]);

  // --- PAGINATION ---
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  const visibleProducts = useMemo(() => {
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    return sortedProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [sortedProducts, page]);

  const goToPage = (p: number) => setPage(p);

  return (
    <>
      <Herobanner
        desktopImage="/assets/images/category/desktop-banner.jpg"
        mobileImage="/assets/images/category/mobile-banner.png"
      />

      <div className="container mx-auto px-2 flex gap-6 xl:gap-10 mt-10">
        {/* LEFT FILTERS */}
        <div className="hidden lg:block lg:w-[25%]">
          <Filters />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full lg:w-[75%]">
          {/* TITLE + DESCRIPTION */}
          <div className="space-y-3">
            <h1 className="font-rubik font-semibold text-4xl">{categoryName}</h1>
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

          {/* FEATURES */}
          <div className="pt-6">
            <CategoryFeatures categoryFeatures={categoryFeatures} />
          </div>

          {/* BANNER CARDS + SORT/FILTERS */}
          <div className="flex flex-wrap lg:flex-nowrap md:items-center justify-between bg-white w-full py-2 gap-4 md:gap-2 xl:gap-4 mt-6 pt-6 border-t border-[#0000003D] border-b md:border-b-0">
            {/* --- BANNER CARDS --- */}
            <div className="flex items-center flex-wrap md:flex-nowrap gap-2 xl:gap-4 w-full lg:w-auto lg:grow">
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
                    <p className="font-semibold text-sm">How to Measuring</p>
                    <p className="text-xs">How to Measure</p>
                  </div>
                </div>
                <Link
                  href="/assets/pdf/how-to-measure.pdf"
                  download
                  className="bg-[#FFB800] h-[72px] xl:h-[60px] w-32 flex justify-center items-center font-semibold text-black"
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
                    <p className="font-semibold text-sm">How to Fitting</p>
                    <p className="text-xs">How to Measure</p>
                  </div>
                </div>
                <Link
                  href="/assets/pdf/how-to-measure.pdf"
                  download
                  className="bg-[#FFB800] h-[72px] xl:h-[60px] w-32 flex justify-center items-center font-semibold text-black"
                >
                  Download Now
                </Link>
              </div>
            </div>

            {/* MOBILE FILTERS */}
            <div className="flex lg:hidden">
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
                <div className="overflow-y-auto h-screen">
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

            {/* SORT DROPDOWN */}
            <div className="hidden md:block">
              <SortDropdown
                value={sort}
                onChange={(val) => {
                  setSort(val as "default" | "low" | "high" | "new");
                  setPage(1); // reset to first page
                }}
              />
            </div>
          </div>

          {/* --- PRODUCTS GRID --- */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
            {visibleProducts.map((product) => (
              <Card
                key={product.id}
                card={product}
                categoryUrl={categoryUrl}
                subcategoryUrl={product.parentSubcategoryUrl}
              />
            ))}
          </div>

          {/* --- PAGINATION --- */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-6">
              {/* PREVIOUS */}
              <button disabled={page === 1} onClick={() => goToPage(page - 1)}>
                <MdKeyboardArrowLeft className="text-2xl" />
              </button>

              {/* PAGE NUMBERS */}
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNum = index + 1;
                const isActive = pageNum === page;

                return (
                  <button
                    key={index}
                    onClick={() => goToPage(pageNum)}
                    className={`${
                      isActive
                        ? "w-9 h-9 bg-primary text-white shadow-xl"
                        : "w-7 h-7 border border-black"
                    } flex justify-center items-center font-medium text-xl`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* NEXT */}
              <button disabled={page === totalPages} onClick={() => goToPage(page + 1)}>
                <MdKeyboardArrowRight className="text-2xl" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
