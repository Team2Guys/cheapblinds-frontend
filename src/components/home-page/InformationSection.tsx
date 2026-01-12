import { infoItems } from "@data/home";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const InformationSection = React.memo(({ className }: { className?: string }) => {
  return (
    <div
      className={`container mx-auto flex flex-wrap justify-center md:grid md:grid-cols-5 ${className}`}
    >
      {infoItems.map((item, index) => (
        <Link href={`${item.link}`}
          key={item.id}
          className={`w-4/12 md:w-auto flex flex-col items-center justify-center text-center max-md:mb-2 py-6 px-4
            ${index % 2 === 0 ? "bg-primary-light" : "bg-primary text-white"}`}
        >
          <div className="relative w-16 h-16 md:w-24 md:h-24 mb-3">
            <Image unoptimized src={item.image} alt={item.text} fill className="object-contain" />
          </div>
          <p className="text-sm md:text-base font-semibold leading-snug">{item.text}</p>
        </Link>
      ))}
    </div>
  );
});
