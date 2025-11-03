import CartPage from "@/components/Cart/CartPage";
import RelatedProduct from "@/components/common/related-product";
import Testimonial from "@/components/common/Testimonial";
import { TestimonialReview } from "@/data/detail-page";
import { chooseblinds } from "@/data/home";
import Image from "next/image";
import React from "react";

const Cart = () => {
  return (
    <>
      <CartPage />
      <RelatedProduct title="View More Products" data={chooseblinds} />
      <div className="px-2 container mx-auto">
        <div className=" bg-primary rounded-lg p-2 flex flex-wrap md:flex-nowrap gap-4 my-10 max-md:justify-center">
          <p className="md:text-[30px] font-semibold font-rubik">
            Pay in 4 interest-free payments with
          </p>
          <Image
            src="/assets/images/cart/tabby.png"
            className=" w-20 h-9 md:w-28 md:h-11 rounded-xl"
            alt="tabby"
            width={200}
            height={200}
          />
          <Image
            src="/assets/images/cart/tamara.png"
            className=" w-20 h-9 md:w-28 md:h-11 rounded-xl"
            alt="tamara"
            width={200}
            height={200}
          />
        </div>
        <Testimonial reviews={TestimonialReview} />
      </div>
    </>
  );
};

export default Cart;
