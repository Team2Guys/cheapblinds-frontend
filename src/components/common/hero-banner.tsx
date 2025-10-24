import Image from "next/image";
import React from "react";
import { HerobannerProps } from "types/common";
const Herobanner = ({
  desktopImage,
  mobileImage,
  isHome = false,
  alt = "hero-banner",
}:HerobannerProps) => {
  return (
    <div
      className={`relative w-full overflow-hidden ${ isHome ? "h-[260px] sm:h-[300px] md:h-[400px] xl:h-[512px] 2xl:h-[600px]": "h-[300px]" }`}>
      <Image
        src={desktopImage}
        alt={alt}
        fill
        priority
        className={`hidden sm:block`}
      />
      {mobileImage && (
        <Image
          src={mobileImage}
          alt={alt}
          fill
          priority
          className={`block sm:hidden`}
        />
      )}
    </div>
  );
};

export default Herobanner;
