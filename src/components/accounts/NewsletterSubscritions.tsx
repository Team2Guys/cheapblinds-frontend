import React from "react";

export const NewsletterSubscritions = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Newsletter Subscriptions</h2>

      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" className="w-5 h-5 accent-primary cursor-pointer" />
        <span>General Subscription</span>
      </label>

      <button className="font-semibold p-2 bg-primary hover:bg-primary/90 text-white rounded-md">
        Save
      </button>
    </div>
  );
};
