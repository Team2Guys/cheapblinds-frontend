import Image from "next/image";
import React from "react";

export const MotorisedBanner = React.memo(() => {
  return (
    <div className="bg-primary py-5">
      <div className="container mx-auto px-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative aspect-3/2 w-full order-2 sm:order-1">
          <Image
            unoptimized
            src="/assets/images/motorised/zebra-image.png"
            alt="Motorised Blinds Banner"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative aspect-3/2 w-full order-1 sm:order-2">
          <Image
            unoptimized
            src="/assets/images/motorised/banner.webp"
            alt="Motorised Blinds Banner"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
});
