"use client";
import { fetchSingleOrder } from "@config/fetch";
import { Orders } from "@/types/category";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ColorImage } from "@data/filter-colors";

export const AllOrders = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [orders, setOrders] = useState<Orders | null>(null);
  useEffect(() => {
    if (!orderId) return;

    async function loadOrders() {
      try {
        const response = await fetchSingleOrder(orderId || "");
        setOrders(response);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    }

    loadOrders();
  }, [orderId]);

  const getColorImage = (color: string) => {
    const found = ColorImage.find((c) => c.color.toLowerCase() === color.toLowerCase());
    return found ? found.image : "/assets/images/colors/white.png";
  };

  return (
    <div className="bg-[#fff6e6] p-2 md:p-6 rounded-md space-y-3">
      <p>
        <span className="font-medium font-rubik md:text-xl">Order Summary </span>(
        <span className="text-[#FF0000]">*Total {orders?.items.length} Items</span>)
      </p>

      {orders?.items.map((item, index) => (
        <div
          key={index}
          className="flex items-start justify-between border-t border-secondary pt-4"
        >
          <div className="flex items-start gap-4">
            <div className="aspect-square h-full ">
              <Image
                unoptimized
                src={
                  item.price === 0
                    ? getColorImage(item.color || "")
                    : item.posterImageUrl || "/assets/images/colors/white.png"
                }
                alt={item.name}
                width={150}
                height={150}
              />
            </div>
            <div className="max-w-52">
              <p className="font-semibold">{item.name}</p>
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
          {orders?.totalAmount && orders?.totalAmount > 0 ? (
            <>
              <span className="font-currency text-xl font-normal"></span>
              {orders?.totalAmount}
            </>
          ) : (
            "Free"
          )}
        </p>
      </div>
      <div className="border border-secondary p-2 flex justify-between font-medium px-2">
        <p className="text-xl">Total</p>
        <p className="text-xl">
          {orders?.totalAmount && orders?.totalAmount > 0 ? (
            <>
              <span className="font-currency text-2xl font-normal"></span> {orders?.totalAmount}
            </>
          ) : (
            "Free"
          )}
        </p>
      </div>
      <p>Expected delivery date is simply dummy text of the printing and</p>
    </div>
  );
};
