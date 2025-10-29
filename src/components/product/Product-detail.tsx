import React from "react";
import Thumbnail from "./thumbnail";
import { productImages } from "data/bin";
import ProductInfo from "./product-info";
import ProductTabs from "./ProductTabs";

const ProductDetail = () => {
  return (
    <div className="mt-10 space-y-3">
      <h1 className="text-heading">Luft Noir Screen Roller Blinds</h1>
      <div className="grid grid-cols-12 md:gap-6">
        <div className="col-span-12 md:col-span-6">
          <div className="bg-primary p-2 flex flex-wrap justify-center sm:justify-between items-center md:px-4">
            <h2 className="text-2xl font-medium">
              DON’T MISS OUT <span className="text-4xl">-30%</span> OFF
            </h2>
            <span className="font-semibold">Ends Soon</span>
          </div>
          <Thumbnail images={productImages} />
        </div>
        <div className="col-span-12 md:col-span-6">
          <ProductInfo />
        </div>
      </div>
      <div className="mt-10 md:mt-16 py-4">
        <ProductTabs />
      </div>
    </div>
  );
};

export default ProductDetail;
