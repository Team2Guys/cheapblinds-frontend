"use client";
import React, { useEffect, useRef, useState } from "react";
import HelpingModal from "./helping-modal";
import RecessSelector from "./Recess-select";
import { PaymentMethod } from "@/components";
import DeliveryIcon from "@components/svg/delivery";
import { RollerBlindsForm } from "./RollerBlindsForm";
import { RomanBlindsForm } from "./RomanBlindsForm";
import { CalculationForm } from "./CalculationForm";
import { showToast } from "@components/Toaster/Toaster";

const ProductInfo = ({ category }: { category: string }) => {
  const [showForm, setShowForm] = useState(false);
  const [recessType, setRecessType] = useState("outside");
  const topRef = useRef<HTMLDivElement>(null);
  const [calcValues, setCalcValues] = useState({
    width: "",
    height: "",
    unit: "cm",
  });

  useEffect(() => {
    if (showForm && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showForm]);

  const handleGetPrice = () => {
    if (!calcValues.width || !calcValues.height) {
      showToast("error", "Please enter width and height before getting the price.");
      return;
    }
    setShowForm(true);
  };

  return (
    <div className="space-y-6" ref={topRef}>
      {showForm && (
        <>
          {category === "roller-blinds" && (
            <RollerBlindsForm values={calcValues} recessType={recessType} />
          )}
          {category === "roman-blinds" && (
            <RomanBlindsForm values={calcValues} recessType={recessType} />
          )}
        </>
      )}

      <h2 className="font-medium">
        From: <span className="font-currency text-2xl md:text-3xl font-normal"></span>
        <span className="font-semibold text-2xl md:text-3xl">299.25</span>
      </h2>

      <p>
        A luxurious medium-weight chenille in a rose pink colourway, which makes Romans hang well
        and windows look great.
      </p>

      <CalculationForm onValuesChange={setCalcValues} />

      <HelpingModal />
      <RecessSelector selected={recessType} onChange={setRecessType} />

      <button
        onClick={handleGetPrice}
        className="bg-primary px-4 py-3 rounded-md w-full font-semibold cursor-pointer hover:bg-primary/80"
      >
        Get price
      </button>
      <PaymentMethod installments={200} showheading />
      <div className="bg-primary p-4 rounded-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left space-y-2">
          <h3 className="font-semibold">Not sure? Order a free sample</h3>
          <p>Dispatched the same day by first class post</p>
        </div>
        <button className="flex items-center gap-2 bg-white font-semibold px-6 py-2 rounded-md shadow hover:bg-gray-100 cursor-pointer whitespace-nowrap">
          <span className="bg-primary text-white h-6 w-6 flex items-center justify-center rounded-md">
            +
          </span>
          Free Sample
        </button>
      </div>
      <div className="border border-secondary p-4 rounded-md flex gap-4">
        <div className="relative w-10 h-10">
          <DeliveryIcon />
        </div>
        <div>
          <h3 className="font-medium text-xl">Delivery Policy</h3>
          <p>
            Free delivery on orders above 1000 in Dubai – no hidden charges, just doorstep
            convenience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
