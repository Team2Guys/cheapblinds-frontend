"use client";
import { Receptions } from "@data/detail-page";
import Image from "next/image";
import React from "react";
import { IoMdCheckmark } from "react-icons/io";

interface RecessSelectorProps {
  selected: string;
  onChange: (_id: string) => void;
}

export const RecessSelector = ({ selected, onChange }: RecessSelectorProps) => {
  return (
    <div className="flex flex-col gap-3 mt-5 px-4">
      <div className="flex gap-4">
        {Receptions.map((opt) => (
          <div
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`relative border-3 cursor-pointer transition-all duration-200 w-6/12 md:w-4/12 ${
              selected === opt.id ? "border-black shadow-md" : "border-secondary"
            }`}
          >
            {selected === opt.id && (
              <div className="absolute -top-4 -left-4 bg-primary rounded-full w-7 h-7 flex items-center justify-center z-10">
                <IoMdCheckmark size={20} />
              </div>
            )}

            <div className="aspect-square w-full relative">
              <Image
                src={opt.img}
                alt={opt.label}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div
              className={`text-center py-2 font-semibold ${
                selected === opt.id ? "bg-black text-white" : "bg-white"
              }`}
            >
              {opt.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
