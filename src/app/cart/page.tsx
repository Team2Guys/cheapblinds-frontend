import { RelatedProduct, Testimonial, CartPage } from "@components";
import { fetchProducts } from "@config/fetch";
import { TestimonialReview } from "@data/detail-page";
import { GET_CARD_PRODUCT } from "@graphql";
import React from "react";

const Cart = async () => {
  const productList = await fetchProducts(GET_CARD_PRODUCT);
  return (
    <>
      <CartPage />
      <RelatedProduct title="View More Products" data={productList} />
      <Testimonial reviews={TestimonialReview} showPaymentInfo />
    </>
  );
};

export default Cart;
