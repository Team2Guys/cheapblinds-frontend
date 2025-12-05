"use client";

import { FaCheck } from "react-icons/fa";
import { Accordion, PriceSlider } from "@components";
import { useRef, useState } from "react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { ColorImage } from "@data/filter-colors";

type SectionKeys = "type" | "colour" | "width" | "pattern" | "composition" | "price" | "motorized";

type FiltersProps = {
  typeOptions: string[];
  patternOptions: string[];
  compositionOptions: string[];
  widthOptions: string[];
  colourOptions: { name: string; color: string }[];
  selectedType: string[];
  setSelectedType: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPattern: string[];
  setSelectedPattern: React.Dispatch<React.SetStateAction<string[]>>;
  selectedComposition: string[];
  setSelectedComposition: React.Dispatch<React.SetStateAction<string[]>>;
  selectedWidth: string[];
  setSelectedWidth: React.Dispatch<React.SetStateAction<string[]>>;
  selectedColour: string[];
  setSelectedColour: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPrice: [number, number];
  setSelectedPrice: React.Dispatch<React.SetStateAction<[number, number]>>;
  showTypeFilter?: boolean;
  selectedMotorized: boolean;
  setSelectedMotorized: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Filters = ({
  typeOptions,
  patternOptions,
  compositionOptions,
  widthOptions,
  colourOptions,
  selectedType,
  setSelectedType,
  selectedPattern,
  setSelectedPattern,
  selectedComposition,
  setSelectedComposition,
  selectedWidth,
  setSelectedWidth,
  selectedColour,
  setSelectedColour,
  selectedPrice,
  setSelectedPrice,
  showTypeFilter,
  selectedMotorized,
  setSelectedMotorized,
}: FiltersProps) => {
  const [openSections, setOpenSections] = useState<Record<SectionKeys, boolean>>({
    type: true,
    colour: true,
    width: true,
    pattern: true,
    composition: true,
    price: true,
    motorized: true,
  });

  const contentRefs = {
    type: useRef(null),
    colour: useRef(null),
    width: useRef(null),
    pattern: useRef(null),
    composition: useRef(null),
    price: useRef(null),
    motorized: useRef(null),
  };

  const toggleSection = (section: SectionKeys) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  function toggleSelection<T>(
    value: T,
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    state: T[],
  ) {
    setter(state.includes(value) ? state.filter((i) => i !== value) : [...state, value]);
  }
  const activeFilters = [
    ...selectedType.map((v) => ({ key: "type", label: v })),
    ...selectedPattern.map((v) => ({ key: "pattern", label: v })),
    ...selectedComposition.map((v) => ({ key: "composition", label: v })),
    ...selectedWidth.map((v) => ({ key: "width", label: v })),
    ...selectedColour.map((v) => ({ key: "colour", label: v })),
    ...(selectedMotorized ? [{ key: "motorized", label: "Motorized" }] : []),
    ...(selectedPrice[0] !== 0 || selectedPrice[1] !== 1000
      ? [{ key: "price", label: `AED${selectedPrice[0]} - AED${selectedPrice[1]}` }]
      : []),
  ];

  const removeFilter = (filter: { key: string; label: string }) => {
    switch (filter.key) {
      case "type":
        setSelectedType(selectedType.filter((v) => v !== filter.label));
        break;
      case "pattern":
        setSelectedPattern(selectedPattern.filter((v) => v !== filter.label));
        break;
      case "composition":
        setSelectedComposition(selectedComposition.filter((v) => v !== filter.label));
        break;
      case "width":
        setSelectedWidth(selectedWidth.filter((v) => v !== filter.label));
        break;
      case "colour":
        setSelectedColour(selectedColour.filter((v) => v !== filter.label));
        break;
      case "motorized":
        setSelectedMotorized(false);
        break;
      case "price":
        setSelectedPrice([0, 1000]);
        break;
    }
  };

  const getColorImage = (color: string) => {
    const found = ColorImage.find((c) => c.color.toLowerCase() === color.toLowerCase());
    return found ? found.image : "/assets/images/colors/white.png";
  };

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

      {/* Active Filters */}
      <div>
        <p className="font-rubik text-xl font-medium">Active filters</p>
        <div className="flex flex-wrap gap-2 pt-4">
          {activeFilters.map((filter) => (
            <div
              key={`${filter.key}-${filter.label}`}
              className="border border-primary rounded-md h-10 flex items-center px-3 font-semibold relative capitalize cursor-pointer"
            >
              {filter.label}
              <span
                className="flex justify-center items-center h-4 w-4 bg-primary text-white rounded-full ml-2 cursor-pointer absolute -top-2 -right-2"
                onClick={() => removeFilter(filter)}
              >
                <RxCross2 size={12} />
              </span>
            </div>
          ))}
        </div>
      </div>
      <Accordion
        title="Motorised"
        sectionKey="motorized"
        openSections={openSections}
        toggleSection={toggleSection}
        refObj={contentRefs.motorized}
      >
        <div className="flex flex-col gap-4 pt-4">
          <button
            onClick={() => setSelectedMotorized(!selectedMotorized)}
            className="flex items-center gap-2 capitalize cursor-pointer"
          >
            <span
              className={`border rounded-sm w-4 h-4 flex justify-center items-center text-[10px] ${
                selectedMotorized ? "border-primary bg-primary text-white" : "border-black"
              }`}
            >
              {selectedMotorized && <FaCheck />}
            </span>
            <p>Motorised Products</p>
          </button>
        </div>
      </Accordion>
      {showTypeFilter && (
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
                className="flex items-center gap-2 capitalize cursor-pointer"
              >
                <span
                  className={`border rounded-sm w-4 h-4 flex justify-center items-center text-[10px] ${selectedType.includes(item) ? "border-primary bg-primary text-white" : "border-black"}`}
                >
                  {selectedType.includes(item) && <FaCheck />}
                </span>
                <p>{item}</p>
              </button>
            ))}
          </div>
        </Accordion>
      )}

      <Accordion
        title="Colour"
        sectionKey="colour"
        openSections={openSections}
        toggleSection={toggleSection}
        refObj={contentRefs.colour}
      >
        <div className="flex flex-col gap-4 pt-4">
          {colourOptions.map((item) => {
            const isSelected = selectedColour.includes(item.name);
            return (
              <button
                key={item.name}
                onClick={() => toggleSelection(item.name, setSelectedColour, selectedColour)}
                className="flex items-center gap-3 capitalize cursor-pointer"
              >
                <span
                  className={`border rounded-sm w-4 h-4 flex justify-center items-center text-[10px] ${
                    isSelected ? "border-primary bg-primary text-white" : "border-black"
                  }`}
                >
                  {isSelected && <FaCheck />}
                </span>
                <Image
                  src={getColorImage(item.name)}
                  alt={item.name}
                  width={30}
                  height={30}
                  className=" object-cover"
                />
                <p>{item.name}</p>
              </button>
            );
          })}
        </div>
      </Accordion>

      <Accordion
        title="Width"
        sectionKey="width"
        openSections={openSections}
        toggleSection={toggleSection}
        refObj={contentRefs.width}
      >
        <div className="flex flex-col gap-4 pt-4 ">
          {widthOptions.map((item) => (
            <button
              key={item}
              onClick={() => toggleSelection(item, setSelectedWidth, selectedWidth)}
              className="flex items-center gap-2 capitalize cursor-pointer"
            >
              <span
                className={`border rounded-sm w-4 h-4 flex justify-center items-center text-[10px] ${selectedWidth.includes(item) ? "border-primary bg-primary text-white" : "border-black"}`}
              >
                {selectedWidth.includes(item) && <FaCheck />}
              </span>
              <p>{item}</p>
            </button>
          ))}
        </div>
      </Accordion>

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
              className="flex items-center gap-2 capitalize cursor-pointer"
            >
              <span
                className={`border rounded-sm w-4 h-4 flex justify-center items-center text-[10px] ${selectedPattern.includes(item) ? "border-primary bg-primary text-white" : "border-black"}`}
              >
                {selectedPattern.includes(item) && <FaCheck />}
              </span>
              <p>{item}</p>
            </button>
          ))}
        </div>
      </Accordion>

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
              className="flex items-center gap-2 capitalize cursor-pointer"
            >
              <span
                className={`border rounded-sm w-4 h-4 flex justify-center items-center text-[10px] ${selectedComposition.includes(item) ? "border-primary bg-primary text-white" : "border-black"}`}
              >
                {selectedComposition.includes(item) && <FaCheck />}
              </span>
              <p>{item}</p>
            </button>
          ))}
        </div>
      </Accordion>

      <Accordion
        title="Price Range"
        sectionKey="price"
        openSections={openSections}
        toggleSection={toggleSection}
        refObj={contentRefs.price}
      >
        <div className="pt-4 mx-auto px-8">
          <PriceSlider selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice} />
        </div>
      </Accordion>
    </div>
  );
};
