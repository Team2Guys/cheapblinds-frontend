import React from "react";
import { FreeSamplePage } from "./FreeSamplePage";

import { generateMetadata } from "@utils/seoMetadata";
import { metaData } from "@data/meta-data";
export const metadata = generateMetadata(metaData.free_sample);

const page = () => {
  return <FreeSamplePage />;
};

export default page;
