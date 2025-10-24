import Modal from "components/ui/modal";
import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({ className }: { className?: string }) => {
  return (
    <div className={`${className}`}>
      <div className="hidden md:flex border rounded-full border-black px-4 gap-2 p-2 items-center w-full ">
        <IoSearch size={22} />
        <input
          className="outline-none w-full text-sm"
          type="text"
          placeholder="Search"
        />
      </div>
        <button className="md:hidden p-2">
        <IoSearch size={25} />
      </button>
  
    </div>
  );
};

export default SearchBar;
