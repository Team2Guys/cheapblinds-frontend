import React from "react";

interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (_e: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: string;
  touched?: boolean;
  rows?: number;
  placeholder?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  rows = 4,
  placeholder,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block mb-1 text-[16px]">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full border border-gray-300 rounded-md p-2"
        placeholder={placeholder}
      />
      {touched && error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
