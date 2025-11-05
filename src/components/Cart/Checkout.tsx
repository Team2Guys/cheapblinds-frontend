import React from "react";
import { FaLock } from "react-icons/fa6";
import { PaymentOption } from "@/data/cart";
import Image from "next/image";
import Link from "next/link";
import { PaymentMethod } from "@components/common";

const Checkout = () => {
  return (
    <div className="bg-primary-light p-2">
      <div className="border space-y-3">
        <div className="flex justify-between items-center font-semibold p-2 border-b border-secondary">
          <p>Subtotal</p>
          <p>
            <span className="font-currency text-xl font-normal"></span>1,915
          </p>
        </div>
        <div className="p-2 space-y-2">
          <p>Shipping</p>
          <ul className="list-disc ml-5">
            <li className="font-semibold">Cost</li>
          </ul>
          <p>Shipping options will be updated during checkout.</p>
        </div>
        <div className="flex justify-between items-center font-medium text-xl p-2 border">
          <p>Total</p>
          <p>
            <span className="font-currency text-2xl font-normal"></span>1,915
          </p>
        </div>
        <p className="font-semibold py-2">Prices are inclusive of VAT</p>
        <Link
          href="/checkout"
          className="w-full bg-primary rounded-lg py-3 font-semibold flex justify-center items-center gap-2"
        >
          <FaLock size={20} /> Proceed to checkout
        </Link>
        <p className="font-semibold">Buy Now, Pay Later</p>
        <PaymentMethod installments={1000} isCheckout />
        <p className="font-semibold">Guaranteed Safe Checkout</p>
        <div className="flex flex-wrap">
          {PaymentOption.map((array, index) => (
            <Image
              src={array.image}
              className="w-16"
              alt="payment-method"
              key={index}
              width={100}
              height={100}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
