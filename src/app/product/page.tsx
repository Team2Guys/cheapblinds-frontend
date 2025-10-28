import DeliveryPolicy from "components/product/deliverypolicy";
import FittingTypeSelector from "components/product/fittingtypeselector";
import PriceCalculator from "components/product/pricecalculator";
import ProductGallery from "components/product/productgallery";
import ProductInfo from "components/product/productinfo";
import SampleRequest from "components/product/sample-request";
import React from "react";

const mockImages = [
  "/products/blind1.jpg",
  "/products/blind2.jpg",
  "/products/blind3.jpg",
  "/products/blind4.jpg",
];

const ProductDetailPage = () => {
  return (
    <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left Side */}
      <ProductGallery images={mockImages} />

      {/* Right Side */}
      <div>
        <ProductInfo />
        <FittingTypeSelector />
        <PriceCalculator />
        <SampleRequest />
        <DeliveryPolicy />
      </div>
    </div>
  );
};

export default ProductDetailPage;
