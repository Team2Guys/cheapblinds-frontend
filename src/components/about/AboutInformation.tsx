import { aboutSections } from "@data/about";
import { AboutSectionProps } from "@/types/about";
import Image from "next/image";
import React from "react";

const AboutSection = ({ title, description, image, reverse = false }: AboutSectionProps) => {
  return (
    <div className={`grid md:grid-cols-2 items-center ${reverse ? "md:flex-row-reverse" : ""}`}>
      <div
        className={`relative w-full aspect-4/3 overflow-hidden shadow-md ${
          reverse ? "order-1 md:order-2" : ""
        }`}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center"
          fetchPriority="high"
          quality={100}
          priority
        />
      </div>
      <div
        className={`bg-white shadow-sm p-3 md:p-8 space-y-3 text-sm xl:text-base ${
          reverse ? "order-2 md:order-1" : ""
        }`}
      >
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        {description.map((text, i) => (
          <p key={i} className="leading-relaxed">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export const AboutInformation = React.memo(() => {
  return (
    <div className="bg-primary-light py-12">
      <div className="container mx-auto px-2 space-y-16">
        {aboutSections.map((section, index) => (
          <AboutSection key={index} {...section} />
        ))}
      </div>
    </div>
  );
});
