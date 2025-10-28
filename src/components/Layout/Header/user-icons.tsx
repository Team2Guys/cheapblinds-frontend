"use client";
import React from "react";
import { LuHeart, LuUser } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import FreeSample from "components/svg/free-sample";
import DropdownPanel from "./Dropdownpanel";
import { cartItems, wishlistItems } from "data/Header";

const UserIcons = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="border-r lg:pr-1.5">
        <LuUser size={25} />
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
