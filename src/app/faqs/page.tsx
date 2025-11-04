import { ContactPage } from "@/components/contact/ContactPage";
import Breadcrumb from "@components/Layout/breadcrumb";
import FaqSection from "@components/userComponent/faqs";
import React from "react";

const page = () => {
  return (
    <>
      <Breadcrumb title="FAQs" />
      <FaqSection />
      <ContactPage />
    </>
  );
};

export default page;
