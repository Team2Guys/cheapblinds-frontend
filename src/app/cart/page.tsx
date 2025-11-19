import { RelatedProduct, Testimonial, CartPage } from "@components";
import { TestimonialReview } from "@data/detail-page";
import { chooseBlinds } from "@data/home";
import React from "react";

const Cart = () => {
  return (
    <>
      <CartPage />
      <RelatedProduct title="View More Products" data={chooseBlinds} />
      <Testimonial reviews={TestimonialReview} showPaymentInfo />
    </>
  );
};

export default Cart;
