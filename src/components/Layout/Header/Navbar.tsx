"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa";
import { menuItems } from "data/Header";
import Image from "next/image";

const Navbar = ({ className }: { className?: string }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <nav className={`bg-black text-white ${className}`}>
      <ul
        ref={navRef}
        className="flex gap-2 lg:gap-6 items-center px-2 lg:px-8 py-3 text-sm font-medium relative"
      >
        {menuItems.map((item, index) => {
          const hasSubmenu = !!item.submenu && item.submenu.length > 0;

          return (
            <li
              key={index}
              className="relative group"
              onMouseEnter={() => setOpenMenu(item.name)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <div
                className="flex items-center gap-1 cursor-pointer hover:text-primary font-semibold max-lg:text-xs"
                onClick={() => toggleMenu(item.name)}
              >
                {item.link ? <Link href={item.link}>{item.name}</Link> : <span>{item.name}</span>}
                {hasSubmenu && <FaAngleDown className="mt-0.5" size={12} />}
              </div>

              {hasSubmenu && (
                <ul
                  className={`absolute left-0 mt-5 w-56 bg-black text-white shadow-lg rounded-sm z-50 transition-all duration-200 ${
                    openMenu === item.name
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  {item.submenu?.map((sub, i) => (
                    <li key={i}>
                      <Link
                        href={sub.link}
                        onClick={() => setOpenMenu(null)}
                        className="flex gap-2 text-sm items-center px-4 py-3 hover:bg-primary hover:text-white rounded-sm transition"
                      >
                        {sub.desktopimage && (
                          <Image
                            src={sub.desktopimage}
                            alt={sub.name}
                            width={20}
                            height={20}
                            className="h-auto"
                          />
                        )}
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
