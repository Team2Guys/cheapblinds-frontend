import { RelatedProduct, Testimonial, CartPage } from "@components";
import { TestimonialReview } from "@data/detail-page";
import { Product } from "@/types/category";
import React from "react";
import { queryData } from "@config/fetch";
import { CARD_PRODUCT } from "@graphql";
import ScrollToTop from "@components/common/ScrollToTop";

const Cart = async () => {
  const productList: Product[] = await queryData<Product[]>(CARD_PRODUCT, "productList");
  const publishedProduct = productList?.filter((item: Product) => item?.status === "PUBLISHED");

  return (
    <>
      <ScrollToTop />
      <CartPage />
      <RelatedProduct title="View More Products" data={publishedProduct || []} />
      <Testimonial reviews={TestimonialReview} showPaymentInfo />
    </>
  );
};

export default Cart;
