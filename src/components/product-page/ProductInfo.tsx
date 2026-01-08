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
import { FabricPrice, Product } from "@/types/category";
import { useIndexedDb } from "@lib/useIndexedDb";
import { fetchFabricPrice, fetchOptionsPrice } from "@config/fetch";
import { buildOptionSections, OptionSection } from "@utils/helperFunctions";

interface ProductDetailProps {
  categorySlug: string;
  price?: number | null;
  shortDescription?: string;
  product: Product;
}

export const ProductInfo = ({
  categorySlug,
  price,
  shortDescription,
  product,
}: ProductDetailProps) => {
  const topRef = useRef<HTMLDivElement>(null);

  const [showForm, setShowForm] = useState(false);
  const [recessType, setRecessType] = useState("outside");
  const [loading, setLoading] = useState(false);
  const [optionSections, setOptionSections] = useState<OptionSection[]>([]);
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
      Toaster("error", "Please enter width and drop.");
      return;
    }

    if (!product.fabricId || !product.blindTypeId) {
      Toaster("error", "Invalid product configuration.");
      return;
    }

    setLoading(true);

    try {
      const pricingInput = {
        width: toMM(draftValues.width, draftValues.unit),
        drop: toMM(draftValues.drop, draftValues.unit),
        fabricId: Number(product.fabricId),
        blindTypeId: Number(product.blindTypeId),
      };

      const [fabricRes, optionsRes] = await Promise.all([
        fetchFabricPrice(pricingInput),
        fetchOptionsPrice(pricingInput),
      ]);

      if (!fabricRes) throw new Error("No price returned");

      setFinalPrice(fabricRes);
      setOptionSections(
        buildOptionSections(
          categorySlug as "roller-blinds" | "roman-blinds" | "zebra-blinds" | "vertical-blinds",
          optionsRes ?? [],
        ),
      );
      setConfirmedValues(draftValues);
      setShowForm(true);
    } catch {
      Toaster("error", "Failed to calculate price");
    } finally {
      setLoading(false);
    }
  };

  const handleFreeSample = async (product: Product) => {
    try {
      await addFreeSampleItem(product);
    } catch {
      Toaster("error", "Failed to add Free Sample!");
    }
  };

  return (
    <div className="space-y-6" ref={topRef}>
      {showForm && confirmedValues && (
        <RomanBlindsForm
          values={confirmedValues}
          finalPrice={finalPrice}
          recessType={recessType}
          optionSections={optionSections}
          productList={product}
        />
      )}

      <h2 className="flex items-center gap-2 font-semibold text-2xl md:text-3xl">
        From
        <span className="font-currency font-normal"></span>
        <span>{price}</span>
      </h2>

      <p>{shortDescription}</p>

      <CalculationForm
        minDrop={product.minDrop}
        maxDrop={product.maxDrop}
        minWidth={product.minWidth}
        maxWidth={product.maxWidth}
        onValuesChange={setDraftValues}
      />

      <HelpingModal />
      <RecessSelector selected={recessType} onChange={setRecessType} />

      <button
        onClick={handleGetPrice}
        disabled={loading}
        className="bg-primary px-4 py-3 rounded-md w-full font-semibold hover:bg-primary/80 disabled:opacity-60 cursor-pointer"
      >
        {loading ? "Calculating..." : "Get price"}
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
