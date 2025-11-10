import { Card } from "@components";
import { products } from "@data/data";
import React from "react";

export const Wishlist = () => {
  return (
    <div className="space-y-5">
      <h1 className="text-heading text-center">My Wishlist</h1>
      <p className="text-xl font-medium font-rubik">
        <span>{products.length}</span> Item(s)
      </p>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 pt-6">
        {products.map((item, index) => (
          <Card card={item} key={index} IsDeleteButton />
        ))}
      </div>
    </div>
  );
};
