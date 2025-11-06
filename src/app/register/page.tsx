import { Breadcrumb, RegisterForm, Testimonial } from "@components";
import { TestimonialReview } from "@data/detail-page";
import React from "react";

const page = () => {
  return (
    <>
      <Breadcrumb title="Register" />
      <RegisterForm />
      <Testimonial reviews={TestimonialReview} showPaymentInfo />
    </>
  );
};

export default page;
