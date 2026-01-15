import Image from "next/image";
import Link from "next/link";
import { HeroProps } from "@/types/common";
import React from "react";

export const HeroSection = React.memo(
  ({
    desktopImage,
    mobileImage,
    isHome = false,
    className,
    alt = "hero-banner",
    link,
  }: HeroProps) => {
    const content = (
      <>
        <Image
          unoptimized
          src={desktopImage}
          alt={alt}
          fill
          priority
          fetchPriority="high"
          quality={100}
          sizes="100vw"
          className={mobileImage ? "hidden sm:block" : "block"}
        />

        {mobileImage && (
          <Image
            unoptimized
            src={mobileImage}
            alt={alt}
            fill
            priority
            fetchPriority="high"
            className="block sm:hidden"
          />
        )}
      </>
    );

    return link ? (
      <Link
        href={link}
        className={`relative w-full overflow-hidden 
      ${
        isHome
          ? "h-full aspect-square sm:aspect-21/8"
          : className
            ? className
            : "h-full aspect-square sm:aspect-21/5"
      } block`}
      >
        {content}
      </Link>
    ) : (
      <div
        className={`relative w-full overflow-hidden  
      ${
        isHome
          ? "h-full aspect-square sm:aspect-21/8"
          : className
            ? className
            : "h-full aspect-square sm:aspect-21/5"
      } `}
      >
        {content}
      </div>
    );
  },
);
