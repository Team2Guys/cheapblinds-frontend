"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [zoom, setZoom] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-full md:w-full">
      {/* Main Image */}
      <div
        className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl border cursor-zoom-in"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
      >
        <Image
          src={activeImage}
          alt="Product"
          fill
          className={`object-cover transition-transform duration-300 ${
            zoom ? "scale-110" : "scale-100"
          }`}
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {images.map((img, index) => (
          <div
            key={index}
            className={`relative w-20 h-20 border-2 rounded-md cursor-pointer overflow-hidden ${
              activeImage === img ? "border-primary" : "border-transparent"
            }`}
            onClick={() => setActiveImage(img)}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index}`}
              fill
              className="object-cover hover:scale-105 transition-transform"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
