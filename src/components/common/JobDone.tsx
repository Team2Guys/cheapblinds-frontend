"use client";
import SlickSlider from "components/ui/slick-slider";
import Image from "next/image";
import React, { useState } from "react";
import { RelatedProductProps } from "types/common";

const JobDone = ({ title, description, data }: RelatedProductProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(false);
  const handleMouseMove = () => setIsDragging(true);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) e.preventDefault();
  };

  return (
    <div className="container mx-auto px-2 space-y-3 mt-10 md:mt-16">
      <h2 className="text-heading text-center">{title}</h2>
      <p className="text-center">{description}</p>

      <SlickSlider>
        {data.map((array, index) => (
          <div
            key={index}
            className="px-2 h-fit"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          >
            <div onClick={handleClick}>
              <div className="relative overflow-hidden group">
                <div className="relative w-full aspect-square">
                  <Image
                    src={array.image}
                    alt={array.title ?? ""}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-white text-center px-3">
                  <p className="text-lg font-semibold">{array.title}</p>
                  <p>{array.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </SlickSlider>
    </div>
  );
};

export default JobDone;