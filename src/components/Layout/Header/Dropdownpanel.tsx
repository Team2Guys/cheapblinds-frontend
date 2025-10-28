"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import { TbShoppingBag } from "react-icons/tb";
import { LuMinus, LuPlus } from "react-icons/lu";
import { DropdownPanelProps } from "types/Header";

const DropdownPanel = ({
  icon,
  title,
  badgeCount = 0,
  items,
  viewLink = "#",
  emptyMessage = "No items found.",
}: DropdownPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localItems, setLocalItems] = useState(items);
  const panelRef = useRef<HTMLDivElement>(null);
  const [cartItemsState, setCartItemsState] = useState(
    items.map((item) => ({ ...item, requiredBoxes: item.requiredBoxes || 1 })),
  );
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const increment = (index: number) => {
    setCartItemsState((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, requiredBoxes: item.requiredBoxes + 1 } : item,
      ),
    );
  };

  const decrement = (index: number) => {
    setCartItemsState((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, requiredBoxes: Math.max(1, item.requiredBoxes - 1) } : item,
      ),
    );
  };
  return (
    <div className="relative">
      <div className="relative cursor-pointer px-2" onClick={() => setIsOpen(!isOpen)}>
        <span
          className={`absolute top-1.5 right-0.5 text-xs font-semibold h-4 w-4 flex items-center justify-center rounded-full 
            ${badgeCount > 0 ? "bg-black text-white" : "bg-secondary text-[#00000033]"}
          `}
        >
          {badgeCount > 0 ? badgeCount : "0"}
        </span>
        {icon}
      </div>

      {isOpen && (
        <div
          ref={panelRef}
          className="fixed lg:absolute right-2 sm:right-5 lg:right-0 top-10 z-[999] bg-white shadow-lg rounded-lg border border-gray-200 w-[90vw] sm:w-80 p-3"
        >
          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold text-base">{title}</p>
            <IoIosClose size={25} onClick={() => setIsOpen(false)} className="cursor-pointer" />
          </div>
          {localItems.length > 0 ? (
            <div className="max-h-64 overflow-y-auto custom-scrollbar">
              {cartItemsState.map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-gray-100 p-2 bg-white shadow-sm mb-2 flex gap-3"
                >
                  <div className="bg-gray-100 p-1 rounded-md h-fit">
                    <Image
                      src={item.image || "/default-image.png"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="w-20 object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between text-start w-full">
                    <p className="text-sm font-medium  line-clamp-2">{item.name}</p>
                    {item.price && <p className="text-xs mt-1">{item.price}</p>}

                    {title === "Cart" && (
                      <div className="flex items-center border w-28 h-8 justify-between px-2 mt-2">
                        <button
                          onClick={() => decrement(i)}
                          className="px-1 hover:text-black"
                          disabled={item.requiredBoxes <= 1}
                        >
                          <LuMinus />
                        </button>
                        <span className="px-1">{item.requiredBoxes}</span>
                        <button onClick={() => increment(i)} className="px-1 hover:text-black">
                          <LuPlus />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-2 sm:w-72 py-8 text-center flex flex-col items-center justify-center space-y-4">
              <TbShoppingBag size={45} />
              <p className=" capitalize text-sm font-semibold">{emptyMessage}</p>
              <Link
                href="/collections"
                onClick={() => setIsOpen(false)}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-black/90 transition"
              >
                Continue Shopping
              </Link>
            </div>
          )}
          {localItems.length > 0 && (
            <div className="w-full mt-2 space-y-1">
              <Link href={viewLink} className="w-full block text-center bg-black text-white py-1">
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

export default DropdownPanel;
