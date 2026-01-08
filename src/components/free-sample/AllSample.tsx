"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ColorImage } from "@data/filter-colors";
import { Product } from "@/types/category";

interface SampleProps {
  freeSamplesList: Product[];
  removeItem?: (_id: string) => void;
}

export const AllSample = React.memo(({ freeSamplesList, removeItem }: SampleProps) => {
  // Function to get color image based on sample color
  const getColorImage = (color?: string) => {
    if (!color) return "/assets/images/free-sample/add-sample.webp"; // fallback
    const colorObj = ColorImage.find((c) => c.color.toLowerCase() === color.toLowerCase());
    return colorObj ? colorObj.image : "/assets/images/free-sample/add-sample.webp";
  };

  return (
    <div className="py-5 border-b-2 border-secondary">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
        {freeSamplesList.map((sample) => (
          <div
            key={sample.id}
            className="flex flex-col justify-between items-center p-3 border-2 border-primary rounded-md text-center space-y-2"
          >
            {/* Show color image */}
            <div className="relative aspect-square w-full max-h-[200px]">
              <Image
                unoptimized
                src={getColorImage(sample.color)}
                alt={sample.name}
                fill
                className="object-contain"
              />
            </div>

            <div className="space-y-1">
              <p className="font-semibold font-rubik underline line-clamp-2">{sample.name}</p>
              <p className="font-medium">Dispatch Today</p>
              {removeItem && (
                <button
                  className="text-primary font-semibold hover:underline cursor-pointer"
                  onClick={() => {
                    if (confirm("Are you sure you want to remove this sample?")) {
                      removeItem(String(sample.id));
                    }
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add more sample */}
        <div className="flex flex-col justify-center items-center p-3 border-2 border-dashed border-primary rounded-md text-center cursor-pointer h-auto">
          <Link
            href="/"
            className="relative aspect-square w-full max-h-[150px] flex items-center justify-center"
          >
            <Image
              unoptimized
              src="/assets/images/free-sample/add-sample.webp"
              alt="Add sample"
              fill
              className="object-contain"
            />
          </Link>
          <p className="font-semibold font-rubik underline mt-2">Add more sample</p>
        </div>
      </div>
    </div>
  );
});
