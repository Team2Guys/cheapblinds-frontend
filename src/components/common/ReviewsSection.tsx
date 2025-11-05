import React from "react";
import { IoStarSharp } from "react-icons/io5";

export const ReviewsSection = () => {
  return (
    <div className="bg-primary text-black py-2">
      <div className="flex items-center justify-center gap-2 text-sm">
        <span className="hidden md:block">Our customers say</span>
        <span className="font-bold text-base">Excellent</span>
        <div className="flex gap-1 items-center">
          {[...Array(5)].map((_, index) => (
            <div className="bg-white p-0.5" key={index} data-testid="review-star">
              <IoStarSharp className="text-lg text-primary" />
            </div>
          ))}
        </div>
        <span className="hidden md:block">4.7 out of 5 based on 84,290 reviews</span>
      </div>
    </div>
  );
};
