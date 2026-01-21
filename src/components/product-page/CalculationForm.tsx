"use client";
import React, { useState, useEffect } from "react";

type Unit = "mm" | "cm" | "Inches";

interface CalculationProps {
  onValuesChange?: (_values: {
    width: string;
    drop: string;
    unit: Unit;
    isValid: boolean;
  }) => void;
  minDrop?: number;
  maxDrop?: number;
  minWidth?: number;
  maxWidth?: number;
}

const UNITS: readonly Unit[] = ["mm", "cm", "Inches"] as const;

export const CalculationForm = ({
  onValuesChange,
  minDrop = 0,
  maxDrop = 0,
  minWidth = 0,
  maxWidth = 0,
}: CalculationProps) => {
  const [unit, setUnit] = useState<Unit>("cm");
  const [width, setWidth] = useState("");
  const [drop, setDrop] = useState("");
  const [errors, setErrors] = useState<{ width: string; drop: string }>({
    width: "",
    drop: "",
  });

  const unitRanges: Record<Unit, {
    minWidth: number;
    maxWidth: number;
    minDrop: number;
    maxDrop: number;
  }> = {
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

  const handleNumericInput = (value: string) =>
    value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

  const validateValue = (field: "width" | "drop", value: string) => {
    const numValue = Number(value);
    const range = unitRanges[unit];
    const min = field === "width" ? range.minWidth : range.minDrop;
    const max = field === "width" ? range.maxWidth : range.maxDrop;

    if (!value) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
      return;
    }

    if (numValue < min) {
      setErrors((prev) => ({
        ...prev,
        [field]: `Minimum allowed is ${min}`,
      }));
    } else if (numValue > max) {
      setErrors((prev) => ({
        ...prev,
        [field]: `Maximum allowed is ${max}`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const isValid =
    width !== "" &&
    drop !== "" &&
    errors.width === "" &&
    errors.drop === "";

  useEffect(() => {
    onValuesChange?.({
      width,
      drop,
      unit,
      isValid,
    });
  }, [width, drop, unit, isValid, onValuesChange]);

  const currentRange = unitRanges[unit];

  return (
    <>
      {/* Unit Selector */}
      <div className="flex justify-center gap-6">
        {UNITS.map((u) => (
          <label key={u} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="unit"
              value={u}
              checked={unit === u}
              onChange={() => {
                setUnit(u);
                setWidth("");
                setDrop("");
                setErrors({ width: "", drop: "" });
              }}
              hidden
            />
            <span className="w-4 h-4 rounded-full border border-primary flex items-center justify-center">
              {unit === u && (
                <span className="w-2 h-2 bg-primary rounded-full" />
              )}
            </span>
            {u}
          </label>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        {/* Width */}
        <div>
          <label>Width ({unit})</label>
          <input
            type="text"
            value={width}
            onChange={(e) => {
              const v = handleNumericInput(e.target.value);
              setWidth(v);
              validateValue("width", v);
            }}
            className={`w-full p-2 border rounded ${
              errors.width ? "border-red-500" : "border-primary"
            }`}
          />
          <p className="text-xs text-gray-500">
            Min: {currentRange.minWidth} | Max: {currentRange.maxWidth}
          </p>
          {errors.width && (
            <p className="text-red-500 text-sm">{errors.width}</p>
          )}
        </div>

        {/* Height */}
        <div>
          <label>Height ({unit})</label>
          <input
            type="text"
            value={drop}
            onChange={(e) => {
              const v = handleNumericInput(e.target.value);
              setDrop(v);
              validateValue("drop", v);
            }}
            className={`w-full p-2 border rounded ${
              errors.drop ? "border-red-500" : "border-primary"
            }`}
          />
          <p className="text-xs text-gray-500">
            Min: {currentRange.minDrop} | Max: {currentRange.maxDrop}
          </p>
          {errors.drop && (
            <p className="text-red-500 text-sm">{errors.drop}</p>
          )}
        </div>
      </div>
    </>
  );
};
