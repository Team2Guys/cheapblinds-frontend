"use client";
import React from "react";
import Image from "next/image";
import { CartItems } from "@/types/category";

interface OrderProductsProps {
  products: CartItems[];
}

export const OrderProducts = React.memo(({ products }: OrderProductsProps) => {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="flex items-center justify-between p-2 gap-2">
          <div className="flex items-center gap-3">
            <div className="relative rounded overflow-hidden w-full h-full aspect-square max-h-20 max-w-20">
              <Image unoptimized src={product.posterImageUrl || ""} alt={product.name} fill />
            </div>
            <div>
              <p className="font-semibold">
                {product.name} <span className="font-normal">x {product.quantity}</span>
              </p>
            </div>
          </div>
          <p className="font-semibold whitespace-nowrap">
            <span className="font-normal"></span>{" "}
            <span className="font-currency text-xl font-normal"></span>
            {product.finalPrice}
          </p>
        </div>
      ))}
    </div>
  );
});
