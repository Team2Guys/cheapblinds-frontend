"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  MyAccount,
  AddressBook,
  MyOrder,
  MySample,
  NewsletterSubscritions,
} from "@components";
import { AccountOption } from "@data/account";
import { MdKeyboardArrowDown } from "react-icons/md";

export const AccountTabs = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Breadcrumb title={AccountOption.find((tab) => tab.id === activeTab)?.label || ""} />
      <div className=" md:my-10 md:px-8 flex flex-wrap md:flex-nowrap gap-4">
        <div className="w-full md:w-3/12">
          <div
            className="flex justify-between items-center bg-primary-light p-3 rounded-md cursor-pointer md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="font-semibold">Menu</span>
            <MdKeyboardArrowDown size={22} />
          </div>
          <ul className={`space-y-1 mt-2 md:mt-0 ${menuOpen ? "block" : "hidden md:block"}`}>
            {AccountOption.map((tab) => (
              <li
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMenuOpen(false);
                }}
                className={`p-2 font-semibold cursor-pointer rounded-md transition ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "bg-primary-light hover:bg-primary/20"
                }`}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-9/12 px-2">
          {activeTab === "account" && <MyAccount />}
          {activeTab === "address" && <AddressBook />}
          {activeTab === "orders" && <MyOrder />}
          {activeTab === "wishlist" && <div>asd</div>}
          {activeTab === "newsletter" && <NewsletterSubscritions />}
          {activeTab === "samples" && <MySample />}
        </div>
      </div>
    </>
  );
};
