"use client";
import Image from "next/image";
import React from "react";

interface ImageGridProps {
  leftImage: string;
  rightImage: string;
}

export const ImageGrid: React.FC<ImageGridProps> = React.memo(({ leftImage, rightImage }) => {
  return (
    <div className="container mx-auto px-2 my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* LEFT IMAGE WITH BACKGROUND */}
        <div className="bg-primary flex flex-col items-center justify-center p-4">
          <div className="relative aspect-square md:h-[400px] w-full">
            <Image unoptimized src={leftImage} alt="Left Image" fill className="object-contain" />
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative aspect-square md:h-[500px] w-full">
          <Image unoptimized src={rightImage} alt="Right Image" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
});
