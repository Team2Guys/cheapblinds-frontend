"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session } = useSession();

  const trigger = useRef<HTMLDivElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target as Node) ||
        (trigger.current && trigger.current.contains(target as Node))
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const logoutHhandler = () => {
    try {
      Cookies.remove("admin_access_token");
      Cookies.remove("super_admin_access_token");
      signOut({ callbackUrl: "/dashboard/Admin-login" });
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="relative">
      <div
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center py-3 gap-2 xs:gap-4 text-black cursor-pointer "
      >
        <div>
          <span className="text-right lg:block">
            <span className="block text-11 xs:text-sm font-medium text-white ">
              {session?.user ? session?.user.name : null}
            </span>
            <span className="block text-11 xs:text-sm text-white ">
              {session?.user?.role || null}
            </span>
          </span>
        </div>
        <div className=" flex items-center gap-1 xs:gap-3">
          <div className="h-6 xs:h-12 w-6 xs:w-12 rounded-full overflow-hidden">
            <Image
              src={
                session && session?.user?.image
                  ? session.user.image
                  : "/assets/images/dummy-avatar.jpg"
              }
              width={55}
              height={55}
              alt={session?.user?.name || "User"}
            />
          </div>
          <MdKeyboardArrowDown className="text-white" />
        </div>
      </div>
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-1 flex flex-col rounded-sm border border-stroke bg-white w-fit shadow-default dark:border-strokedark dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-blue-50 ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col w-44 space-y-6 border-b border-stroke px-6 py-3 dark:border-strokedark">
          <li>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base text-black dark:text-white "
            >
              <FaRegUser size={20} />
              My Profile
            </Link>
          </li>
        </ul>
        <button
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base text-black dark:text-white "
          onClick={logoutHhandler}
        >
          <RiLogoutBoxLine size={20} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
