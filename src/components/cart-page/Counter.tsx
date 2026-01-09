import React from "react";
import { HiMiniMinus, HiMiniPlus } from "react-icons/hi2";

export const Counter = ({
  increase,
  decrease,
  quantity,
}: {
  increase: () => void;
  decrease: () => void;
  quantity: number;
}) => {
  return (
    <div className="flex gap-1 items-center justify-center">
      <button
        className="bg-primary rounded-full p-1 disabled:opacity-50 cursor-pointer"
        onClick={decrease}
      >
        <HiMiniMinus />
      </button>

      <div className="h-8 w-8 flex items-center justify-center">{quantity}</div>

      <button className="bg-primary rounded-full p-1 cursor-pointer" onClick={increase}>
        <HiMiniPlus />
      </button>
    </div>
  );
};
