"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export const SortDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Low to High");

  const options = ["Low to High", "High to Low", "Newest", "Best Seller"];

  const handleSelect = (value: string) => {
    setSelected(value);
    setOpen(false);
  };

  return (
    <div className="relative flex flex-col gap-2 min-w-[140px]">
      <p className="text-sm font-medium">Sort By:</p>

      {/* Trigger Button */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 justify-between border border-[#00000066] px-2 py-1.5 rounded-md text-sm cursor-pointer select-none"
      >
        {selected}
        <div className="flex items-center gap-2">
          <div className="w-px h-4 bg-[#00000066]"></div>
          <FaChevronDown className={`text-xs transition ${open && "rotate-180"}`} />
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white border border-[#00000033] rounded-md shadow-md z-20">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                selected === opt ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
