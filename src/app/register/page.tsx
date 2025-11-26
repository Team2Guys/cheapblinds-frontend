import React from "react";
import { TestimonialReview } from "@data/detail-page";
import { Breadcrumb, RegisterForm, Testimonial } from "@components";

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
