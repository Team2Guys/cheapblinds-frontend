import React from "react";

import { generateMetadata } from "@utils/seoMetadata";
import { metaData } from "@data/meta-data";
export const metadata = generateMetadata(metaData.measuring_guides);

const MeasuringGuides = () => {
  return (
    <div className="container mx-auto px-2 space-y-5 my-10">
      <h1 className="text-heading">Measuring Guides</h1>
      <div className="space-y-3">
        <h2 className="text-medium">Your Cancellation Rights</h2>
        <p>
          All items are manufactured according to your personal specifications and therefore cannot
          be returned. Refunds can only be issued if the item received is damaged, defective, or
          incorrectly manufactured.
        </p>
        <p>
          Upon receiving your order image confirmation of the damage, defect, or error, we will
          re-make your product free of charge to the original specifications provided and arrange
          the collection of the unwanted item.
        </p>
        <p>Please note:</p>
        <ul className="list-disc px-6">
          <li>No changes can be made to your original specifications at this stage.</li>
          <li>The order cannot be cancelled once production has started.</li>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(MeasuringGuides);
