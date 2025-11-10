"use client";
import React, { useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Modal } from "@components";
export const HelpingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <p className="flex gap-1 items-center">
        Choose Fitting Type
        <span
          className="text-primary flex items-center gap-1 cursor-pointer underline"
          onClick={() => setIsOpen(true)}
        >
          Help <FaRegQuestionCircle />
        </span>
      </p>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-full h-full flex items-center justify-center">
          <h2 className="text-2xl font-semibold">Helping Modal</h2>
        </div>
      </Modal>
    </div>
  );
};

