"use client";
import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur: (_e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  touched?: boolean;
  as?: "input" | "select";
  options?: string[];
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  as = "input",
  options = [],
}) => {
  // Split label and highlight the "*" in red if it exists
  const renderLabel = () => {
    const parts = label.split("*");
    return (
      <label htmlFor={name} className="block mb-1 text-[16px]">
        {parts[0]}
        {label.includes("*") && <span className="text-red-500">*</span>}
      </label>
    );
  };

  return (
    <div>
      {renderLabel()}

      {as === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      )}

      {touched && error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
