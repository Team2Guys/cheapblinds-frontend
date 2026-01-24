"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaBox, FaTruck, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function OrderSearchPage() {
  const [orderId, setOrderId] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId) {
      router.push(`/order-tracking/${orderId}`);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center px-2 my-10">
      <div className="max-w-xl w-full">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="bg-primary p-5 rounded-3xl shadow-xl shadow-secondary">
              <FaBox className="text-white text-3xl" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md text-primary text-xs">
              <FaTruck />
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black tracking-tight mb-3 uppercase">Track Your Shipment</h1>
          <p className="text-gray-400">Enter your order ID to track your shipment.</p>
        </div>

        <div className="p-2 rounded-4xl shadow-xl shadow-gray-200/50 border border-black">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full pl-4">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <FaSearch size={20} />
              </div>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Order ID"
                className="w-full py-4 pl-12 pr-4 bg-transparent outline-none font-medium placeholder:text-gray-300 placeholder:font-medium"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-black hover:bg-primary text-white font-black px-8 py-4 rounded-3xl transition-all flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
            >
              TRACK <FaArrowRight size={14} />
            </button>
          </form>
        </div>

        {/* Recent Searches (Optional Visual) */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-400 font-medium">
            Problems with your order?{" "}
            <Link
              href="/contact-us"
              className="text-primary font-bold underline underline-offset-4"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
