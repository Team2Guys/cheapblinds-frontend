"use client";
import {
  Breadcrumb,
  MyAccount,
  AddressBook,
  MyOrder,
  MySample,
  NewsletterSubscritions,
} from "@components";
import { AccountOption } from "@data/account";
import React, { useState } from "react";

export const AccountTabs = () => {
  const [activeTab, setActiveTab] = useState("account");
  return (
    <>
      <Breadcrumb title={AccountOption.find((tab) => tab.id === activeTab)?.label || ""} />
      <div className="my-10 px-2 md:px-8 flex gap-4">
        <div className="w-3/12">
          <ul className="space-y-1">
            {AccountOption.map((tab) => (
              <li
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-2 font-semibold cursor-pointer rounded-md ${
                  activeTab === tab.id ? "bg-primary" : "bg-primary-light"
                }`}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-9/12">
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
