"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { FormSelect } from "@components";
import { FormProps } from "@/types/type";
import { MODAL_CONTENTS } from "@data/detail-page";
import { useIndexedDb } from "@lib/useIndexedDb";

type Option = {
  code: string;
  label: string;
  price?: number;
};

const OPTION_KEY_MAP: Record<string, keyof NonNullable<FormProps["productList"]>["options"]> = {
  Finish: "headrailType",
  System: "headrailType",
  Type: "stackingStyle",
  "Lining Type": "lining",
  Chain: "chainSide",
  "Control Side": "chainControl",
};

const CHAIN_LABEL_MAP: Record<string, string> = {
  LHC: "Left",
  RHC: "Right",
};

// Helper to map section title to display label
const getSectionLabel = (title: string) => {
  switch (title) {
    case "Finish":
    case "System":
      return "Hydreal Type / Colour";
    case "Type":
      return "Stacking Style";
    case "Chain":
      return "Chain Side";
    default:
      return title;
  }
};

// Helper to get selected option label
const getOptionLabel = (sectionTitle: string, code: string, options: Option[]) => {
  const opt = options.find((o) => o.code === code);
  if (!opt) return undefined;

  if (sectionTitle === "Chain" || sectionTitle === "Control Side") {
    return CHAIN_LABEL_MAP[opt.code] || opt.label;
  }
  return opt.label;
};

export const RomanBlindsForm = ({
  values,
  recessType,
  finalPrice,
  optionSections,
  productList,
  setDynamicPrice,
}: FormProps) => {
  const { addToCart } = useIndexedDb();

  // Initialize selected options with first option of each section
  const initialSelectedOptions = useMemo(() => {
    const state: Record<string, string> = {};
    optionSections.forEach((section) => {
      if (section.options?.[0]) state[section.title] = section.options[0].code;
    });
    return state;
  }, [optionSections]);

  const [selectedOptions, setSelectedOptions] = useState(initialSelectedOptions);

  // Calculate dynamic price
  const dynamicPrice = useMemo(() => {
    const basePrice = finalPrice?.TotalSalesAmt || 0;
    const optionsTotal = optionSections.reduce((sum, section) => {
      const code = selectedOptions[section.title];
      const opt = section.options?.find((o) => o.code === code);
      return sum + (opt?.price || 0);
    }, 0);

    const total = basePrice + optionsTotal;

    // Pass to parent
    if (setDynamicPrice) setDynamicPrice(total);

    return total;
  }, [selectedOptions, optionSections, finalPrice]);
  const handleChange = (title: string, code: string) => {
    setSelectedOptions((prev) => ({ ...prev, [title]: code }));
  };

  const handleAddToCart = () => {
    const selectedOptionsForCart: Record<string, string> = {};

    optionSections.forEach((section) => {
      const optionKey = OPTION_KEY_MAP[section.title];
      if (optionKey && selectedOptions[section.title]) {
        const label = getOptionLabel(
          section.title,
          selectedOptions[section.title],
          section.options || [],
        );
        if (label) selectedOptionsForCart[optionKey as string] = label;
      }
    });

    addToCart(productList, {
      subPrice: dynamicPrice,
      width: values.width!,
      drop: values.drop!,
      unit: values.unit!,
      recessType: recessType,
      options: selectedOptionsForCart,
    });
  };

  return (
    <div className="p-4 border border-primary rounded-md space-y-6">
      {/* Header */}
      <h3 className="text-lg font-semibold mb-2 text-primary text-center">
        {values.width}
        {values.unit} width × {values.drop}
        {values.unit} drop ({recessType})
      </h3>

      {/* Option Sections */}
      {optionSections.map((section) => (
        <FormSelect
          key={section.title}
          title={getSectionLabel(section.title)}
          options={section.options?.map((opt) => ({
            id: opt.code,
            label:
              getOptionLabel(section.title, opt.code, section.options || []) ?? opt.label ?? "",
            price: opt.price,
          }))}
          selected={selectedOptions[section.title]}
          onChange={(val) => handleChange(section.title, val)}
          helpContent={MODAL_CONTENTS[getSectionLabel(section.title)]}
          helpText="help"
        />
      ))}

      {/* Price */}
      {dynamicPrice > 0 && (
        <div className="text-center mt-4">
          The Price You Pay <span className="font-currency text-xl"></span>
          <span className="font-semibold">{dynamicPrice.toFixed(2)}</span>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="bg-primary font-semibold w-full py-3 rounded-md cursor-pointer text-white hover:bg-primary/90"
      >
        Add to basket
      </button>

      {/* Payment Logos */}
      <div className="border border-secondary rounded-md p-3 text-center font-semibold flex gap-2 items-center justify-center">
        Pay in 4 interest-free payments with
        {["tamara", "tabby"].map((name) => (
          <div key={name} className="p-2 rounded-md border bg-white">
            <Image
              unoptimized
              className="h-5 w-auto"
              src={`/assets/images/icon-payment/${name}.webp`}
              alt={name.charAt(0).toUpperCase() + name.slice(1)}
              width={50}
              height={50}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
