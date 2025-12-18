"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import { TbShoppingBag } from "react-icons/tb";
import { Product } from "@/types/category";
import { FaRegTrashAlt } from "react-icons/fa";
import { ColorImage } from "@data/filter-colors";

interface DropdownPanelProps {
  icon: React.ReactNode;
  title: string;
  badgeCount?: number;
  items: Product[];
  viewLink?: string;
  emptyMessage?: string;
  removeItem?: (_id: string) => void;
  forceOpen?: boolean; // NEW
}

const MenuDropdown = ({
  icon,
  title,
  badgeCount = 0,
  items,
  viewLink = "#",
  emptyMessage = "No items found.",
  removeItem,
  forceOpen = false, // default false
}: DropdownPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hoveringRef = useRef(false);
  useEffect(() => {
    if (items.length === 0) return;
    if (isOpen) return;
    if (!forceOpen) return;

    setIsOpen(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!hoveringRef.current) setIsOpen(false);
    }, 5000);
  }, [items, forceOpen]);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    hoveringRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleMouseLeave = () => {
    hoveringRef.current = false;
    if (isOpen) {
      timerRef.current = setTimeout(() => setIsOpen(false), 5000);
    }
  };

  return (
    <div className="relative">
      <div className="relative cursor-pointer px-2" onClick={() => setIsOpen(!isOpen)}>
        <span
          className={`absolute top-1.5 right-0.5 text-xs font-semibold h-4 w-4 flex items-center justify-center rounded-full 
            ${badgeCount > 0 ? "bg-black text-white" : "bg-secondary text-[#00000033]"}`}
        >
          {badgeCount > 0 ? badgeCount : "0"}
        </span>
        {icon}
      </div>

      {isOpen && (
        <div
          ref={panelRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="fixed lg:absolute right-2 sm:right-5 lg:right-0 top-10 z-999 bg-white shadow-lg rounded-lg border border-gray-200 w-[90vw] sm:w-80 p-3"
        >
          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold text-base">{title}</p>
            <IoIosClose size={25} onClick={() => setIsOpen(false)} className="cursor-pointer" />
          </div>

          {items.length > 0 ? (
            <div className="max-h-64 overflow-y-auto custom-scrollbar">
              {items.map((item, i) => {
                let itemImage = item.posterImageUrl || "/default-image.png";

                if (title === "Free Samples") {
                  const colorName = item.color?.toLowerCase() || "";
                  itemImage =
                    ColorImage.find((c) => c.color.toLowerCase() === colorName)?.image ||
                    "/assets/images/free-sample/add-sample.webp";
                }

                return (
                  <div
                    key={item.id || i}
                    className="rounded-lg border border-gray-100 p-2 bg-white shadow-sm mb-2 flex gap-3 items-center relative"
                  >
                    <div className="bg-gray-100 p-1 rounded-md h-fit">
                      <Image
                        src={itemImage}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="w-20 object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between text-start w-full">
                      <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                      {item.price !== undefined && (
                        <p className="text-xs mt-1">
                          {item.price === 0 ? "Free" : `Price: ${item.price}`}
                        </p>
                      )}
                      {removeItem && (
                        <button
                          className="text-primary font-semibold hover:underline mt-1 absolute top-2 right-2 cursor-pointer"
                          onClick={() => removeItem(String(item.id))}
                        >
                          <FaRegTrashAlt />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-2 sm:w-72 py-8 text-center flex flex-col items-center justify-center space-y-4">
              <TbShoppingBag size={45} />
              <p className="capitalize text-sm font-semibold">{emptyMessage}</p>
              <Link
                href="/collections"
                onClick={() => setIsOpen(false)}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-black/90 transition"
              >
                Continue Shopping
              </Link>
            </div>
          )}

          {items.length > 0 && (
            <div className="w-full mt-2 space-y-1">
              <Link
                href={viewLink}
                onClick={() => setIsOpen(false)}
                className="w-full block text-center bg-black text-white py-1"
              >
                View {title}
              </Link>
              <div className="border text-center w-full border-black hover:bg-black hover:text-white transition duration-300 py-1">
                <Link href="/" onClick={() => setIsOpen(false)} className="text-center px-4 py-2">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
