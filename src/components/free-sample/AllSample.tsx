"use client";
import Image from "next/image";
import React from "react";

interface Sampleprops {
  samples: {
    id: number;
    name: string;
    img: string;
    dispatch: string;
  }[];
}

export const AllSample = ({ samples }: Sampleprops) => {
  return (
    <div className="py-5 border-b-2 border-secondary">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
        {samples.map((sample) => (
          <div
            key={sample.id}
            className="flex flex-col justify-between items-center p-3 border-2 border-primary rounded-md text-center space-y-2"
          >
            <div className="relative aspect-square w-full max-h-[200px]">
              <Image src={sample.img} alt={sample.name} fill className="object-contain" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold font-rubik underline line-clamp-2">{sample.name}</p>
              <p className="font-medium">{sample.dispatch}</p>
              <button className="text-primary font-semibold hover:underline">Remove</button>
            </div>
          </div>
        ))}

        <div className="flex flex-col justify-center items-center p-3 border-2 border-dashed border-primary rounded-md text-center cursor-pointer h-auto">
          <div className="relative aspect-square w-full max-h-[150px] flex items-center justify-center">
            <Image
              src="/assets/images/free-sample/add-sample.webp"
              alt="Add sample"
              fill
              className="object-contain"
            />
          </div>
          <p className="font-semibold font-rubik underline mt-2">Add more sample</p>
        </div>
      </div>
    </div>
  );
};
