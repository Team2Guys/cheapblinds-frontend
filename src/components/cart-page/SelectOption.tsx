"use client";

import { CartItems } from "@/types/category";
import Link from "next/link";
import React, { useMemo } from "react";

export interface SelectOptionProps {
  className?: string;
  cartData?: CartItems;
  updateMotorized?: (_id: string, _isMotorized: boolean) => Promise<void>;
}

// Type guard to filter out non-string/null/undefined values
function isString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

export const SelectOption = ({ className, cartData, updateMotorized }: SelectOptionProps) => {
  const {
    id,
    name,
    width,
    drop,
    unit,
    recessType,
    options,
    isMotorized,
    motorPrice = 0,
    subPrice = 0,
    productUrl,
  } = cartData || {};

  /** ---------- BASE OPTIONS (COMMON) ---------- */
  const commonOptions = useMemo(
    () =>
      cartData
        ? [
            `${width}${unit} Width x ${drop}${unit} Drop`,
            recessType ? `${recessType} recess` : null,
            options?.headrailType,
            options?.stackingStyle,
            options?.lining,
          ].filter(isString)
        : [],
    [cartData, width, drop, unit, recessType, options],
  );

  /** ---------- NON-MOTORISED ONLY ---------- */
  const nonMotorOptions = useMemo(
    () =>
      [
        ...commonOptions,
        options?.chainSide,
        options?.chainControl ? `${options.chainControl} Control` : null,
      ].filter(isString),
    [commonOptions, options],
  );

  const motorizedPrice = useMemo(() => subPrice + motorPrice, [subPrice, motorPrice]);

  const OptionCard = ({
    motorized,
    price,
    label,
    optionList,
  }: {
    motorized: boolean;
    price: number;
    label?: string;
    optionList: string[];
  }) => {
    const active = motorized === isMotorized;

    return (
      <div className="space-y-2 relative overflow-visible h-full flex flex-col">
        {label && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 border border-black bg-primary text-black font-semibold px-2 py-0.5 rounded-md z-10">
            {label}
          </div>
        )}
        <div
          onClick={() => updateMotorized?.(String(id), motorized)}
          className={`rounded-xl px-2 py-2 md:p-4 cursor-pointer transition-all border-2 flex flex-col justify-between h-full
          ${active ? "border-black bg-primary-light" : "border-primary"}
        `}
        >
          <div>
            <Link
              href={productUrl ?? "/"}
              className="text-sm md:text-base font-semibold text-primary mt-2 block"
            >
              {name}
            </Link>

            <ul className="text-xs mt-2 list-disc ml-4 space-y-1 capitalize">
              {optionList.map((opt, i) => (
                <li key={i}>{opt}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-md mt-2 text-center py-2 text-sm md:text-base font-semibold bg-primary text-black">
            Price: <span className="font-currency text-lg md:text-xl font-normal"></span>
            {price.toFixed(2)}
          </div>
        </div>

        {/* Always at bottom */}
        <div
          className={`rounded-full w-5 h-5 border-2 mx-auto mt-2 transition-colors
        ${active ? "bg-black border-black" : "border-primary"}
      `}
        />
      </div>
    );
  };

  return (
    <div className={`flex gap-1 md:gap-3 ${className} items-stretch`}>
      {/* WITHOUT MOTOR */}
      <OptionCard motorized={false} price={subPrice} optionList={nonMotorOptions} />

      {/* MOTORISED (chain options hidden) */}
      <OptionCard motorized price={motorizedPrice} label="Motorised" optionList={commonOptions} />
    </div>
  );
};
