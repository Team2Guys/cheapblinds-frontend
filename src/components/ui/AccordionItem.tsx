"use client";
import { useEffect, useRef, useState } from "react";
import { AccordionItemProps } from "@/types/types";
import Chevron from "@components/svg/chevron";

export const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className="border border-yellow-100 bg-primary-light rounded-lg overflow-hidden transition-all">
      <button
        onClick={onToggle}
        className="font-semibold font-open_Sans w-full flex justify-between items-center px-4 py-3 text-left hover:bg-primary-light transition-all text-[16px] gap-2"
      >
        <span className="flex-1 text-left">{question}</span>
        <Chevron
          className={`w-5 h-5 shrink-0 transform transition-transform duration-300 cursor-pointer ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: height,
          transition: "max-height 0.4s ease",
        }}
        className="overflow-hidden"
      >
        <div className="px-4 pb-3 text-gray-600 text-[16px]">{answer}</div>
      </div>
    </div>
  );
};
