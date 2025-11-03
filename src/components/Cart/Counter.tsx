import React from "react";
import { HiMiniMinus, HiMiniPlus } from "react-icons/hi2";

interface CounterProps {
  quantity: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

const Counter = ({ quantity, handleIncrement, handleDecrement }: CounterProps) => {
  return (
    <div className="flex gap-1 items-center justify-center">
      <button
        className="bg-primary rounded-full p-1 disabled:opacity-50 cursor-pointer"
        disabled={quantity <= 1}
        onClick={handleDecrement}
      >
        <HiMiniMinus />
      </button>

      <div className="h-8 w-8 flex items-center justify-center">{quantity}</div>

      <button className="bg-primary rounded-full p-1 cursor-pointer" onClick={handleIncrement}>
        <HiMiniPlus />
      </button>
    </div>
  );
};

export default Counter;
