// ProductInfo.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  HelpingModal,
  RecessSelector,
  RomanBlindsForm,
  CalculationForm,
  PaymentMethod,
} from "@components";
import DeliveryIcon from "@components/svg/delivery";
import { Toaster } from "@components";
import { FabricPrice, OptionsPrice, Product } from "@/types/category";
import { useIndexedDb } from "@lib/useIndexedDb";
import { fetchFabricPrice, fetchOptionsPrice } from "@config/fetch";

interface ProductDetailProps {
  categorySlug: string;
  price?: number | null;
  shortDescription?: string;
  product: Product;
}

export const ProductInfo = ({ categorySlug, price, shortDescription, product }: ProductDetailProps) => {
  const topRef = useRef<HTMLDivElement>(null);

  const [showForm, setShowForm] = useState(false);
  const [recessType, setRecessType] = useState("outside");
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [optionsPrice, setOptionsPrice] = useState<OptionsPrice[] | null>(null);
  const [draftValues, setDraftValues] = useState({
    width: "",
    drop: "",
    unit: "cm",
  });

  const [confirmedValues, setConfirmedValues] = useState<{
    width: string;
    drop: string;
    unit: string;
  } | null>(null);

  const [finalPrice, setFinalPrice] = useState<FabricPrice | null>(null);

  const { addFreeSampleItem } = useIndexedDb();

  useEffect(() => {
    if (showForm) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showForm]);
const toMM = (value: string, unit: string) => {
  const num = Number(value);
  if (unit === "cm") return num * 10;
  if (unit === "Inches") return num * 25.4; 
  return num;   
};
const handleGetPrice = async () => {
  if (!draftValues.width || !draftValues.drop) {
    Toaster("error", "Please enter width and drop before getting the price.");
    return;
  }

  if (!product?.fabricId || !product?.blindTypeId) {
    Toaster("error", "Invalid product configuration.");
    return;
  }

  setLoadingPrice(true);

  try {
    const widthMM = toMM(draftValues.width, draftValues.unit);
    const dropMM = toMM(draftValues.drop, draftValues.unit);

    const pricingInput = {
      width: widthMM,
      drop: dropMM,
      fabricId: Number(product.fabricId),
      blindTypeId: Number(product.blindTypeId),
    };

    const [fabricResponse, optionsResponse] = await Promise.all([
      fetchFabricPrice(pricingInput),
      fetchOptionsPrice(pricingInput),
    ]);

    if (!fabricResponse) {
      Toaster("error", "No fabric price returned");
      return;
    }

    setFinalPrice(fabricResponse);
    setOptionsPrice(optionsResponse ?? []);
    setConfirmedValues(draftValues);
    setShowForm(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error(error);
    Toaster("error", "Failed to calculate price");
  } finally {
    setLoadingPrice(false);
  }
};


  const handleFreeSample = async (product: Product) => {
    try {
      await addFreeSampleItem(product, categorySlug || "");
    } catch {
      Toaster("error", "Failed to add Free Sample!");
    }
  };

  console.log(optionsPrice,"optionsPriceoptionsPrice")
  console.log(finalPrice,"finalPricefinalPrice")


  return (
    <div className="space-y-6" ref={topRef}>
      {showForm && confirmedValues && (
        <RomanBlindsForm  categorySlug={categorySlug} values={confirmedValues} finalPrice={finalPrice} recessType={recessType} />
      )}

      <h2 className="flex items-center gap-2 font-semibold text-2xl md:text-3xl">
        From
        <span className="font-currency font-normal"></span>
        <span>{price}</span>
      </h2>

      <p>{shortDescription}</p>

      <CalculationForm
        minHeight={product.minHeight}
        maxHeight={product.maxHeight}
        minWidth={product.minWidth}
        maxWidth={product.maxWidth}
        onValuesChange={setDraftValues}
      />

      <HelpingModal />
      <RecessSelector selected={recessType} onChange={setRecessType} />

      <button
        onClick={handleGetPrice}
        disabled={loadingPrice}
        className="bg-primary px-4 py-3 rounded-md w-full font-semibold hover:bg-primary/80 disabled:opacity-60 cursor-pointer"
      >
        {loadingPrice ? "Calculating..." : "Get price"}
      </button>

      <PaymentMethod installments={200} showHeading />

      <div className="bg-primary p-4 rounded-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-2">
          <h3 className="font-semibold">Not sure? Order a free sample</h3>
          <p>Dispatched the same day by first class post</p>
        </div>

        <button
          className="flex items-center gap-2 bg-white font-semibold px-6 py-2 rounded-md shadow hover:bg-gray-100"
          onClick={() => handleFreeSample(product)}
        >
          <span className="bg-primary text-white h-6 w-6 flex items-center justify-center rounded-md">
            +
          </span>
          Free Sample
        </button>
      </div>

      <div className="border border-secondary p-4 rounded-md flex gap-4">
        <div className="w-10 h-10">
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
