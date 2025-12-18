import Image from "next/image";
import React from "react";
export const ChildSafety = () => {
  return (
    <div className="bg-secondary py-5">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-6">
        <div className="shrink-0">
          <div className="w-24 h-24 relative flex items-center justify-center">
            <Image
              src="/assets/images/home/child-safety.png"
              alt="Image"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="max-md:text-center">
          <h2 className="text-primary text-medium mb-2">Child Safety</h2>
          <p>
            All of our blinds are designed with safety in mind, so wherever there are hanging cords
            or loops, we&apos;ll provide you with all the relevant safety devices and instructions
            on how to use them. Enjoy your blinds with peace of mind.
          </p>
        </div>
      </div>
    </div>
  );
};
