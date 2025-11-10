"use client";
import React from "react";
import {
  MyAccount,
  AddressBook,
  MyOrder,
  MySample,
  NewsletterSubscriptions,
  Wishlist,
  VerticalTabs,
} from "@components";
export const AccountTabs = () => {
  const tabs = [
    { id: 0, label: "My Account", component: () => <MyAccount /> },
    { id: 1, label: "Address Book", component: () => <AddressBook /> },
    { id: 2, label: "My Orders", component: () => <MyOrder /> },
    { id: 3, label: "My Wishlist", component: () => <Wishlist /> },
    { id: 4, label: "Newsletter Subscriptions", component: () => <NewsletterSubscriptions /> },
    { id: 5, label: "My Samples", component: () => <MySample /> },
  ];

  return <VerticalTabs tabs={tabs} />;
};
