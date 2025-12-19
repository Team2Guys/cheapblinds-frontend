"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Testimonial, NewsletterSubscriptions, Toaster } from "@components";
import { TestimonialReview } from "@data/detail-page";
import { useAuth } from "@context/UserContext";
import { AccountSidebar } from "@components/accounts/AccountSidebar";
import { fetchNewsletterByEmail } from "@config/fetch";
import { NewsletterProps } from "@/types/category";

const NewsletterPage = () => {
  const { user, isLoading } = useAuth();
  const [newsletter, setNewsletter] = useState<NewsletterProps | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);
  useEffect(() => {
    if (!user) return;
    async function loadNewsletter() {
      try {
        const response = await fetchNewsletterByEmail(user?.email || "");
        setNewsletter(response);
      } catch (error) {
        Toaster("error", "Failed to fetch newsletter subscriber.");
        console.error("Failed to fetch newsletter subscriber:", error);
      }
    }
    loadNewsletter();
  }, [user]);

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-4 bg-gray-200 rounded w-full"
              style={{ width: `${80 - i * 10}%` }}
            />
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
          <NewsletterSubscriptions newsletter={newsletter} />
        </div>
      </div>

      <Testimonial reviews={TestimonialReview} showPaymentInfo />
    </div>
  );
};

export default NewsletterPage;
