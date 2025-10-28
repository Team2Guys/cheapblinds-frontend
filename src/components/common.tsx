"use client";
import { InstructionData } from "data/faqs";
import React, { useState } from "react";
import { AccordionItem } from "./accordian";

const Instructions: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<{ [key: string]: number | null }>({});

  const toggleAccordion = (categoryId: string, index: number) => {
    setOpenIndex((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] === index ? null : index,
    }));
  };

  return (
    <>
      <h2 className="text-center text-[24px] font-rubik font-semibold lg:text-[36px] my-8">
        Commonly Asked Questions
      </h2>
      <div className=" space-y-4 mb-8 lg:mb-14">
        {InstructionData.map((item, index) => (
          <AccordionItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex[`item-${index}`] === index}
            onToggle={() => toggleAccordion(`item-${index}`, index)}
          />
        ))}
      </div>
    </>
  );
};

export default Instructions;
