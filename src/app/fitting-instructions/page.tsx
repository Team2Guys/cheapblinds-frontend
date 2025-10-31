"use client";

import Instructions from "@components/common";
import BlindFitting from "@components/common/blind-fitting";
import React from "react";
import Breadcrumb from "@components/Layout/breadcrumb";
import ContactBanner from "@components/Home/contact-banner";

const FittinInstructions: React.FC = () => {
  return (
    <>
      <Breadcrumb title="Fitting Instructions" />
      <BlindFitting />
      <div className="container mx-auto px-2">
        <Instructions />
        <ContactBanner />
      </div>
    </>
  );
};

export default FittinInstructions;
