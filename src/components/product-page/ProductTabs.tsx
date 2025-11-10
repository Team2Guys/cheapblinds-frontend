"use client";
import { useState } from "react";
import { Testimonial } from "@components";
import { TestimonialReview } from "@data/detail-page";
export const ProductTabs = () => {
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
          <ul className="list-disc pl-6 space-y-2 lg:max-w-[850px] w-full mx-auto px-2 ">
            <li>
              Fully <span className="font-semibold">Made-to-Measure</span>
            </li>
            <li>54% Polyester, 46% Cotton</li>
            <li>Maximum Width 2600mm. Maximum Height 3000mm</li>
            <li>Minimum Width 300mm, Minimum Height 300mm</li>
            <li>Available in Classic or Cassette headings</li>
            <li>High Quality Sewn finish</li>
            <li>Dry Clean only</li>
          </ul>
        )}

        {activeTab === "additional" && <p>No additional information available.</p>}

        {activeTab === "reviews" && <Testimonial reviews={TestimonialReview} />}

        {activeTab === "guide" && (
          <p>Please refer to our measuring guide for detailed instructions.</p>
        )}
      </div>
    </div>
  );
};
