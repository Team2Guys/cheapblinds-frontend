"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Testimonial, MySample } from "@components";
import { TestimonialReview } from "@data/detail-page";
import { useAuth } from "@context/UserContext";
import { AccountSidebar } from "@components/accounts/AccountSidebar";
import { fetchOrdersByUserId } from "@config/fetch";
import { Orders } from "@/types/category";

const MySamplePage = () => {
  const { user, isLoading } = useAuth();
  const [orders, setOrders] = useState<Orders[] | null>(null);
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Fetch orders once user is available
  useEffect(() => {
    if (!user) return;

    async function loadOrders() {
      try {
        const response = await fetchOrdersByUserId(user?.id || "");
        setOrders(response);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    }

    loadOrders();
  }, [user]);

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded" style={{ width: `${80 - i * 10}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div>
      <div className="container mx-auto px-2 flex flex-wrap md:flex-nowrap gap-4 my-10">
        <AccountSidebar />
        <div className="flex-1">
          <MySample orderList={orders || []} />
        </div>
      </div>

      <Testimonial reviews={TestimonialReview} showPaymentInfo />
    </div>
  );
};

export default MySamplePage;
