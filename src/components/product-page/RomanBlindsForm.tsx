"use client";
import { FormProps } from "@/types/type";
import Image from "next/image";
import React, { useState } from "react";
import { FormSelect } from "@components";
import { Toaster } from "@components";
import { controlOptions, headrailOptions, Lining, StackingStyle } from "@data/detail-page";

export const RomanBlindsForm = React.memo(
  ({ values, recessType, finalPrice, categorySlug }: FormProps) => {
    const [headrail, setHeadrail] = useState("Classic");
    const [stackingStyle, setStackingStyle] = useState("Cascade");
    const [lining, setLining] = useState("Polycotton");
    const [control, setControl] = useState("Nickel");
    const [chainSide, setChainSide] = useState("Right");

    const handleAddToBasket = () => {
      Toaster(
        "success",
        `Added ${headrail} (${stackingStyle}) with ${control} control and chain on ${chainSide} side to basket!`,
      );
    };

    return (
      <div className="p-4 border border-primary rounded-md space-y-6">
        {/* ✅ Title */}
        <h3 className="text-lg font-semibold mb-2 text-primary text-center">
          {values.width}
          {values.unit} width × {values.drop}
          {values.unit} drop ({recessType})
        </h3>
        <p>TotalSalesAmt : {finalPrice?.TotalSalesAmt}</p>

        {/* ✅ Headrail */}
        <FormSelect
          title="Headrail Type / Colour"
          helpText="help"
          helpContent={
            <div className="space-y-2">
              <p>
                The headrail is the top section that houses the blind mechanism. Choose “Cassette”
                for a sleek look for remote operation.
              </p>
            </div>
          }
          options={headrailOptions}
          selected={headrail}
          onChange={setHeadrail}
        />

        {categorySlug === "roman-blinds" && (
          <>
            <FormSelect
              title="Stacking Style"
              helpText="help"
              helpContent={
                <div className="space-y-2">
                  <p>
                    Stacking Style determines how the fabric folds when raised. Choose based on your
                    room style and preference.
                  </p>
                </div>
              }
              options={StackingStyle}
              selected={stackingStyle}
              onChange={setStackingStyle}
            />

            <FormSelect
              title="Lining"
              helpText="help"
              helpContent={
                <div className="space-y-2">
                  <p>
                    Lining affects light control and insulation. Choose blackout or thermal lining
                    for better light blocking and warmth.
                  </p>
                </div>
              }
              options={Lining}
              selected={lining}
              onChange={setLining}
            />
          </>
        )}

        <FormSelect
          title="Control Options"
          helpText="help"
          helpContent={
            <p>
              Control options define how you operate your blinds. Nickel and Brass offer premium
              finishes, while White and Black are standard.
            </p>
          }
          options={controlOptions}
          selected={control}
          onChange={setControl}
        />

        {/* ✅ Chain Side (Custom selector using boolean) */}
        <FormSelect
          title="Choose Chain Side"
          helpText="help"
          selected={chainSide}
          onChange={setChainSide}
          isChainSelector
          helpContent={<p>Select which side you want the control chain on.</p>}
        />

        {/* ✅ Price Display */}
        <div className="text-center mt-4">
          The Price You Pay <span className="font-currency text-xl"></span>
          <span className="font-semibold">{finalPrice?.TotalSalesAmt}</span>
        </div>

        {/* ✅ Add to Basket Button */}
        <button
          onClick={handleAddToBasket}
          className="bg-primary font-semibold w-full py-3 rounded-md cursor-pointer text-white hover:bg-primary/90"
        >
          Add to basket
        </button>

        {/* ✅ Payment Logos */}
        <div className="border border-secondary rounded-md p-3 text-center font-semibold flex gap-2 items-center justify-center">
          Pay in 4 interest-free payments with{" "}
          <div className="p-2 rounded-md border bg-white">
            <Image
              className="h-5 w-auto"
              src="/assets/images/icon-payment/tamara.webp"
              alt="Tamara"
              width={50}
              height={50}
            />
          </div>
          <div className="p-2 rounded-md border bg-white">
            <Image
              className="h-5 w-auto"
              src="/assets/images/icon-payment/tabby.webp"
              alt="Tabby"
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>
    );
  },
);
