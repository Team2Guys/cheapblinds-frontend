import Image from "next/image";
import React from "react";
import { HerobannerProps } from "@/types/common";
const Herobanner = ({
  desktopImage,
  mobileImage,
  isHome = false,
  className,
  alt = "hero-banner",
}: HerobannerProps) => {
  return (
    <div
      className={`relative w-full overflow-hidden aspect-square sm:aspect-[21/9]  ${isHome ? "h-auto max-h-[280px] sm:max-h-[520px] 2xl:max-h-[650px]" : className ? className : "h-auto max-h-[400px]"}`}
    >
      <Image
        src={desktopImage}
        alt={alt}
        fill
        priority
        className={`${mobileImage ? "hidden sm:block" : "block"}`}
      />
      {mobileImage && (
        <Image src={mobileImage} alt={alt} fill priority className="block sm:hidden" />
      )}
    </div>
  );
};

export default Herobanner;
