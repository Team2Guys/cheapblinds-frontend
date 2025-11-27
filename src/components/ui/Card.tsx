"use client";

import { Product } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { TfiTrash } from "react-icons/tfi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface CardProps {
  products: Product[];
  categoryUrl?: string;
  categoryName?: string;
  IsDeleteButton?: boolean;
  productsPerPage?: number;
}

export const Card = ({
  products,
  categoryUrl,
  categoryName,
  IsDeleteButton,
  productsPerPage = 9,
}: CardProps) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const visibleProducts = useMemo(() => {
    const start = (page - 1) * productsPerPage;
    return products.slice(start, start + productsPerPage);
  }, [products, page, productsPerPage]);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
        {visibleProducts.map((card) => (
          <div key={card.id} className="relative rounded-md pb-2">
            <Link href={`/${categoryUrl}/${card.parentSubcategoryUrl}/${card.slug}`}>
              <div className="relative w-full aspect-square max-h-[350px] overflow-hidden rounded-md">
                <Image
                  src={card.thumbnailUrl || "/assets/images/bin/product1.webp"}
                  alt={card.name}
                  fill
                />
              </div>
            </Link>

            <div className="pt-3 md:space-y-4 px-2">
              <Link href={`/${categoryUrl}/${card.parentSubcategoryUrl}/${card.slug}`}>
                <p className="text-xs md:text-base">{categoryName}</p>
                <h2 className="font-medium text-base md:text-xl font-rubik md:underline md:h-10 xs:h-auto">
                  {card.name}
                </h2>
              </Link>

              <div className="flex flex-wrap  justify-between items-center gap-1 md:gap-2">
                <p className="flex items-center gap-1 text-xs md:text-base">
                  From:
                  {card.discountPrice ? (
                    <>
                      <span className="font-currency text-lg md:text-3xl font-normal"></span>
                      <span className="font-semibold text-sm md:text-2xl">
                        {card.discountPrice}
                      </span>
                      <span className="font-currency text-lg md:text-xl font-normal"></span>
                      <span className="font-semibold line-through text-sm lg:text-base">
                        {card.price}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-currency text-lg md:text-3xl font-normal"></span>
                      <span className="font-semibold">{card.price}</span>
                    </>
                  )}
                </p>

                {IsDeleteButton ? (
                  <button className="w-6 md:w-10 h-6 md:h-10 border rounded-md border-secondary flex justify-center items-center cursor-pointer bg-primary-light">
                    <TfiTrash size={25} />
                  </button>
                ) : (
                  <button className="w-6 md:w-10 h-6 md:h-10 border rounded-md border-black flex justify-center items-center cursor-pointer">
                    <FaRegHeart className="text-xs md:text-xl" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
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
