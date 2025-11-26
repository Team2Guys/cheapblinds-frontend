"use client";
import { useState } from "react";
import { Testimonial } from "@components";
import { TestimonialReview } from "@data/detail-page";
import { decodeHtml } from "@utils/helperFunctions";

interface productTabsProps {
  description?: string;
  additionalInfo?: string;
  measuringGuide?: string;
}
export const ProductTabs = ({ description, additionalInfo, measuringGuide }: productTabsProps) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "DESCRIPTION" },
    { id: "additional", label: "ADDITIONAL INFORMATION" },
    { id: "reviews", label: "REVIEWS" },
    { id: "guide", label: "MEASURING GUIDE" },
  ];

  return (
    <div>
      <div className="overflow-x-auto lg:max-w-[850px] w-full mx-auto px-2 ">
        <div className="flex flex-nowrap gap-4 min-w-[800px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 px-2 font-medium text-xl font-rubik tracking-wide transition-colors duration-200 ${
                activeTab === tab.id
                  ? "border-b-2 border-black text-black"
                  : "border-b-2 border-transparent hover:border-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 text-xl ">
        {activeTab === "description" && (
          <ul className="space-y-2 lg:max-w-[850px] w-full mx-auto px-2 ">
            <div
              dangerouslySetInnerHTML={{
                __html: decodeHtml(description || ""),
              }}
            />
          </ul>
        )}

        {activeTab === "additional" && (
          <div className="lg:max-w-[850px] w-full mx-auto px-2">
            {additionalInfo && additionalInfo.length > 0 ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(additionalInfo),
                }}
              />
            ) : (
              <p>No additional information available.</p>
            )}
          </div>
        )}

        {activeTab === "reviews" && <Testimonial reviews={TestimonialReview} />}

        {activeTab === "guide" && (
          <div className="lg:max-w-[850px] w-full mx-auto px-2">
            {measuringGuide && measuringGuide.length > 0 ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(measuringGuide),
                }}
              />
            ) : (
              <p>No additional information available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
