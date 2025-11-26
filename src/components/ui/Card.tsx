import { Product } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { TfiTrash } from "react-icons/tfi";

export const Card = ({ card, IsDeleteButton, categoryUrl, subcategoryUrl }: { card: Product; IsDeleteButton?: boolean, categoryUrl?: string, subcategoryUrl?: string }) => {
  return (
    <div className="card-wrapper relative rounded-md pb-2">
      <Link href={`/${categoryUrl}/${subcategoryUrl}/${card.slug}`}>
        <div className="relative w-full aspect-square max-h-[350px] overflow-hidden rounded-md">
          <Image
            src={card.thumbnailUrl || "/assets/images/bin/product1.webp"}
            alt={card.name}
            fill
          />
          <div className="absolute bottom-2 left-2">
            <div className="relative h-9 md:h-16 w-7 md:w-14">
              <Image
                src="/assets/images/category/filter-lighting.png"
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
      <div className="pt-3 space-y-4 px-2">
        <Link
          href={`/${categoryUrl}/${subcategoryUrl}/${card.slug}`}
          className="flex justify-between md:items-center gap-1 md:gap-2"
        >
          <div className="space-y-1">
            <p className="text-xs md:text-base">{card.name}</p>
            <h2 className="font-medium text-base md:text-xl font-rubik md:underline h-10 xs:h-auto">
              {card.name}
            </h2>
          </div>
          <div className="relative w-6 md:w-10 h-6 md:h-10">
            <Image src="/assets/images/product/blackour-window.png" alt="image" fill />
          </div>
        </Link>
        <div className="flex justify-between items-center gap-1 md:gap-2">
          <button className="bg-primary w-28 md:w-44 h-6 md:h-10 text-[10px] md:text-base flex justify-center items-center rounded-md font-semibold cursor-pointer">
            Free Sample
          </button>
          <span
            className="jagged-shape w-6 md:w-10 h-6 md:h-10"
            style={{ background: `#E0D5C6` }}
          />
        </div>
        <div className="flex justify-between items-center gap-1 md:gap-2">
          <p className="flex items-center gap-1 text-xs md:text-base">
            From:
            {card.discountPrice ? (
              <><span className="font-currency text-base md:text-[22px] font-normal"></span>
                <span className="font-semibold  text-sm md:text-2xl">{card.discountPrice}</span>
                <span className="font-currency text-base md:text-[22px] font-normal"></span>
                <span className="font-semibold line-through">{card.price}</span>
              </>
            ) : (
              <>
                <span className="font-currency text-base md:text-[22px] font-normal"></span>
                <span className="font-semibold">{card.price}</span>
              </>
            )}
          </p>
          {IsDeleteButton ? (
            <button className="w-6 md:w-10 h-6 md:h-10 border rounded-md border-secondary flex justify-center items-center cursor-pointer bg-primary-light">
              <TfiTrash size={25} />
            </button>
          ) : (
            <button className="w-6 md:w-10 h-6 md:h-10 border rounded-md border-black flex justify-center items-center cursor-pointer ">
              <FaRegHeart className="text-xs md:text-xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
