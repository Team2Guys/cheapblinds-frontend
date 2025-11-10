"use client";
import Image from "next/image";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";

interface CheckboxProps {
  label: React.ReactNode;
  checked: boolean;
  onChange: () => void;
  price?: string;
  imageUrl?: string; // ✅ Optional small image
}

export const Checkbox = ({ label, checked, onChange, price, imageUrl }: CheckboxProps) => {
  return (
    <div
      onClick={onChange}
      className={`relative border rounded-md p-3 cursor-pointer flex justify-between items-center transition-all
        ${checked ? "bg-secondary" : ""}
      `}
    >
      <div className="flex items-center gap-2">
        {checked && (
          <span className="absolute -top-2 -left-2 bg-primary rounded-full w-5 h-5 p-0.5 flex items-center justify-center">
            <IoMdCheckmark size={20} />
          </span>
        )}

        {imageUrl && (
          <Image
            src={imageUrl}
            alt="option"
            className="w-[25px] h-[25px] object-cover rounded"
            width={100}
            height={100}
          />
        )}

        <span>{label}</span>
      </div>

      {price && (
        <span>
          <span className="font-currency text-xl"></span>
          {price}
        </span>
      )}
    </div>
  );
};
