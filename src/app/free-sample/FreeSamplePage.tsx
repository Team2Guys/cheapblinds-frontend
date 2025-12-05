"use client";

import { Banner, Breadcrumb, AllSample, SampleCheckout } from "@components";
import { useAuth } from "@context/UserContext";
import { useIndexedDb } from "@lib/useIndexedDb";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const FreeSamplePage = () => {
  const { freeSamples, removeFreeSampleItem } = useIndexedDb();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

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
    <>
      <Breadcrumb title="Free Sample" />
      <div className="container mx-auto px-2 my-10 space-y-10">
        <div className="flex flex-wrap md:flex-nowrap gap-4">
          <div className="w-full md:w-8/12 2xl:w-6/12">
            <Banner />
          </div>
          <div className="w-full md:w-4/12 2xl:w-6/12"></div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-4">
          <div className="w-full md:w-8/12 2xl:w-6/12 space-y-4">
            <div className="bg-primary p-2 rounded-md">
              <p className="font-semibold">Unlimited Sample - Free Charge</p>
            </div>
            <AllSample freeSamplesList={freeSamples} removeItem={removeFreeSampleItem} />
          </div>

          <div className="w-full md:w-4/12 2xl:w-6/12">
            <SampleCheckout freeSamplesList={freeSamples} />
          </div>
        </div>
      </div>
    </>
  );
};
