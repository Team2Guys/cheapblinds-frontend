"use client";
import { useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { ModalProps } from "@/types/Header";

interface ExtendedModalProps extends ModalProps {
  title?: string;
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  width?: number | string;
  height?: number | string;
}

const Modal = ({
  isOpen,
  open, // alias support
  onClose,
  onCancel,
  onOk,
  children,
  className,
  paymentModal,
  title,
  width,
  height,
}: ExtendedModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const showModal = isOpen ?? open;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel?.();
        onClose?.();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel, onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel?.();
      onClose?.();
    }
  };

  if (!showModal) return null;

  return (
    <div
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-20 px-4 sm:px-6 ${className || ""}`}
    >
      <div
        ref={modalRef}
        style={{ width, height }}
        className={`bg-white shadow-lg p-4 md:p-5 relative rounded-md w-full sm:w-[90%] transition-all duration-300 
          ${paymentModal ? "md:w-[1200px]" : "md:w-[600px] lg:w-[700px]"}`}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center border-b relative ${title ? "pb-4" : "pb-10"} `}
        >
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button
            onClick={() => {
              onCancel?.();
              onClose?.();
            }}
            className="text-xl cursor-pointer right-0 top-0 absolute p-2 hover:bg-gray-200 rounded-md"
          >
            <RxCross2 />
          </button>
        </div>

        <div className="mt-4 max-h-[600px] overflow-y-auto">{children}</div>
        {(onOk || onCancel) && (
          <div className="flex justify-end gap-3 mt-6 border-t pt-3">
            <button
              onClick={() => {
                onCancel?.();
                onClose?.();
              }}
              className="px-4 py-2 text-sm rounded-md border hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => onOk?.()}
              className="px-4 py-2 text-sm rounded-md bg-black text-white hover:bg-gray-800"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
