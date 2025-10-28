"use client";
import React, { useState } from "react";
import Image from "next/image";

const FittingTypeSelector = () => {
  const [selected, setSelected] = useState("outside");

  return (
    <div className="flex flex-col gap-3 mt-4">
      <h3 className="font-semibold text-gray-800">Choose Fitting Type</h3>
      <div className="flex gap-6">
        {[
          { id: "outside", label: "Outside Recess", img: "/fitting-outside.jpg" },
          { id: "inside", label: "Inside Recess", img: "/fitting-inside.jpg" },
        ].map((item) => (
          <div
            key={item.id}
            className={`border-2 rounded-md overflow-hidden cursor-pointer transition ${
              selected === item.id ? "border-primary" : "border-gray-200"
            }`}
            onClick={() => setSelected(item.id)}
          >
            <div className="relative w-32 h-28">
              <Image src={item.img} alt={item.label} fill className="object-cover" />
            </div>
            <p className="text-center text-sm font-medium py-1">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FittingTypeSelector;
