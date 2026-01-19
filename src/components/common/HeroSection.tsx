"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { HeroProps } from "@/types/common";
import { Modal } from "@components/ui";

export const HeroSection = React.memo(
  ({
    desktopImage,
    mobileImage,
    isHome = false,
    className,
    alt = "hero-banner",
    link,

    // NEW
    modalContent,
    modalTitle,
  }: HeroProps) => {
    const [open, setOpen] = useState(false);

    const wrapperClasses = `relative w-full overflow-hidden ${modalContent ? "cursor-pointer" : ""}
      ${
        isHome
          ? "h-full aspect-[12/9] sm:aspect-21/8"
          : className
            ? className
            : "h-full aspect-video sm:aspect-21/5"
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

    if (modalContent) {
      return (
        <>
          <div className={wrapperClasses} onClick={() => setOpen(true)}>
            {content}
          </div>

          <Modal isOpen={open} onClose={() => setOpen(false)} title={modalTitle}>
            {modalContent}
          </Modal>
        </>
      );
    }
    if (link) {
      return (
        <Link href={link} className={`${wrapperClasses} block`}>
          {content}
        </Link>
      );
    }

    // ✅ CASE 3: Normal image (unchanged)
    return <div className={wrapperClasses}>{content}</div>;
  },
);
