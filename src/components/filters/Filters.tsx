"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { FaCheck } from "react-icons/fa";
import PriceSlider from "./PriceSlider";
import Accordion from "components/ui/Accordion";
import { RxCross2 } from "react-icons/rx";

type SectionKeys = "type" | "colour" | "width" | "pattern" | "composition" | "price";

const Filters = () => {
  const [selectedPattern, setSelectedPattern] = useState<string[]>([]);
  const [selectedComposition, setSelectedComposition] = useState<string[]>([]);
  const [selectedWidth, setSelectedWidth] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);

  const [openSections, setOpenSections] = useState<Record<SectionKeys, boolean>>({
    type: true,
    colour: true,
    width: true,
    pattern: true,
    composition: true,
    price: true,
  });

  const contentRefs = {
    type: useRef(null),
    colour: useRef(null),
    width: useRef(null),
    pattern: useRef(null),
    composition: useRef(null),
    price: useRef(null),
  };

  const toggleSection = (section: SectionKeys) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleSelection = <T,>(
    value: T,
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    state: T[],
  ) => {
    setter(state.includes(value) ? state.filter((i) => i !== value) : [...state, value]);
  };

  const patternOptions = ["Flowers", "Geometric", "Plains & Textures"];
  const compositionOptions = ["Polyester", "Polyester Mix"];
  const widthOptions = [
    "Up To 200cm Wide (1554)",
    "Up To 250cm Wide (736)",
    "Up To 280cm Wide (624)",
  ];
  const typeOptions = ["Blackout", "Visible", "Dim-Out"];

  const colourOptions = [
    { name: "Cream", count: 1554, color: "#FFFDD0" },
    { name: "Grey", count: 1554, color: "#808080" },
    { name: "Natural", count: 624, color: "#E0D5C6" },
    { name: "Yellow", count: 195, color: "#FFFF00" },
  ];

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center gap-4 border-b border-[#0000003D] px-2 pb-1">
        <Image
          src="/assets/images/category/filter-lighting.png"
          alt="icon"
          width={32}
          height={32}
        />
        <p>Express delivery</p>
      </div>
      <div>
        <p className="font-rubik text-xl font-medium">Active filters</p>
        <div className="flex flex-wrap gap-2 pt-4">
          <div className="border border-primary rounded-md w-36 h-10 flex justify-center items-center font-semibold relative">
            Light Filtering
            <span className="flex justify-center items-center h-4 w-4 bg-primary text-white rounded-full absolute -top-2 -right-2">
              <RxCross2 size={12} />
            </span>
          </div>
        </div>
      </div>

      {/* ---------- Type ---------- */}
      <Accordion
        title="Type"
        sectionKey="type"
        openSections={openSections}
        toggleSection={toggleSection}
        refObj={contentRefs.type}
      >
        <div className="flex flex-col gap-4 pt-4">
          {typeOptions.map((item) => (
            <button
              key={item}
              onClick={() => toggleSelection(item, setSelectedType, selectedType)}
              className="flex items-center gap-2"
            >
              <span
                className={`border rounded-sm w-4 h-4 flex justify-center items-center text-[10px] ${
                  selectedType.includes(item)
                    ? "border-primary bg-primary text-white"
                    : "border-black"
                }`}
              >
                {selectedType.includes(item) && <FaCheck />}
              </span>

              <Image
                src={`/assets/images/category/${item.replace(" ", "")}.png`}
                alt={item}
                width={32}
                height={32}
              />

              <p>{item}</p>
            </button>
          ))}
        </div>
      </Accordion>

      {/* ---------- Colour ---------- */}
      <Accordion
        title="Colour"
        sectionKey="colour"
        openSections={openSections}
        toggleSection={toggleSection}
        refObj={contentRefs.colour}
      >
        <div className="flex flex-col gap-4 pt-4">
          {colourOptions.map((item) => (
            <button key={item.name} className="flex items-center gap-3">
              <span className="jagged-shape w-8 h-8" style={{ background: item.color }}></span>
              <p>
                {item.name} ({item.count})
              </p>
            </button>
          ))}
        </div>
      </Accordion>

      {/* ---------- Width ---------- */}
      <Accordion
        title="Width Available"
        sectionKey="width"
        openSections={openSections}
        toggleSection={toggleSection}
        refObj={contentRefs.width}
      >
        <div className="flex flex-col gap-4 pt-4">
          {widthOptions.map((item) => (
            <button
              key={item}
              onClick={() => toggleSelection(item, setSelectedWidth, selectedWidth)}
              className="flex items-center gap-2"
            >
              <span
                className={`border rounded-sm w-4 h-4 flex justify-center items-center text-[10px] ${
                  selectedWidth.includes(item)
                    ? "border-primary bg-primary text-white"
                    : "border-black"
                }`}
              >
                {selectedWidth.includes(item) && <FaCheck />}
              </span>
              <p>{item}</p>
            </button>
          ))}
        </div>
      </Accordion>

      {/* ---------- Pattern ---------- */}
      <Accordion
        title="Pattern"
        sectionKey="pattern"
        openSections={openSections}
        toggleSection={toggleSection}
        refObj={contentRefs.pattern}
      >
        <div className="flex flex-col gap-4 pt-4">
          {patternOptions.map((item) => (
            <button
              key={item}
              onClick={() => toggleSelection(item, setSelectedPattern, selectedPattern)}
              className="flex items-center gap-2"
            >
              <span
                className={`border rounded-sm w-4 h-4 flex justify-center items-center text-[10px] ${
                  selectedPattern.includes(item)
                    ? "border-primary bg-primary text-white"
                    : "border-black"
                }`}
              >
                {selectedPattern.includes(item) && <FaCheck />}
              </span>
              <p>{item}</p>
            </button>
          ))}
        </div>
      </Accordion>

      {/* ---------- Composition ---------- */}
      <Accordion
        title="Composition"
        sectionKey="composition"
        openSections={openSections}
        toggleSection={toggleSection}
        refObj={contentRefs.composition}
      >
        <div className="flex flex-col gap-4 pt-4">
          {compositionOptions.map((item) => (
            <button
              key={item}
              onClick={() => toggleSelection(item, setSelectedComposition, selectedComposition)}
              className="flex items-center gap-2"
            >
              <span
                className={`border rounded-sm w-4 h-4 flex justify-center items-center text-[10px] ${
                  selectedComposition.includes(item)
                    ? "border-primary bg-primary text-white"
                    : "border-black"
                }`}
              >
                {selectedComposition.includes(item) && <FaCheck />}
              </span>
              <p>{item}</p>
            </button>
          ))}
        </div>
      </Accordion>

      {/* ---------- Price ---------- */}
      <Accordion
        title="Price Range"
        sectionKey="price"
        openSections={openSections}
        toggleSection={toggleSection}
        refObj={contentRefs.price}
      >
        <div className="pt-4 w-[250px] mx-auto">
          <PriceSlider />
        </div>
      </Accordion>
    </div>
  );
};

export default Filters;
