"use client";
import React, { useState, useEffect } from "react";

interface CalculationProps {
  onValuesChange?: (_values: { width: string; height: string; unit: string }) => void;
  minHeight?: number | undefined;
  maxHeight?: number | undefined;
  minWidth?: number | undefined;
  maxWidth?: number | undefined;
}

export const CalculationForm = ({
  onValuesChange,
  minHeight = 0,
  maxHeight = 0,
  minWidth = 0,
  maxWidth = 0,
}: CalculationProps) => {
  const [unit, setUnit] = useState<"mm" | "cm" | "Inches">("mm");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [errors, setErrors] = useState({ width: "", height: "" });

  const unitRanges = {
    mm: { minWidth, maxWidth, minHeight, maxHeight },
    cm: {
      minWidth: minWidth / 10,
      maxWidth: maxWidth / 10,
      minHeight: minHeight / 10,
      maxHeight: maxHeight / 10,
    },
    Inches: {
      minWidth: minWidth / 25.4,
      maxWidth: maxWidth / 25.4,
      minHeight: minHeight / 25.4,
      maxHeight: maxHeight / 25.4,
    },
  };

  const handleUnitChange = (value: "mm" | "cm" | "Inches") => {
    setUnit(value);
    setErrors({ width: "", height: "" });
    setWidth("");
    setHeight("");
  };

  const handleNumericInput = (value: string) => {
    return value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  };

const validateValue = (field: "width" | "height", value: string) => {
  const numValue = Number(value);
  const { minWidth, maxWidth, minHeight, maxHeight } = unitRanges[unit];
  const min = field === "width" ? minWidth : minHeight;
  const max = field === "width" ? maxWidth : maxHeight;

  if (!value) {
    setErrors((prev) => ({ ...prev, [field]: "" }));
    return;
  }

  const format = (v: number) => (unit === "Inches" ? v.toFixed(1) : v);

  if (numValue < min) {
    setErrors((prev) => ({
      ...prev,
      [field]: `Value must be at least ${format(min)} ${unit}.`,
    }));
  } else if (numValue > max) {
    setErrors((prev) => ({
      ...prev,
      [field]: `Value cannot exceed ${format(max)} ${unit}.`,
    }));
  } else {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }
};


  useEffect(() => {
    onValuesChange?.({ width, height, unit });
  }, [width, height, unit, onValuesChange]);

  const currentRange = unitRanges[unit];

  return (
    <>
      <div className="flex items-center justify-between mx-auto max-w-sm">
        {["mm", "cm", "Inches"].map((u) => (
          <label key={u} className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="unit"
              value={u}
              checked={unit === u}
              onChange={() => handleUnitChange(u as "mm" | "cm" | "Inches")}
              className="hidden"
            />
            <span className="w-5 h-5 rounded-full border-4 flex items-center justify-center transition-all duration-200 border-secondary">
              {unit === u && <span className="w-2.5 h-2.5 bg-primary rounded-full" />}
            </span>
            <span>{u}</span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        <div>
          <label className="block mb-1">Width ({unit})</label>
          <input
            type="text"
            value={width}
            onChange={(e) => {
              const numericValue = handleNumericInput(e.target.value);
              setWidth(numericValue);
              validateValue("width", numericValue);
            }}
            className={`w-full border rounded-md p-2 h-12 focus:outline-none focus:ring-1 ${
              errors.width
                ? "border-red-400 focus:ring-red-400"
                : "border-secondary focus:ring-primary"
            }`}
            placeholder={`Enter width in ${unit}`}
          />
          <p className="mt-1 text-sm text-gray-500">
            Min: {unit === "Inches" ? currentRange.minWidth.toFixed(1) : currentRange.minWidth}{" "}
            {unit} | Max:{" "}
            {unit === "Inches" ? currentRange.maxWidth.toFixed(1) : currentRange.maxWidth} {unit}
          </p>
          {errors.width && <p className="text-red-500 mt-1">{errors.width}</p>}
        </div>

        <div>
          <label className="block mb-1">Height ({unit})</label>
          <input
            type="text"
            value={height}
            onChange={(e) => {
              const numericValue = handleNumericInput(e.target.value);
              setHeight(numericValue);
              validateValue("height", numericValue);
            }}
            className={`w-full border rounded-md p-2 h-12 focus:outline-none focus:ring-1 ${
              errors.height
                ? "border-red-400 focus:ring-red-400"
                : "border-secondary focus:ring-primary"
            }`}
            placeholder={`Enter height in ${unit}`}
          />
          <p className="mt-1 text-sm text-gray-500">
            Min: {unit === "Inches" ? currentRange.minHeight.toFixed(1) : currentRange.minHeight}{" "}
            {unit} | Max:{" "}
            {unit === "Inches" ? currentRange.maxHeight.toFixed(1) : currentRange.maxHeight} {unit}
          </p>
          {errors.height && <p className="text-red-500 mt-1">{errors.height}</p>}
        </div>
      </div>
    </>
  );
};
