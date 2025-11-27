import { Card } from "@components";
import { products } from "@data/data";
import React from "react";

export const Wishlist = () => {
  const categoryName = products[0]?.category?.name || "";
  const categoryUrl = products[0]?.category?.slug || "";

  return (
    <div className="space-y-5">
      <h1 className="text-heading text-center">My Wishlist</h1>
      <p className="text-xl font-medium font-rubik">
        <span>{products.length}</span> Item(s)
      </p>

      <Card
        products={products}
        productsPerPage={9}
        categoryName={categoryName}
        categoryUrl={categoryUrl}
        IsDeleteButton
      />
    </div>
  );
};
