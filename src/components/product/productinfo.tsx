import React from "react";

const ProductInfo = () => {
  return (
    <div className="w-full md:w-1/2 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-gray-800">Luft Noir Screen Roller Blinds</h1>
      <p className="text-gray-500">
        A luxurious medium-weight chenille in a rose pink colourway, which makes Romans hang well
        and windows look great.
      </p>
      <p className="text-xl font-bold text-primary">From: ₿ 299.25</p>

      <div className="flex flex-col gap-3">
        <div>
          <p className="text-sm font-medium text-gray-600">Units</p>
          <div className="flex gap-3 mt-1">
            {["mm", "cm", "inches"].map((unit) => (
              <button
                key={unit}
                className="border rounded-md px-4 py-1 hover:bg-primary hover:text-white transition"
              >
                {unit}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Width (cm)</label>
            <input type="number" placeholder="300" className="border rounded-md px-3 py-2 w-32" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Height (cm)</label>
            <input type="number" placeholder="300" className="border rounded-md px-3 py-2 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
