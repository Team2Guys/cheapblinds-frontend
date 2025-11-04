"use client";
import React from "react";
import { Field, ErrorMessage } from "formik";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  as?: "input" | "select" | "textarea";
  options?: string[];
  rows?: number;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  as = "input",
  options = [],
  rows,
  placeholder,
}) => {
  // Split label and highlight the "*" in red if it exists
  const renderLabel = () => {
    const parts = label.split("*");
    return (
      <label htmlFor={name} className="block mb-1 text-[16px] font-medium">
        {parts[0]}
        {label.includes("*") && <span className="text-red-500">*</span>}
      </label>
    );
  };

  return (
    <div>
      {renderLabel()}

      {as === "select" ? (
        <Field
          as="select"
          id={name}
          name={name}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-primary focus:outline-none"
        >
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Field>
      ) : as === "textarea" ? (
        <Field
          as="textarea"
          id={name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-primary focus:outline-none"
        />
      ) : (
        <Field
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-primary focus:outline-none"
        />
      )}

      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};
