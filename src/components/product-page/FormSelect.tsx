"use client";
import React, { useState } from "react";
import { Checkbox, Modal } from "@components";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";

interface FormSelectProps {
  title: string;
  helpText?: string;
  options?: { id: string; label: string; price?: number | undefined; imageUrl?: string }[];
  selected: string;
  onChange: (_id: string) => void;
  helpContent?: React.ReactNode;
}

export const FormSelect = React.memo(
  ({ title, helpText, options = [], selected, onChange, helpContent }: FormSelectProps) => {
    const [isHelpOpen, setIsHelpOpen] = useState(false);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((opt) => (
            <Checkbox
              key={opt.id}
              label={<span>{opt.label}</span>}
              price={opt.price && opt.price > 0 ? opt.price.toFixed(2) : undefined}
              checked={selected === opt.id}
              onChange={() => onChange(opt.id)}
              imageUrl={opt.imageUrl}
            />
          ))}
        </div>

        <Modal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} title="">
          {helpContent || (
            <p className="text-base text-gray-700">No help content available for this section.</p>
          )}
        </Modal>
      </div>
    );
  },
);
