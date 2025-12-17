import Link from "next/link";
import React from "react";

const RefundRefunds = () => {
  return (
    <div className="container mx-auto px-2 space-y-5 my-10">
      <h1 className="text-heading">Returns & Refunds</h1>
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
      <div className="space-y-3">
        <h3 className="text-medium">Damaged on Arrival</h3>
        <p>
          If your product appears clearly damaged upon arrival, do not open the package immediately.
          Please take clear images of the damaged exterior box. Then, open the box to check if the
          product inside is also damaged. If it is, please take a clear image of the product damage
          and send this, along with your order number, to our customer service team within 7 days of
          delivery.
        </p>
      </div>
      <div className="space-y-3">
        <h3 className="text-medium">Incorrectly Made</h3>
        <p>
          If the blind has not arrived at the correct size, please first verify that the
          measurements were input correctly on your original order form.
        </p>
        <ul className="list-disc px-6">
          <li>
            Please note: Selecting &apos;Recess&apos;{" "}
            <Link className="text-primary underline" href="/measuring-guides">
              measurement
            </Link>{" "}
            for blinds will automatically reduce the blind&apos;s width by 10mm. Curtain drop
            measurements have a standard manufacturing tolerance of 20mm.
          </li>
        </ul>
        <p>
          If you believe the product measurements are incorrect, please take a clear image that
          shows the incorrect measurement with a tape measure clearly in the shot against the
          product. We require a full image showing the entire product and the measurement. Send
          this, along with your order number, to our customer service team within 7 days of
          delivery.
        </p>
      </div>
      <div className="space-y-3">
        <h3 className="text-medium">Defect</h3>
        <p>
          If your product has a defect, please take a clear image of the issue and send it to our
          customer service team within 7 days of delivery.
        </p>
      </div>
      <div className="space-y-3">
        <h3 className="text-medium">Refunds</h3>
        <p>
          When processing a refund (for an approved return or cancellation), we will refund the same
          card originally used to pay for the order. Refunds can take 7 to 10 days to process from
          the day the request has been approved by our online customer care team.
        </p>
      </div>
      <div className="space-y-3">
        <h3 className="text-medium font-semibold">Note</h3>
        <ul className="list-disc px-6">
          <li>
            Please note there may be a minor difference in fabric colour between the images
            displayed online and the actual product. This is typically caused by variations in
            screen calibrations and resolutions across different monitors.
          </li>
          <li>
            Product colour may slightly vary due to photographic lighting sources or your individual
            monitor settings.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RefundRefunds;
