import { Compatible } from "@data/motorised";
import Image from "next/image";
import React from "react";

export const CompatibleProducts = () => {
  return (
    <div className="container mx-auto px-2 my-10 text-center space-y-5">
      <h3 className="text-heading">Compatible Products</h3>
      <p>
        We can offer Motionblinds motorisation on all of our Roller blinds, Roman blinds and Zebra
        blinds.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 max-w-3xl mx-auto gap-6">
        {Compatible.map((item, index) => (
          <div className="flex flex-col items-center gap-3" key={index}>
            <div className="relative w-24 h-24 sm:w-28 sm:h-28">
              <Image
                unoptimized
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 96px, 112px"
              />
            </div>
            <button className="bg-primary font-semibold px-4 py-2 rounded-md">{item.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
};
