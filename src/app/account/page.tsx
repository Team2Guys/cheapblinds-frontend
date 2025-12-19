import React from "react";
import AccountPage from "./AccountPage";
import { generateMetadata } from "@utils/seoMetadata";
import { metaData } from "@data/meta-data";
export const metadata = generateMetadata(metaData.account);
const Page = async () => {
  return <AccountPage />;
};

export default Page;
