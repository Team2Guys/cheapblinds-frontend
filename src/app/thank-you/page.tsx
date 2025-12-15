import { RelatedProduct } from "@components";
import { AllOrders } from "@components/thank-you/Orders";
import { fetchProducts } from "@config/fetch";
import { GET_CARD_PRODUCT } from "@graphql";
import { Product } from "@/types/category";
import Link from "next/link";
import React, { Suspense } from "react";
import { FaArrowLeft } from "react-icons/fa6";

const ThankYou = async () => {
  const productList = await fetchProducts(GET_CARD_PRODUCT);
  const publishedProduct = productList?.filter((item: Product) => item?.status === "PUBLISHED");

  return (
    <div className="container mx-auto px-2 my-10 space-y-5">
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <h1 className="text-heading">Thank You!</h1>
        <p>
          Say thanks, confirm the payment, provide the order ID and mention that the order
          confirmation email has been sent.
        </p>
        <Link
          href="/"
          className="bg-primary hover:bg-primary/90 font-semibold rounded-lg text-center p-3 flex justify-center items-center gap-2 w-fit mx-auto"
        >
          <span className="bg-white rounded-full p-1">
            <FaArrowLeft size={20} />
          </span>
          Continue Shopping
        </Link>
        <Link href="/return-policy" className="underline block">
          Read about our return policy.
        </Link>
      </div>
      <Suspense fallback={<div>Loading order details...</div>}>
        <AllOrders />
      </Suspense>
      <RelatedProduct title="Browse Products" data={publishedProduct || []} />
    </div>
  );
};

export default ThankYou;
