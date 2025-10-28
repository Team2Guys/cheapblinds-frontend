"use client";
import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { DrawerProps } from "types/Header";

const Drawer = ({ title, content, open, onOpen, onClose, className }: DrawerProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <>
      <div onClick={onOpen} className={`${className} cursor-pointer`}>
        {title}
      </div>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out w-full ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end px-2 pt-2">
          <button
            onClick={onClose}
            className="text-2xl text-lightdark w-8 h-8 rounded-md flex items-center justify-center shadow-14"
            title="Hide menu"
            type="button"
          >
            <RxCross2 size={20} />
          </button>
        </div>

        <div className="h-full overflow-y-auto px-4 pb-4">{content}</div>
      </div>
    </>
  );
};

export default Drawer;
