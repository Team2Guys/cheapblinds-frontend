"use client";
import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  label?: string;
  name: string;
  type?: string;
  as?: "input" | "select" | "textarea";
  options?: string[];
  rows?: number;
  placeholder?: string;
}

export const Input = ({
  label,
  name,
  type = "text",
  as = "input",
  options = [],
  rows,
  placeholder,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const renderLabel = () => {
    if (!label) return null;

    const parts = label.split("*");
    return (
      <label htmlFor={name} className="block mb-1 text-base font-medium">
        {parts[0]}
        {label.includes("*") && <span className="text-red-500">*</span>}
      </label>
    );
  };

  // ✅ Render field types
  const renderField = () => {
    if (as === "select") {
      return (
        <Field
          as="select"
          id={name}
          name={name}
          className="w-full border border-secondary rounded-md p-2 focus:ring-1 focus:ring-primary focus:outline-none"
        >
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Field>
      );
    }

    if (as === "textarea") {
      return (
        <Field
          as="textarea"
          id={name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          className="w-full border border-secondary rounded-md p-2 focus:ring-1 focus:ring-primary focus:outline-none"
        />
      );
    }

    // ✅ Handle password visibility toggle
    if (type === "password") {
      return (
        <div className="relative">
          <Field
            id={name}
            name={name}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            className="w-full border border-secondary rounded-md p-2 pr-10 focus:ring-1 focus:ring-primary focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-primary focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
          </button>
        </div>
      );
    }

    // Default input
    return (
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full border border-secondary rounded-md p-2 focus:ring-1 focus:ring-primary focus:outline-none"
      />
    );
  };

  return (
    <div className="relative">
      {renderLabel()}
      {renderField()}
      <ErrorMessage name={name} component="p" className="text-red-500 text-sm mt-1" />
    </div>
  );
};
