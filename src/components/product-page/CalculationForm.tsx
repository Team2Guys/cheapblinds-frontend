"use client";
import React, { useState, useEffect } from "react";

interface CalculationProps {
  onValuesChange?: (_values: { width: string; height: string; unit: string }) => void;
}

export const CalculationForm = ({ onValuesChange }: CalculationProps) => {
  const [unit, setUnit] = useState<"mm" | "cm" | "Inches">("cm");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [errors, setErrors] = useState({ width: "", height: "" });

  const unitRanges = {
    mm: { min: 300, maxWidth: 2600, maxHeight: 3000 },
    cm: { min: 30, maxWidth: 260, maxHeight: 300 },
    Inches: { min: 11.8, maxWidth: 102.3, maxHeight: 118.1 },
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
    const { min, maxWidth, maxHeight } = unitRanges[unit];
    const max = field === "width" ? maxWidth : maxHeight;

    if (!value) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
      return;
    }

    if (numValue < min) {
      setErrors((prev) => ({
        ...prev,
        [field]: `Value must be at least ${min} ${unit}.`,
      }));
    } else if (numValue > max) {
      setErrors((prev) => ({
        ...prev,
        [field]: `Value cannot exceed ${max} ${unit}.`,
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            Min: {currentRange.min} {unit} | Max: {currentRange.maxWidth} {unit}
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
            Min: {currentRange.min} {unit} | Max: {currentRange.maxHeight} {unit}
          </p>
          {errors.height && <p className="text-red-500 mt-1">{errors.height}</p>}
        </div>
      </div>
    </>
  );
};
