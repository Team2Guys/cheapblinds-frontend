"use client";
import React, { useState, useEffect } from "react";

interface CalculationProps {
  onValuesChange?: (_values: { width: string; drop: string; unit: string }) => void;
  minDrop?: number | undefined;
  maxDrop?: number | undefined;
  minWidth?: number | undefined;
  maxWidth?: number | undefined;
}

export const CalculationForm = ({
  onValuesChange,
  minDrop = 0,
  maxDrop = 0,
  minWidth = 0,
  maxWidth = 0,
}: CalculationProps) => {
  const [unit, setUnit] = useState<"mm" | "cm" | "Inches">("cm");
  const [width, setWidth] = useState("");
  const [drop, setDrop] = useState("");
  const [errors, setErrors] = useState({ width: "", drop: "" });

  const unitRanges = {
    mm: { minWidth, maxWidth, minDrop, maxDrop },
    cm: {
      minWidth: minWidth / 10,
      maxWidth: maxWidth / 10,
      minDrop: minDrop / 10,
      maxDrop: maxDrop / 10,
    },
    Inches: {
      minWidth: minWidth / 25.4,
      maxWidth: maxWidth / 25.4,
      minDrop: minDrop / 25.4,
      maxDrop: maxDrop / 25.4,
    },
  };

  const handleUnitChange = (value: "mm" | "cm" | "Inches") => {
    setUnit(value);
    setErrors({ width: "", drop: "" });
    setWidth("");
    setDrop("");
  };

  const handleNumericInput = (value: string) => {
    return value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  };

  const validateValue = (field: "width" | "drop", value: string) => {
    const numValue = Number(value);
    const { minWidth, maxWidth, minDrop, maxDrop } = unitRanges[unit];
    const min = field === "width" ? minWidth : minDrop;
    const max = field === "width" ? maxWidth : maxDrop;

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
    onValuesChange?.({ width, drop, unit });
  }, [width, drop, unit, onValuesChange]);

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
            className={`w-full border rounded-md p-2 h-12 focus:outline-none focus:ring-2 ${
              errors.width
                ? "border-red-400 focus:ring-red-400"
                : "border-primary focus:ring-primary"
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
            value={drop}
            onChange={(e) => {
              const numericValue = handleNumericInput(e.target.value);
              setDrop(numericValue);
              validateValue("drop", numericValue);
            }}
            className={`w-full border rounded-md p-2 h-12 focus:outline-none focus:ring-2 ${
              errors.drop
                ? "border-red-400 focus:ring-red-400"
                : "border-primary focus:ring-primary"
            }`}
            placeholder={`Enter drop in ${unit}`}
          />
          <p className="mt-1 text-sm text-gray-500">
            Min: {unit === "Inches" ? currentRange.minDrop.toFixed(1) : currentRange.minDrop} {unit}{" "}
            | Max: {unit === "Inches" ? currentRange.maxDrop.toFixed(1) : currentRange.maxDrop}{" "}
            {unit}
          </p>
          {errors.drop && <p className="text-red-500 mt-1">{errors.drop}</p>}
        </div>
      </div>
    </>
  );
};
