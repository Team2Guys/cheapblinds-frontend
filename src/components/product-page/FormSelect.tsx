"use client";
import React, { useState } from "react";
import { Checkbox, Modal } from "@components";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";

interface FormSelectProps {
  title: string;
  helpText?: string;
  options?: { id: string; label: string; price?: string; imageUrl?: string }[];
  selected: string;
  onChange: (_id: string) => void;
  helpContent?: React.ReactNode;
  isChainSelector?: boolean;
}

export const FormSelect = React.memo(
  ({
    title,
    helpText,
    options = [],
    selected,
    onChange,
    helpContent,
    isChainSelector = false,
  }: FormSelectProps) => {
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    const chainOptions = [
      { id: "Right", label: "Right" },
      { id: "Left", label: "Left" },
    ];

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          {helpText && (
            <button
              type="button"
              onClick={() => setIsHelpOpen(true)}
              className="flex items-center gap-1 text-primary cursor-pointer"
            >
              {helpText} <HiOutlineQuestionMarkCircle size={20} />
            </button>
          )}
        </div>

        {/* Conditional Rendering */}
        {isChainSelector ? (
          // ✅ Custom Left/Right toggle
          <div className="flex gap-6 items-center mt-2">
            {chainOptions.map((opt) => (
              <div
                key={opt.id}
                onClick={() => onChange(opt.id)}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <div
                  className={`rounded-full p-1.5 border-4 flex items-center justify-center transition-all duration-200
                  ${selected === opt.id ? "border-primary bg-white" : "border-secondary bg-white"}
                `}
                >
                  {selected === opt.id && <div className=" rounded-full bg-white" />}
                </div>
                <span>{opt.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {options.map((opt) => (
              <Checkbox
                key={opt.id}
                label={<span>{opt.label}</span>}
                price={opt.price}
                checked={selected === opt.id}
                onChange={() => onChange(opt.id)}
                imageUrl={opt.imageUrl}
              />
            ))}
          </div>
        )}

        {/* Modal for Help */}
        <Modal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} title="">
          {helpContent || (
            <p className="text-base text-gray-700">No help content available for this section.</p>
          )}
        </Modal>
      </div>
    );
  },
);
