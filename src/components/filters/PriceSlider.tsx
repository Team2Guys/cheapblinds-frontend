"use client";
import { useState } from "react";

export const PriceSlider = () => {
  const [range, setRange] = useState<[number, number]>([315, 800]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = Number(e.target.value);
    setRange((prev) => {
      const updated = [...prev] as [number, number];
      updated[index] = value;
      return updated[0] > updated[1] ? [updated[1], updated[0]] : updated;
    });
  };

  const min = 0;
  const max = 1000;

  return (
    <div className="relative w-full py-14">
      <div
        className="absolute top-2 left-[calc(var(--left)*1%)] transform -translate-x-1/2"
        style={{
          ["--left" as string]: ((range[0] - min) / (max - min)) * 100,
        }}
      >
        <div className="relative bg-primary text-white px-4 py-1 text-nowrap z-20">
          AED {range[0]}
          <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px]  border-l-transparent border-r-transparent border-t-primary" />
        </div>
      </div>

      <div className="relative h-0.5 bg-gray-200 rounded">
        <div
          className="absolute h-0.5 bg-primary rounded"
          style={{
            left: `${((range[0] - min) / (max - min)) * 100}%`,
            right: `${100 - ((range[1] - min) / (max - min)) * 100}%`,
          }}
        />

        {/* Two range inputs (for left and right thumbs) */}
        <input
          type="range"
          min={min}
          max={max}
          value={range[0]}
          onChange={(e) => handleChange(e, 0)}
          className="absolute w-full appearance-none bg-transparent pointer-events-none"
          style={{ zIndex: range[0] > range[1] ? 5 : 3 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={range[1]}
          onChange={(e) => handleChange(e, 1)}
          className="absolute w-full appearance-none bg-transparent pointer-events-none"
          style={{ zIndex: range[0] > range[1] ? 3 : 5 }}
        />

        {/* eslint-disable-next-line */}
        <style jsx>
          {`
            input[type="range"] {
              pointer-events: none;
            }
            input[type="range"]::-webkit-slider-thumb {
              pointer-events: all;
              -webkit-appearance: none;
              height: 10px;
              width: 10px;
              border-radius: 50%;
              background: #ffc107;
              box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
              margin-top: -5px;
            }
            input[type="range"]::-moz-range-thumb {
              pointer-events: all;
              height: 10px;
              width: 10px;
              border-radius: 50%;
              background: #ffc107;
              border: none;
              box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
            }
            input[type="range"]::-webkit-slider-runnable-track {
              height: 1px;
              background: transparent;
            }
            input[type="range"]::-moz-range-track {
              height: 1px;
              background: transparent;
            }
          `}
        </style>
      </div>
    </div>
  );
};
