"use client";
import React, { useState } from "react";
import { Toaster } from "@components";
import { FormSelect } from "./FormSelect";
import { FormProps } from "@/types/type";
import Image from "next/image";
import { controlOptions, headrailOptions } from "@data/detail-page";

export const RollerBlindsForm = ({ values, recessType }: FormProps) => {
  const [headrail, setHeadrail] = useState("Classic");
  const [control, setControl] = useState("Nickel");
  const [chainSide, setChainSide] = useState("Right");

  const handleAddToBasket = () => {
    Toaster(
      "success",
      `Added ${headrail} with ${control} control and chain on ${chainSide} side to basket!`,
    );
  };

  return (
    <div className="p-4 border border-primary rounded-md space-y-6">
      {/* ✅ Dimensions */}
      <h3 className="text-lg font-semibold mb-2 text-primary text-center">
        {values.width}
        {values.unit} width × {values.height}
        {values.unit} drop ({recessType})
      </h3>

      <FormSelect
        title="Headrail Type / Colour"
        helpText="help"
        helpContent={
          <div className="space-y-2">
            <p>
              The headrail is the top section that houses the blind mechanism. Choose “Cassette” for
              a sleek look for remote operation.
            </p>
          </div>
        }
        options={headrailOptions}
        selected={headrail}
        onChange={setHeadrail}
      />

      {/* ✅ Control Options */}
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

      {/* ✅ Chain Side (Special Selector) */}
      <FormSelect
        title="Choose Chain Side"
        helpText="help"
        selected={chainSide}
        onChange={setChainSide}
        isChainSelector
        helpContent={<p>Select which side you want the control chain on.</p>}
      />

      {/* ✅ Price */}
      <div className="text-center mt-4">
        The Price You Pay <span className="font-currency text-xl"></span>
        <span className="font-semibold">299.25</span>
      </div>

      {/* ✅ Add to Basket Button */}
      <button
        onClick={handleAddToBasket}
        className="bg-primary font-semibold w-full py-3 rounded-md text-white hover:bg-primary/90 transition"
      >
        Add to basket
      </button>

      {/* ✅ Payment Logos */}
      <div className="border border-secondary rounded-md p-3 text-center font-semibold flex gap-2 items-center justify-center">
        Pay in 4 interest-free payments with{" "}
        <div className="p-2 rounded-md border bg-white">
          <Image
            className="h-5 w-auto"
            src="/assets/images/payment-icons/tamara-logo.webp"
            alt="Tamara"
            width={50}
            height={50}
          />
        </div>
        <div className="p-2 rounded-md border bg-white">
          <Image
            className="h-5 w-auto"
            src="/assets/images/payment-icons/tabby-logo.webp"
            alt="Tabby"
            width={50}
            height={50}
          />
        </div>
      </div>
    </div>
  );
};
