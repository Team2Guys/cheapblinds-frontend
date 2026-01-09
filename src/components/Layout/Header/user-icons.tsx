"use client";

import React, { useEffect, useState, useRef } from "react";
import { LuHeart, LuUser } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import FreeSampleIcon from "@components/svg/free-sample";
import { useAuth } from "@context/UserContext";
import Link from "next/link";
import { FaRegCircleUser } from "react-icons/fa6";
import { useIndexedDb } from "@lib/useIndexedDb";
import { usePathname } from "next/navigation";
import MenuDropdown from "./MenuDropdown";

const UserIcons = ({ className }: { className?: string }) => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const {
    cart,
    wishlist,
    freeSamples,
    removeFromCart,
    removeFromWishlist,
    removeFreeSampleItem,
    openCart,
    openWishlist,
    openFreeSample,
    setOpenWishlist,
    setOpenFreeSample,
    setOpenCart,
  } = useIndexedDb();

  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAccountDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (pathname === "/wishlist/") {
      setOpenWishlist(false);
    }
    if (pathname === "/free-sample/") {
      setOpenFreeSample(false);
    }
    if (pathname === "/cart/") {
      setOpenCart(false);
    }
  }, [pathname, setOpenWishlist, setOpenFreeSample]);

  return (
    <div className={`flex items-center ${className}`}>
      {/* Account */}
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
                  className="block px-4 py-2 hover:bg-primary font-semibold rounded-md"
                  onClick={() => setAccountDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
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

      {/* Wishlist */}
      <div className="border-r lg:pr-1.5">
        <MenuDropdown
          icon={<LuHeart size={25} />}
          title="Wishlist"
          badgeCount={wishlist.length}
          items={wishlist}
          viewLink="/wishlist"
          emptyMessage="Your wishlist is empty."
          removeItem={removeFromWishlist}
          forceOpen={pathname !== "/wishlist/" && openWishlist}
        />
      </div>

      {/* Free Samples */}
      <div className="border-r lg:pr-1.5">
        <MenuDropdown
          icon={<FreeSampleIcon />}
          title="Free Samples"
          badgeCount={freeSamples.length}
          items={freeSamples}
          viewLink="/free-sample"
          emptyMessage="No free samples found."
          removeItem={removeFreeSampleItem}
          forceOpen={pathname !== "/free-sample/" && openFreeSample}
        />
      </div>

      {/* Cart */}
      <div className="lg:pr-1.5">
        <MenuDropdown
          icon={<MdOutlineShoppingCart size={25} />}
          title="Cart"
          badgeCount={cart.length}
          items={cart}
          viewLink="/cart"
          emptyMessage="Your cart is empty."
          removeItem={removeFromCart}
          forceOpen={pathname !== "/cart/" && openCart}
        />
      </div>
    </div>
  );
};

export default UserIcons;
