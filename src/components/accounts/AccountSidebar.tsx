"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdKeyboardArrowDown } from "react-icons/md";

export const AccountSidebar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { label: "My Account", href: "/account" },
    { label: "Address Book", href: "/address-book" },
    { label: "My Orders", href: "/my-orders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Newsletter Subscriptions", href: "/newsletter-subscriptions" },
    { label: "My Samples", href: "/my-samples" },
  ];

  return (
    <div className="flex flex-col w-full md:w-3/12 gap-1">
      <div
        className="flex justify-between items-center bg-primary-light p-3 rounded-md cursor-pointer md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="font-semibold">Menu</span>
        <MdKeyboardArrowDown
          size={22}
          className={`transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Menu links */}
      <ul className={`mt-2 md:mt-0 ${menuOpen ? "block px-2" : "hidden md:block"} space-y-1`}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`block px-2 py-3 rounded-md font-semibold transition 
                  ${isActive ? "bg-primary text-white" : "bg-primary-light hover:bg-primary/20"}`}
                onClick={() => setMenuOpen(false)}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
