import Herobanner from "@components/common/hero-banner";
import React from "react";
import Breadcrumb from "@components/Layout/breadcrumb";
import { ContactHelp } from "@/components/contact/ContactHelp";
import { ContactPage } from "@/components/contact/ContactPage";

const page = () => {
  return (
    <>
      <Breadcrumb title="Contact Us" />
      <div className="bg-primary-light">
        <Herobanner
          desktopImage="/assets/images/callbanner.webp"
          mobileImage="/assets/images/callbannermobile.webp"
          className="container mx-auto h-[300px] lg:h-[350px]"
        />
      </div>
      <ContactHelp />
      <ContactPage IsHide />
      <div className="px-2">
        <Herobanner
          desktopImage="/assets/images/home/free-order/freeorder.webp"
          mobileImage="/assets/images/home/free-order/freeorder-mobile-new.png"
          className="container mx-auto h-[400px] md:h-auto md:max-h-[500px]"
        />
        <Herobanner
          desktopImage="/assets/images/home/payment.jpg"
          className="container mx-auto h-auto md:max-h-[500px] mt-10 md:mt-16"
        />
      </div>
    </>
  );
};

export default page;
