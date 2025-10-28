"use client";
import SlickSlider from "components/ui/slick-slider";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { RelatedProductProps } from "types/common";

const RelatedProduct = ({ title, description, data, titleStart }: RelatedProductProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const handleMouseDown = () => setIsDragging(false);
  const handleMouseMove = () => setIsDragging(true);
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDragging) {
      e.preventDefault();
    }
  };
  return (
    <div className="container mx-auto px-2 space-y-3 mt-10 md:mt-16 ">
      <h2 className={`text-heading ${titleStart ? "text-start" : "text-center"}`}>{title}</h2>
      <p className="text-center">{description}</p>
      <SlickSlider slidesToShow={4}>
        {data.map((array, index) => (
          <div
            key={index}
            className="md:px-2 h-fit"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          >
            <Link href={array.title ?? "#"} onClick={handleClick}>
              <div className="overflow-hidden hover:shadow-sm md:p-2 ">
                <div className="relative w-full h-auto max-h-[350px] aspect-square">
                  <Image src={array.image} alt={array.title ?? ""} fill className="h-auto" />
                </div>
                {array.title && (
                  <div className="py-3 space-y-1">
                    <h3>{array.title}</h3>
                    <p className="text-medium underline">{array.description}</p>
                    <p className="text-2xl font-rubik font-semibold">{array.price}</p>
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </SlickSlider>
    </div>
  );
};

export default RelatedProduct;
