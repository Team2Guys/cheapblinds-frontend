"use client";
import React from "react";
import { Thumbnail, ProductInfo, ProductTabs } from "@components";
import { Product } from "@/types/category";

export const ProductDetail = ({
  categorySlug,
  productData,
}: {
  categorySlug: string;
  productData: Product;
}) => {
  const {
    name,
    price,
    shortDescription,
    description,
    additionalInfo,
    measuringGuide,
    productImages,
  } = productData;
  return (
    <div className="mt-10 space-y-3">
      <h1 className="text-heading">{name}</h1>
      <div className="grid grid-cols-12 gap-3 md:gap-6">
        <div className="col-span-12 md:col-span-6">
          <Thumbnail images={productImages} />
        </div>
        <div className="col-span-12 md:col-span-6">
          <ProductInfo
            categorySlug={categorySlug}
            price={price}
            shortDescription={shortDescription}
            product={productData}
          />
        </div>
      </div>
      <div className="mt-10 md:mt-16 py-4">
        <ProductTabs
          description={description}
          additionalInfo={additionalInfo}
          measuringGuide={measuringGuide}
        />
      </div>
    </div>
  );
};
