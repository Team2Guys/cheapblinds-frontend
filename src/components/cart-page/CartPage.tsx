"use client";
import Image from "next/image";
import React, { useState } from "react";
import { SelectOption, Counter, Checkout } from "@components";
import { HiOutlineTrash } from "react-icons/hi2";
import { CartItems, CartOptions } from "@data/bin";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export const CartPage = React.memo(() => {
  const [selected, setSelected] = useState("normal");
  const [quantities, setQuantities] = useState<Record<number, number>>(
    CartItems.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {}),
  );

  const handleDecrement = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const handleIncrement = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  return (
    <div className="container mx-auto px-2 grid grid-cols-12 gap-4 my-10">
      <div className="col-span-12 md:col-span-7 lg:col-span-9 space-y-5 md:space-y-10">
        <h1 className="text-heading">Your Shopping Basket</h1>

        <div>
          <div className="hidden lg:flex bg-primary-light p-2 font-rubik font-medium text-xl">
            <div className="w-[64%]">Product</div>
            <div className="w-[16%] text-center">Quantity</div>
            <div className="w-[16%] text-center">Unit price</div>
            <div className="w-[4%]" />
          </div>

          {CartItems.map((item) => (
            <div key={item.id} className="flex p-2 text-xl border-b-2 border-secondary">
              <div className="w-full lg:w-[64%]">
                <div className="flex lg:hidden justify-end">
                  <div className="rounded-full bg-primary-light w-fit h-fit p-2 text-center cursor-pointer">
                    <HiOutlineTrash />
                  </div>
                </div>

                <div className="flex lg:flex-nowrap gap-4 pr-2 py-6">
                  <div className="relative aspect-square h-full max-h-[150px] w-3/12">
                    <Image
                      unoptimized
                      src={item.image}
                      alt={item.name}
                      className="rounded-sm"
                      width={150}
                      height={150}
                    />
                  </div>

                  <div className="flex lg:hidden justify-between items-center h-14 w-9/12">
                    <Counter
                      quantity={quantities[item.id]}
                      handleIncrement={() => handleIncrement(item.id)}
                      handleDecrement={() => handleDecrement(item.id)}
                    />
                    <div className="bg-primary border-2 rounded-md font-semibold p-1 h-fit">
                      <span className="font-currency text-2xl font-normal"></span> {item.price}
                    </div>
                  </div>

                  <SelectOption
                    selected={selected}
                    setSelected={setSelected}
                    CartOptions={CartOptions}
                    className="hidden lg:flex"
                  />
                </div>

                <SelectOption
                  selected={selected}
                  setSelected={setSelected}
                  CartOptions={CartOptions}
                  className="flex lg:hidden"
                />
              </div>

              <div className="w-[16%] hidden lg:flex items-start justify-center">
                <Counter
                  quantity={quantities[item.id]}
                  handleIncrement={() => handleIncrement(item.id)}
                  handleDecrement={() => handleDecrement(item.id)}
                />
              </div>

              <div className="w-[16%] hidden lg:flex justify-center">
                <span className="bg-primary border-2 rounded-md font-semibold p-1 h-fit">
                  <span className="font-currency text-2xl font-normal"></span> {item.price}
                </span>
              </div>

              <div className="w-[4%] hidden lg:flex">
                <div className="flex justify-end">
                  <div className="rounded-full bg-primary-light w-fit h-fit p-2 text-center cursor-pointer">
                    <HiOutlineTrash />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className=" col-span-12 md:col-span-5 lg:col-span-3 space-y-5 md:space-y-10">
        <h2 className="text-heading">Order summary</h2>
        <Checkout />
        <Link
          href="/"
          className="bg-primary hover:bg-primary/90 font-semibold rounded-lg text-center py-3 flex justify-center items-center gap-2"
        >
          <FaArrowLeft size={20} /> Continue Shopping
        </Link>
      </div>
    </div>
  );
});
