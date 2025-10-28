import Modal from "components/ui/modal";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({ className }: { className?: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <div className={`${className}`}>
      <div className="hidden md:flex border rounded-full border-black px-4 gap-2 p-2 items-center w-full ">
        <IoSearch size={22} />
        <input className="outline-none w-full text-sm" type="text" placeholder="Search" />
      </div>
      <button className="md:hidden p-2" onClick={handleOpen} aria-label="Open search modal">
        <IoSearch size={25} />
      </button>
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <div className="flex items-center gap-3 border border-gray-300 rounded-full p-3">
          <IoSearch size={22} className="text-gray-600" />
          <input type="text" placeholder="Search" className="w-full outline-none text-sm" />
        </div>
      </Modal>
    </div>
  );
};

export default SearchBar;
