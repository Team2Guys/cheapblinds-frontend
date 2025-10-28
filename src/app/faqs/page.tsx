import Contact from "components/contact/contact";
import Breadcrumb from "components/Layout/breadcrumb";

import FaqSection from "components/userComponent/faqs";
import React from "react";

const page = () => {
  return (
    <>
      <Breadcrumb title="FAQs" />
      <FaqSection />
      <Contact />
    </>
  );
};

export default page;
