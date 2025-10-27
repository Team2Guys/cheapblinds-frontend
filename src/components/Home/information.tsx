import { infoItems } from "data/home";
import Image from "next/image";
import React from "react";

const Information = () => {
  return (
    <div className="container mx-auto hidden md:grid md:grid-cols-5">
      {infoItems.map((item, index) => (
        <div
          key={item.id}
          className={`flex flex-col items-center justify-center text-center py-4 lg:py-6 px-4 ${
            index % 2 === 0 ? "bg-primary-light" : "bg-primary text-white"
          }`}
        >
          <div className="relative w-16 h-16 md:w-24 lg:h-24 mb-3">
            <Image
              src={item.image}
              alt={item.text}
              fill
              className="object-contain"
            />
          </div>
          <p className="font-semibold">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Information;
