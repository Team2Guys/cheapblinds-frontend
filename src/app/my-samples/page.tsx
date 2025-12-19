import React from "react";
import MySamplePage from "./MySamplePage";
import { generateMetadata } from "@utils/seoMetadata";
import { metaData } from "@data/meta-data";
export const metadata = generateMetadata(metaData.my_samples);

const page = () => {
  return <MySamplePage />;
};

export default page;
