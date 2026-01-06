import Image from "next/image";
import React from "react";

export const MotorisedBanner = React.memo(() => {
  return (
    <div className="bg-primary py-5">
      <div className="container mx-auto px-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative aspect-3/2 w-full order-2 sm:order-1">
          <Image
            unoptimized
            src="/assets/images/motorised/zebra-image.webp"
            alt="Motorised Blinds Banner"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="relative aspect-3/2 w-full order-1 sm:order-2">
          <Image
            unoptimized
            src="/assets/images/motorised/banner.webp"
            alt="Motorised Blinds Banner"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
});
