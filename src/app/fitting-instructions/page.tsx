"use client";

import React from "react";
import { Breadcrumb, BlindFitting, Instructions, ContactBanner } from "@/components";
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
