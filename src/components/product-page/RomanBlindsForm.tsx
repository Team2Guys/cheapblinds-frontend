"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { FormSelect, Toaster } from "@components";
import { FormProps } from "@/types/type";
import { MODAL_CONTENTS } from "@data/detail-page";
// import { useIndexedDb } from "@lib/useIndexedDb";

const TITLE_MAP: Record<string, string> = {
  Finish: "Headrail Type / Colour",
  System: "Headrail Type / Colour",
  Type: "Stacking Style",
  Chain: "Chain Side",
  "Control Side": "Control Side",
};

const CHAIN_LABEL_MAP: Record<string, string> = {
  LHC: "Left",
  RHC: "Right",
};

export const RomanBlindsForm = ({
  values,
  recessType,
  finalPrice,
  optionSections,
  productList,
}: FormProps) => {

  // const { addToCart } = useIndexedDb();

  const initialState: Record<string, string> = {};
  optionSections.forEach((section) => {
    if (section.options?.[0]) initialState[section.title] = section.options[0].code;
  });

  const [selectedOptions, setSelectedOptions] = useState(initialState);

  const dynamicPrice = useMemo(() => {
    if (!optionSections || !selectedOptions) return finalPrice?.TotalSalesAmt || 0;

    const optionsTotal = optionSections.reduce((sum, section) => {
      const selectedCode = selectedOptions[section.title];
      const selectedOpt = section.options?.find((o) => o.code === selectedCode);
      return sum + (selectedOpt?.price || 0);
    }, 0);

    return (finalPrice?.TotalSalesAmt || 0) + optionsTotal;
  }, [selectedOptions, optionSections, finalPrice]);

  const handleChange = (title: string, code: string) => {
    setSelectedOptions((prev) => ({ ...prev, [title]: code }));
  };

  console.log(productList, "productListproductList");
  const handleAddToBasket = () => {
    Toaster(
      "success",
      `Added to basket: ${Object.entries(selectedOptions)
        .map(([title, value]) => {
          // Map chain labels if needed
          const label =
            title === "Chain" || title === "Control Side" ? CHAIN_LABEL_MAP[value] || value : value;
          return `${TITLE_MAP[title] || title}: ${label}`;
        })
        .join(", ")}`,
    );
  };

  return (
    <div className="p-4 border border-primary rounded-md space-y-6">
      <h3 className="text-lg font-semibold mb-2 text-primary text-center">
        {values.width}
        {values.unit} width × {values.drop}
        {values.unit} drop ({recessType})
      </h3>

      {/* Dynamic Sections */}
      {optionSections.map((section) => (
        <FormSelect
          key={section.title}
          title={
            section.title === "Finish"
              ? "Hydreal Type / Colour"
              : section.title === "Chain"
                ? "Chain Side"
                : section.title
          }
          options={section.options?.map((opt) => ({
            id: opt.code,
            label:
              section.title === "Chain" || section.title === "Control Side"
                ? CHAIN_LABEL_MAP[opt.code] || opt.label
                : opt.label,
            price: opt.price,
          }))}
          selected={selectedOptions[section.title]}
          onChange={(val) => handleChange(section.title, val)}
          helpContent={
            MODAL_CONTENTS[
              section.title === "Finish"
                ? "Hydreal Type / Colour"
                : section.title === "Chain"
                  ? "Chain Side"
                  : section.title
            ]
          }
          helpText="help"
        />
      ))}

      {dynamicPrice > 0 && (
        <div className="text-center mt-4">
          The Price You Pay <span className="font-currency text-xl"></span>
          <span className="font-semibold">{dynamicPrice.toFixed(2)}</span>
        </div>
      )}

      <button
        onClick={handleAddToBasket}
        className="bg-primary font-semibold w-full py-3 rounded-md cursor-pointer text-white hover:bg-primary/90"
      >
        Add to basket
      </button>

      {/* Payment Logos */}
      <div className="border border-secondary rounded-md p-3 text-center font-semibold flex gap-2 items-center justify-center">
        Pay in 4 interest-free payments with{" "}
        <div className="p-2 rounded-md border bg-white">
          <Image
            unoptimized
            className="h-5 w-auto"
            src="/assets/images/icon-payment/tamara.webp"
            alt="Tamara"
            width={50}
            height={50}
          />
        </div>
        <div className="p-2 rounded-md border bg-white">
          <Image
            unoptimized
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
};
