"use client";

import { Modal } from "@components/ui";
import { infoItems } from "@data/home";
import Image from "next/image";
import React, { useState } from "react";

export const InformationSection = React.memo(({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<(typeof infoItems)[0] | null>(null);

  const handleOpen = (item: (typeof infoItems)[0]) => {
    setActiveItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveItem(null);
  };

  return (
    <>
      <div
        className={`container mx-auto flex flex-wrap justify-center md:grid md:grid-cols-5 ${className}`}
      >
        {infoItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleOpen(item)}
            className={`w-4/12 md:w-auto flex flex-col items-center justify-center text-center 
                max-md:mb-2 py-2 lg:py-6 px-4 cursor-pointer
                ${index % 2 === 0 ? "bg-primary-light" : "bg-primary text-white"}`}
          >
            <div className="relative w-12 h-12 lg:w-24 lg:h-24 mb-3">
              <Image unoptimized src={item.image} alt={item.text} fill className="object-contain" />
            </div>
            <p className="text-sm md:text-base font-semibold leading-snug">{item.text}</p>
          </button>
        ))}
      </div>

      <Modal isOpen={open} onClose={handleClose} title={activeItem?.modal.title}>
        <p className="text-sm md:text-base">{activeItem?.modal.description}</p>
      </Modal>
    </>
  );
});
