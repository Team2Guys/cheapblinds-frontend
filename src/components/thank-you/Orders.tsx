import { ThankYouProps } from "@/types/thank-you";
import Image from "next/image";
import React from "react";

export const Orders = ({ orderItems }: ThankYouProps) => {
  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <div className="bg-[#fff6e6] p-2 md:p-6 rounded-md space-y-3">
      <p>
        <span className="font-medium font-rubik md:text-xl">Order Summary </span>(
        <span className="text-[#FF0000]">*Total {orderItems.length} Items</span>)
      </p>

      {orderItems.map((item, index) => (
        <div
          key={index}
          className="flex items-start justify-between border-t border-secondary pt-4"
        >
          <div className="flex items-start gap-4">
            <div className="aspect-square h-full ">
              <Image src={item.image} alt={item.title} width={150} height={150} />
            </div>
            <div className="max-w-52">
              <p className="font-semibold">
                {item.title} x {item.quantity}
              </p>
              <p className="block sm:hidden">
                <span className=" font-currency text-xl font-normal"></span> {item.price}
              </p>
            </div>
          </div>
          <p className="hidden sm:block">
            <span className=" font-currency text-xl font-normal"></span> {item.price}
          </p>
        </div>
      ))}

      <div className="border-t border-secondary pt-4 flex justify-between font-semibold px-2">
        <p>Subtotal</p>
        <p>
          <span className="font-currency text-xl font-normal"></span> {subtotal}
        </p>
      </div>
      <div className="border border-secondary p-2 flex justify-between font-medium px-2">
        <p className="text-xl">Total</p>
        <p className="text-xl">
          <span className="font-currency text-2xl font-normal"></span> {subtotal}
        </p>
      </div>
      <p>Expected delivery date is simply dummy text of the printing and</p>
    </div>
  );
};
