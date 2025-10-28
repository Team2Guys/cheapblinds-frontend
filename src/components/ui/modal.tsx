"use client";
import { useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { ModalProps } from "types/Header";

const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-[80px] px-4 sm:px-6 ${className || ""}`}
    >
      <div
        ref={modalRef}
        className="bg-white shadow-lg p-5 relative rounded-xl w-full sm:w-[90%] md:w-[600px] lg:w-[700px] transition-all duration-300"
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-xl">
          <RxCross2 />
        </button>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
