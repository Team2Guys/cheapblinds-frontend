import CartPage from "@/components/Cart/CartPage";
import { RelatedProduct, Testimonial } from "@/components";
import { TestimonialReview } from "@/data/detail-page";
import { chooseblinds } from "@/data/home";
import React from "react";

const Cart = () => {
  return (
    <>
      <CartPage />
      <RelatedProduct title="View More Products" data={chooseblinds} />
      <Testimonial reviews={TestimonialReview} showPaymentInfo />
    </>
  );
};

export default Cart;
