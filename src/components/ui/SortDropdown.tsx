"use client";
import { useState } from "react";

interface SortDropdownProps {
  value: "default" | "low" | "high" | "new" | "show upto 50" | "view all";
  onChange: (_value: "default" | "low" | "high" | "new" | "show upto 50" | "view all") => void;
}

export const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  const [open, setOpen] = useState(false);

  const options = [
    { label: "Default", value: "default" }, // <-- default option
    { label: "Low to High", value: "low" },
    { label: "High to Low", value: "high" },
    { label: "Newest", value: "new" },
    { label: "Show Upto 50", value: "show upto 50" },
    { label: "View All", value: "view all" },
  ];

  const selectedOption = options.find((o) => o.value === value)?.label || "Default";

  return (
    <div className="relative flex flex-col gap-2 min-w-[140px]">
      <p className="text-sm font-medium">Sort By:</p>

      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 justify-between border border-[#00000066] px-2 py-1.5 rounded-md text-sm cursor-pointer select-none"
      >
        {selectedOption}
        <div className="flex items-center gap-2">
          <div className="w-px h-4 bg-[#00000066]"></div>
          <svg
            className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white border border-[#00000033] rounded-md shadow-md z-20">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value as "default" | "low" | "high" | "new");
                setOpen(false);
              }}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                value === opt.value ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
