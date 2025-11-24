"use client";
import { useState } from "react";
import { Testimonial } from "@components";
import { TestimonialReview } from "@data/detail-page";

interface productTabsProps {
  description?: string;
  additionalInfo?: Array<{ name: string; detail: string }>;
}
export const ProductTabs = ({ description, additionalInfo }: productTabsProps) => {
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
            <p>{description}</p>
          </ul>
        )}

        {activeTab === "additional" && (
          <div className="lg:max-w-[850px] w-full mx-auto px-2">
            {additionalInfo && additionalInfo.length > 0 ? (
              <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                {/* HEADER */}
                <thead>
                  <tr className="bg-primary text-left">
                    <th className="py-3 px-4 font-semibold w-1/3">Name</th>
                    <th className="py-3 px-4 font-semibold">Detail</th>
                  </tr>
                </thead>

                {/* BODY */}
                <tbody>
                  {additionalInfo.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50 transition-all">
                      <td className="py-3 px-4 font-medium">{item.name}</td>
                      <td className="py-3 px-4">{item.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No additional information available.</p>
            )}
          </div>
        )}

        {activeTab === "reviews" && <Testimonial reviews={TestimonialReview} />}

        {activeTab === "guide" && (
          <div className="lg:max-w-[850px] w-full mx-auto px-2">
            <p>Please refer to our measuring guide for detailed instructions.</p>
          </div>
        )}
      </div>
    </div>
  );
};
