import { SelectOptionProps } from "@/types/cart";
import React from "react";

export const SelectOption = ({
  selected,
  setSelected,
  className,
  CartOptions,
}: SelectOptionProps) => {
  return (
    <div className={`flex gap-1 md:gap-3 ${className}`}>
      {CartOptions.map((option) => (
        <div key={option.id} className="space-y-2 relative overflow-visible h-auto">
          {option.id === "Moterised" && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 border border-black bg-primary text-black font-semibold px-2 py-0.5 rounded-md z-10">
              Moterised
            </div>
          )}
          <div
            onClick={() => setSelected(option.id)}
            className="rounded-xl px-2 py-2 md:p-4 cursor-pointer transition-all  border-2 border-primary"
          >
            <div className="text-sm md:text-base font-semibold text-primary mt-2">
              {option.title}
            </div>

            <ul className="text-xs mt-2 list-disc ml-4 space-y-1">
              {option.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>

            <div
              className={`rounded-md mt-2 text-center py-2 text-sm md:text-base font-semibold ${
                selected === option.id ? "bg-primary text-black" : "border border-primary"
              }`}
            >
              Price: <span className="font-currency text-lg md:text-2xl font-normal"></span>
              {option.price}
            </div>
          </div>

          <div
            className={`rounded-full w-5 h-5 border-2 border-primary mx-auto transition-colors ${
              selected === option.id ? "bg-black" : "bg-white"
            }`}
          />
        </div>
      ))}
    </div>
  );
};
