"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Testimonial, MySample } from "@components";
import { TestimonialReview } from "@data/detail-page";
import { useAuth } from "@context/UserContext";
import { AccountSidebar } from "@components/accounts/AccountSidebar";
import { queryData } from "@config/fetch";
import { Orders } from "@/types/category";
import { ORDERS_BY_USER_ID } from "@graphql";

const MySamplePage = () => {
  const { user, isLoading } = useAuth();
  const [orders, setOrders] = useState<Orders[] | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;

    async function loadOrders() {
      try {
        const response: Orders[] | null = await queryData(ORDERS_BY_USER_ID, "orderListByUserId", {
          id: user?.id || "",
        });
        const OrdersList = response
          ? response
              .filter((order: Orders) => order.paymentStatus === "FREE")
              .sort(
                (a, b) =>
                  new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime(),
              )
          : [];
        setOrders(OrdersList);
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
