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
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Choose Fitting Type">
        <div className="space-y-2">
          <p>Recess - Choose this option when fitting your blind inside a window recess.</p>
          <p>
            What we will do is reduce the width measurement you enter by 1cm/10mm. This means the
            blind will fit perfectly inside the recess.
          </p>
          <p>Outside Recess - Choose this option when fitting your blind outside a window area.</p>
          <p>
            If you select outside recess measurements, we will make your blind to the outside recess
            width you have given us. Please note that the fabric will be slightly narrower than the
            listed width to accommodate the control mechanism.
          </p>
        </div>
      </Modal>
    </div>
  );
};
