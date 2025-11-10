"use server";
import { Testimonial, AccountTabs } from "@components";
import { TestimonialReview } from "@data/detail-page";
import React from "react";

const Page = async () => {
  return (
    <>
      <AccountTabs />
      <Testimonial reviews={TestimonialReview} showPaymentInfo />
    </>
  );
};

export default Page;
