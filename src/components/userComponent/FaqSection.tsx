"use client";
import { AccordionItem } from "@components/ui/AccordionItem";
import { faqData } from "@data/faqs";
import React, { useState } from "react";

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<{ [key: string]: number | null }>({});

  const toggleAccordion = (categoryId: string, index: number) => {
    setOpenIndex((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] === index ? null : index,
    }));
  };

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="w-full pt-10 lg:pt-14 bg-white">
      <div className="container mx-auto px-2 text-center text-black">
        <h2 className="text-2xl md:text-4xl font-semibold mb-5 font-rubik">
          Frequently Asked Questions
        </h2>

        {/* 🔹 Top Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:gap-7  justify-center mb-16">
          {faqData.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleScroll(category.id)}
                className="flex flex-col items-center gap-2 text-sm font-medium hover:text-white transition-all cursor-pointer"
              >
                <div className="p-4 rounded-full hover:bg-primary-light transition-all">
                  <Icon className="w-8 h-8 text-black" />
                </div>
                <span className="font-sans text-[16px] font-semibold bg-primary px-6 py-2 rounded-lg cursor-pointer">
                  {category.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* 🔹 FAQ Categories */}
        {faqData.map((category) => (
          <div key={category.id} id={category.id} className="mb-14 text-left scroll-mt-24">
            <h3 className="text-2xl font-semibold font-rubik mb-6 lg:text-[36px]">
              {category.title}
            </h3>

            <div className="space-y-3">
              {category.items.map((item, index) => (
                <AccordionItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex[category.id] === index}
                  onToggle={() => toggleAccordion(category.id, index)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
