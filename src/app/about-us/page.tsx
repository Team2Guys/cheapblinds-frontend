import { Breadcrumb, AboutInformation, InformationSection, Testimonial } from "@components";
import { TestimonialReview } from "@data/detail-page";
import React from "react";

const AboutUs = () => {
  return (
    <div className="space-y-10">
      <Breadcrumb title="About Us" />
      <AboutInformation />
      <InformationSection />
      <Testimonial reviews={TestimonialReview} showPaymentInfo />
    </div>
  );
};

export default AboutUs;
