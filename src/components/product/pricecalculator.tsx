import React from "react";

const PriceCalculator = () => {
  return (
    <div className="mt-6">
      <button className="bg-primary text-white font-semibold py-3 px-6 rounded-md w-full hover:bg-primary-dark transition">
        Get Price
      </button>

      <div className="mt-4 grid grid-cols-2 gap-4 text-center border-t pt-4">
        <div>
          <p className="font-medium">Tabby</p>
          <p className="text-sm text-gray-500">
            Pay in 4 interest-free payments of ₿1200
          </p>
        </div>
        <div>
          <p className="font-medium">Tamara</p>
          <p className="text-sm text-gray-500">
            Pay in 4 interest-free payments of ₿1200
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;
