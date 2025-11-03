"use client";
import React from "react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
}

interface OrderProductsProps {
  products: Product[];
}

const OrderProducts = ({ products }: OrderProductsProps) => {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="flex items-center justify-between p-2 gap-2">
          <div className="flex items-center gap-3">
            <div className="relative rounded overflow-hidden w-full h-full aspect-square max-h-20 max-w-20">
              <Image src={product.image} alt={product.name} fill />
            </div>
            <div>
              <p className="font-semibold">
                {product.name} <span className="font-normal">x {product.qty}</span>
              </p>
            </div>
          </div>
          <p className="font-semibold whitespace-nowrap">
            <span className="font-normal">From:</span>{" "}
            <span className="font-currency text-xl font-normal"></span>
            {product.price}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OrderProducts;
