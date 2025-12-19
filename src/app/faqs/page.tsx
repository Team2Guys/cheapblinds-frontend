import { Breadcrumb, ContactPage, FaqSection } from "@components";
import React from "react";
import { generateMetadata } from "@utils/seoMetadata";
import { metaData } from "@data/meta-data";
export const metadata = generateMetadata(metaData.faqs);

const Faqs = () => {
  return (
    <>
      <Breadcrumb title="FAQs" />
      <FaqSection />
      <ContactPage />
    </>
  );
};

export default Faqs;
