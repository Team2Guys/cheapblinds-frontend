import { Breadcrumb, AboutInformation, InformationSection, Testimonial } from "@components";
import { TestimonialReview } from "@data/detail-page";
import React from "react";
import { generateMetadata } from "@utils/seoMetadata";
import { metaData } from "@data/meta-data";
export const metadata = generateMetadata(metaData.about);

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
