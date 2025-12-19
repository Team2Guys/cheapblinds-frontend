import React from "react";
import NewsletterPage from "./NewsletterPage";
import { generateMetadata } from "@utils/seoMetadata";
import { metaData } from "@data/meta-data";
export const metadata = generateMetadata(metaData.newsletter_subscriptions);

const page = async () => {
  return <NewsletterPage />;
};

export default page;
