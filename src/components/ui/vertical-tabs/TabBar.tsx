"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface Tab {
  id: number;
  label: string;
  component: () => React.ReactNode;
}

interface TabBarProps {
  tabs: Tab[];
  selectedTabId: number;
  onTabChange: (_id: number) => void;
}

export const TabBar = ({ tabs, selectedTabId, onTabChange }: TabBarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
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
      <ul className={`space-y-1 mt-2 md:mt-0 ${menuOpen ? "block px-2" : "hidden md:block"}`}>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => {
              onTabChange(tab.id);
              setMenuOpen(false);
            }}
            className={`p-2 font-semibold cursor-pointer rounded-md transition ${
              selectedTabId === tab.id
                ? "bg-primary text-white"
                : "bg-primary-light hover:bg-primary/20"
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </>
  );
};
