// useAccordion.ts
import { useState } from "react";

export const useAccordion = () => {
  const [openIndex, setOpenIndex] = useState<{ [key: string]: number | null }>({});

  const toggleAccordion = (categoryId: string, index: number) => {
    setOpenIndex((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] === index ? null : index,
    }));
  };

  return { openIndex, toggleAccordion };
};
