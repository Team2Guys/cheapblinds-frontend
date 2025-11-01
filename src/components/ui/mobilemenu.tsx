"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa6";
import { menuItems } from "@data/Header";

const MobileMenu = ({ onClose }: { onClose: () => void }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (name: string) => {
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  return (
    <nav className="flex flex-col gap-1">
      {menuItems.map((item, index) => {
        const hasSubmenu = !!item.submenu && item.submenu.length > 0;

        return (
          <div key={index} className="border-b border-gray-200">
            <div
              className="flex justify-between items-center py-3 cursor-pointer"
              onClick={() => (hasSubmenu ? toggleMenu(item.name) : null)}
            >
              {item.link ? (
                <Link
                  onClick={onClose}
                  href={item.link}
                  className="flex items-center gap-2 text-[14px] font-open_Sans font-semibold text-gray-900 hover:text-primary transition"
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={22}
                      height={22}
                      className="rounded-sm"
                    />
                  )}
                  {item.name}
                </Link>
              ) : (
                <span className="text-[15px] font-semibold text-gray-900">{item.name}</span>
              )}

              {hasSubmenu && (
                <FaAngleDown
                  size={14}
                  className={`text-gray-700 transition-transform duration-300 ${
                    openMenu === item.name ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>

            {/* Submenu */}
            {hasSubmenu && (
              <div
                className={`overflow-hidden transition-all duration-300 pl-3 ${
                  openMenu === item.name ? "max-h-96 py-2" : "max-h-0"
                }`}
              >
                {item.submenu?.map((sub, subIndex) => (
                  <Link
                    key={subIndex}
                    href={sub.link}
                    onClick={onClose}
                    className="flex items-center gap-2 font-open_Sans py-2 text-sm text-gray-700 hover:text-primary transition"
                  >
                    {sub.mobileimage && (
                      <Image
                        src={sub.mobileimage}
                        alt={sub.name}
                        width={22}
                        height={22}
                        className="rounded-sm"
                      />
                    )}
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default MobileMenu;
