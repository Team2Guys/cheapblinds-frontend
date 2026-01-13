"use client";

import { Product } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { TfiTrash } from "react-icons/tfi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { ColorImage } from "@data/filter-colors";
import { useIndexedDb } from "@lib/useIndexedDb";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CardProps {
  products: Product[];
  categoryName?: string;
  IsDeleteButton?: boolean;
  productsPerPage?: number;
  selectedMotorized?: boolean;
  onDelete?: (_id: string) => void;
  onFreeSample?: (_product: Product) => void;
}

export const Card = React.memo(
  ({
    products,
    categoryName,
    IsDeleteButton,
    productsPerPage = 30,
    selectedMotorized = false,
    onDelete,
    onFreeSample,
  }: CardProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { addToWishlist } = useIndexedDb();

    const currentPage = Number(searchParams.get("page")) || 1;
    const totalPages = Math.ceil(products.length / productsPerPage);
    useEffect(() => {
      if (currentPage > totalPages && totalPages > 0) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1");
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }, [currentPage, totalPages, pathname, router, searchParams]);

    const handlePageChange = (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      window.scrollTo({ top: 800, behavior: "smooth" });
    };

    const visibleProducts = useMemo(() => {
      const start = (currentPage - 1) * productsPerPage;
      return products.slice(start, start + productsPerPage);
    }, [products, currentPage, productsPerPage]);

    const getColorImage = (color: string) => {
      const found = ColorImage.find((c) => c.color.toLowerCase() === color.toLowerCase());
      return found ? found.image : "/assets/images/colors/white.png";
    };
    const getPaginationRange = () => {
      let delta = 2;

      if (typeof window !== "undefined") {
        delta = window.innerWidth < 640 ? 1 : 2;
      }

      const range: (number | string)[] = [];
      const left = Math.max(2, currentPage - delta);
      const right = Math.min(totalPages - 1, currentPage + delta);

      range.push(1);

      if (left > 2) range.push("...");

      for (let i = left; i <= right; i++) {
        range.push(i);
      }

      if (right < totalPages - 1) range.push("...");

      if (totalPages > 1) range.push(totalPages);

      return range;
    };

    return (
      <>
        {products.length === 0 && (
          <div className="col-span-full py-10 text-center text-gray-500">
            No products match your filters.
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2 pt-6">
          {visibleProducts.map((card) => {
            const original = card.price ?? 0;
            const motor = card.motorPrice ?? 0;
            const originalPrice = selectedMotorized ? original + motor : original;

            return (
              <div key={card.id} className="relative p-2 hover:shadow-md">
                <Link href={card.newPath || ""}>
                  <div className="relative w-full aspect-square max-h-[350px] overflow-hidden rounded-md">
                    <Image
                      unoptimized
                      src={card.posterImageUrl || "/assets/images/bin/product1.webp"}
                      alt={card.name}
                      fill
                    />
                    <div className="absolute bottom-2 left-2">
                      <div className="relative h-9 md:h-16 w-8 md:w-16">
                        <Image
                          unoptimized
                          src="/assets/images/van.png"
                          alt="image"
                          fill
                          className="ms-1 md:ms-2"
                        />
                      </div>
                      <p className="text-[9px] md:text-base font-semibold text-primary text-border">
                        Order by{" "}
                        <span className="text-sm md:text-2xl text-primary font-semibold text-border">
                          3pm
                        </span>
                        <br />
                        <p>Select lightning service</p>
                        Receive you order next day (Dubai)
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="pt-3 sm:space-y-2 px-2">
                  <div className="flex justify-between items-center">
                    <Link href={card.newPath || ""}>
                      <p className="text-xs md:text-base">{categoryName}</p>
                      <h2 className="font-medium text-sm md:text-xl font-rubik md:underline ">
                        {card.name}
                      </h2>
                    </Link>
                    <Image
                      unoptimized
                      src="/assets/images/blinds-icon.png"
                      alt="icon-image"
                      className="w-6 h-6 md:w-10 md:h-10"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      className="rounded-md p-1 sm:p-2 px-4 font-semibold bg-primary cursor-pointer max-sm:text-[10px]"
                      onClick={() => onFreeSample && onFreeSample(card)}
                    >
                      Free Sample
                    </button>

                    <Image
                      unoptimized
                      src={getColorImage(card.color || "")}
                      alt={card.color || "color"}
                      className="w-6 h-6 md:w-10 md:h-10"
                      width={30}
                      height={30}
                    />
                  </div>

                  <p className="block sm:hidden text-xs md:text-base pt-2">From:</p>
                  <div className="flex justify-between items-center sm:pt-2">
                    <div className="flex flex-wrap items-center gap-1 text-xs md:text-base">
                      <p className="hidden sm:block">From:</p>

                      <span className="font-currency text-lg md:text-3xl"></span>
                      <span className="font-semibold text-sm md:text-2xl">{originalPrice}</span>
                    </div>

                    {IsDeleteButton && onDelete ? (
                      <button
                        className="w-6 md:w-10 h-6 md:h-10 border rounded-md bg-primary-light flex justify-center items-center cursor-pointer"
                        onClick={() => card.id && onDelete(String(card.id))}
                      >
                        <TfiTrash className="text-xs md:text-xl" />
                      </button>
                    ) : (
                      <button
                        className="w-6 md:w-10 h-6 md:h-10 border rounded-md flex justify-center items-center cursor-pointer border-black"
                        onClick={() => card.id && addToWishlist(card)}
                      >
                        <FaRegHeart className="text-xs md:text-xl" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1 sm:gap-2 pt-6 flex-wrap">
            {/* Previous */}
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="disabled:opacity-40 cursor-pointer"
            >
              <MdKeyboardArrowLeft className="text-2xl" />
            </button>

            {/* Pages */}
            {getPaginationRange().map((item, i) =>
              item === "..." ? (
                <span key={`dots-${i}`} className="px-2 text-lg">
                  …
                </span>
              ) : (
                <button
                  key={item}
                  onClick={() => handlePageChange(item as number)}
                  className={`${
                    item === currentPage
                      ? "w-9 h-9 bg-primary text-white shadow-xl"
                      : "w-7 h-7 border border-black"
                  } flex justify-center items-center font-medium text-xl cursor-pointer`}
                >
                  {item}
                </button>
              ),
            )}

            {/* Next */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="disabled:opacity-40 cursor-pointer"
            >
              <MdKeyboardArrowRight className="text-2xl" />
            </button>
          </div>
        )}
      </>
    );
  },
);
