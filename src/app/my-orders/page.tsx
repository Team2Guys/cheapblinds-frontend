import React from "react";
import OrderPage from "./Order";
import { generateMetadata } from "@utils/seoMetadata";
import { metaData } from "@data/meta-data";
export const metadata = generateMetadata(metaData.my_orders);

const page = () => {
  return <OrderPage />;
};

export default page;
