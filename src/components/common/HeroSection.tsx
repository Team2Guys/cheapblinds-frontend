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
    const wrapperClasses = `relative w-full overflow-hidden aspect-square sm:aspect-21/9
      ${
        isHome
          ? "h-auto max-h-[280px] sm:max-h-[520px] 2xl:max-h-[650px]"
          : className
            ? className
            : "h-auto max-h-[400px]"
      }`;

    const content = (
      <>
        <Image
          unoptimized
          src={desktopImage}
          alt={alt}
          fill
          priority
          fetchPriority="high"
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
      <Link href={link} className={`${wrapperClasses} block`}>
        {content}
      </Link>
    ) : (
      <div className={wrapperClasses}>{content}</div>
    );
  },
);
