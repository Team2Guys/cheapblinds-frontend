"use client";
import React, { useEffect, useRef, useState } from "react";
import { LuHeart, LuUser } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import FreeSample from "@components/svg/free-sample";
import DropdownPanel from "./Dropdownpanel";
import { cartItems, wishlistItems } from "@data/Header";
import Link from "next/link";
import { useAuth } from "@context/UserContext";
import { FaRegCircleUser } from "react-icons/fa6";

const UserIcons = ({ className }: { className?: string }) => {
  const { user, logoutUser } = useAuth();
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setAccountDropdownOpen(false);
      }
    };

    if (accountDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [accountDropdownOpen]);

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative border-r lg:pr-1.5" ref={dropdownRef}>
        {user ? (
          <>
            <button
              onClick={() => setAccountDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 cursor-pointer"
            >
              <FaRegCircleUser size={25} />
            </button>
            {accountDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md z-50 p-1">
                <Link
                  href="/account"
                  className="block px-4 py-2 hover:bg-primary font-semibold rounded-md "
                  onClick={() => setAccountDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logoutUser();
                    setAccountDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-primary rounded-md font-semibold cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <Link href="/login">
            <LuUser size={25} />
          </Link>
        )}
      </div>

      <div className="border-r lg:pr-1.5">
        <DropdownPanel
          icon={<LuHeart size={25} />}
          title="Wishlist"
          badgeCount={wishlistItems.length}
          items={wishlistItems}
          viewLink="/wishlist"
          emptyMessage="Your wishlist is empty."
        />
      </div>
      <div className="border-r lg:pr-1.5">
        <DropdownPanel
          icon={<FreeSample />}
          title="Free Samples"
          badgeCount={0}
          items={[]}
          viewLink="/freesample"
          emptyMessage="No free samples found."
        />
      </div>
      <div className="lg:pr-1.5">
        <DropdownPanel
          icon={<MdOutlineShoppingCart size={25} />}
          title="Cart"
          badgeCount={cartItems.length}
          items={cartItems}
          viewLink="/cart"
          emptyMessage="Your cart is empty."
        />
      </div>
    </div>
  );
};

export default UserIcons;
