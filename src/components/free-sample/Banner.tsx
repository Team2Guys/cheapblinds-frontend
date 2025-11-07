import Image from "next/image";
import React from "react";

export const Banner = () => {
  return (
    <div className="space-y-4 flex justify-center items-center flex-col">
      <Image
        className="w-24 md:w-32 h-24 md:h-32"
        src="/assets/images/free-sample/banner.webp"
        alt="free sample banner"
        width={200}
        height={200}
      />
      <h1 className="text-heading">Your Sample Basket</h1>
    </div>
  );
};
