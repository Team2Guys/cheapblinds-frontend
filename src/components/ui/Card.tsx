"use client";

import { Product } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { TfiTrash } from "react-icons/tfi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { ColorImage } from "@data/filter-colors";
import { useIndexedDb } from "@lib/useIndexedDb";

interface CardProps {
  products: Product[];
  categoryUrl?: string;
  categoryName?: string;
  IsDeleteButton?: boolean;
  productsPerPage?: number;
  selectedMotorized?: boolean;
  onDelete?: (_id: string) => void;
  onFreeSample?: (_product: Product) => void;
}

export const Card = ({
  products,
  categoryUrl,
  categoryName,
  IsDeleteButton,
  productsPerPage = 9,
  selectedMotorized = false,
  onDelete,
  onFreeSample,
}: CardProps) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const { addToWishlist } = useIndexedDb();

  const visibleProducts = useMemo(() => {
    const start = (page - 1) * productsPerPage;
    return products.slice(start, start + productsPerPage);
  }, [products, page, productsPerPage]);

  const getColorImage = (color: string) => {
    const found = ColorImage.find((c) => c.color.toLowerCase() === color.toLowerCase());
    return found ? found.image : "/assets/images/colors/white.png";
  };

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
        {visibleProducts.map((card) => {
          const basePrice = card.discountPrice ?? card.price ?? 0;
          const original = card.price ?? 0;
          const motor = card.motorPrice ?? 0;
          const finalPrice = selectedMotorized ? basePrice + motor : basePrice;
          const originalPrice = selectedMotorized ? original + motor : original;

          return (
            <div key={card.id} className="relative rounded-md pb-2">
              <Link href={card.url ?? `/${categoryUrl}/${card.parentSubcategoryUrl}/${card.slug}`}>
                <div className="relative w-full aspect-square max-h-[350px] overflow-hidden rounded-md">
                  <Image
                    src={card.posterImageUrl || "/assets/images/bin/product1.webp"}
                    alt={card.name}
                    fill
                  />
                  <div className="absolute bottom-2 left-2">
                    <div className="relative h-9 md:h-16 w-8 md:w-16">
                      <Image
                        src="/assets/images/van.png"
                        alt="image"
                        fill
                        className="ms-1 md:ms-2"
                      />
                    </div>
                    <p className="text-[9px] md:text-base font-semibold text-primary [text-shadow:_-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,2px_2px_0_#000,0_2px_0_#000,2px_0_0_#000,0_-2px_0_#000,-2px_0_0_#000,-2px_1px_0_#000,2px_1px_0_#000,-2px_-1px_0_#000,2px_-1px_0_#000,-1px_2px_0_#000,1px_2px_0_#000,-1px_-2px_0_#000,1px_-2px_0_#000] md:[text-shadow:_-4px_-4px_0_#000,4px_-4px_0_#000,-4px_4px_0_#000,4px_4px_0_#000,0_4px_0_#000,4px_0_0_#000,0_-4px_0_#000,-4px_0_0_#000,-4px_2px_0_#000,4px_2px_0_#000,-4px_-2px_0_#000,4px_-2px_0_#000,-2px_4px_0_#000,2px_4px_0_#000,-2px_-4px_0_#000,2px_-4px_0_#000]">
                      Order by{" "}
                      <span className="text-sm md:text-2xl text-primary font-semibold [text-shadow:_-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,2px_2px_0_#000,0_2px_0_#000,2px_0_0_#000,0_-2px_0_#000,-2px_0_0_#000,-2px_1px_0_#000,2px_1px_0_#000,-2px_-1px_0_#000,2px_-1px_0_#000,-1px_2px_0_#000,1px_2px_0_#000,-1px_-2px_0_#000,1px_-2px_0_#000] md:[text-shadow:_-4px_-4px_0_#000,4px_-4px_0_#000,-4px_4px_0_#000,4px_4px_0_#000,0_4px_0_#000,4px_0_0_#000,0_-4px_0_#000,-4px_0_0_#000,-4px_2px_0_#000,4px_2px_0_#000,-4px_-2px_0_#000,4px_-2px_0_#000,-2px_4px_0_#000,2px_4px_0_#000,-2px_-4px_0_#000,2px_-4px_0_#000]">
                        3pm
                      </span>
                      <br />
                      Same Day Express Delivery
                    </p>
                  </div>
                </div>
              </Link>

              <div className="pt-3 md:space-y-4 px-2">
                <Link
                  href={card.url ?? `/${categoryUrl}/${card.parentSubcategoryUrl}/${card.slug}`}
                >
                  <p className="text-xs md:text-base">{categoryName}</p>
                  <h2 className="font-medium text-base md:text-xl font-rubik md:underline md:h-10">
                    {card.name}
                  </h2>
                </Link>

                <div className="flex justify-between items-center">
                  <button
                    className="rounded-md p-1 sm:p-2 px-4 font-semibold bg-primary cursor-pointer max-sm:text-[10px]"
                    onClick={() => onFreeSample && onFreeSample(card)}
                  >
                    Free Sample
                  </button>

                  <Image
                    src={getColorImage(card.color || "")}
                    alt={card.color || "color"}
                    className="w-6 h-6 sm:w-10 sm:h-10"
                    width={30}
                    height={30}
                  />
                </div>

                <p className="block sm:hidden text-xs md:text-base pt-2">From:</p>
                <div className="flex justify-between items-center sm:pt-2">
                  <p className="flex flex-wrap items-center gap-1 text-xs md:text-base">
                    <p className="hidden sm:block">From:</p>
                   
                      <span className="font-currency text-lg md:text-3xl"></span>
                      <span className="font-semibold text-sm md:text-2xl">{finalPrice}</span>
                    
                    {card.discountPrice && (
                      <>
                        <span className="font-currency text-lg md:text-2xl"></span>
                        <span className="line-through text-sm md:text-base">{originalPrice}</span>
                      </>
                    )}
                  </p>

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
                      onClick={() =>
                        card.id && addToWishlist(card, categoryUrl || "", categoryName || "")
                      }
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
        <div className="flex justify-center items-center gap-2 pt-6">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            <MdKeyboardArrowLeft className="text-2xl" />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`${
                i + 1 === page
                  ? "w-9 h-9 bg-primary text-white shadow-xl"
                  : "w-7 h-7 border border-black"
              } flex justify-center items-center font-medium text-xl`}
            >
              {i + 1}
            </button>
          ))}

          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            <MdKeyboardArrowRight className="text-2xl" />
          </button>
        </div>
      )}
    </>
  );
};
