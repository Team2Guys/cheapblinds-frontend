"use client";

import { Herobanner, Card, Filters, Toaster } from "@components";
import React, { useState, useMemo } from "react";
import { CategoryPageProps, Product } from "@/types/category";
import CategoryHeader from "@components/category/categoryHeader";
import { useIndexedDb } from "@lib/useIndexedDb";

// --- HELPER TYPES FOR FILTERS ---
export type FilterOption = {
  name: string;
  count: number;
};

export type ColorFilterOption = {
  name: string;
  color: string;
  count: number;
};

// --- UPDATED HOOK TO CALCULATE COUNTS ---
const useFilterOptions = (allProducts: Product[]) => {
  return useMemo(() => {
    const counts = {
      type: {} as Record<string, number>,
      pattern: {} as Record<string, number>,
      composition: {} as Record<string, number>,
      width: {} as Record<string, number>,
      colour: {} as Record<string, number>,
      motorized: 0,
    };

    allProducts.forEach((product) => {
      // Helper to increment counts
      const increment = (obj: Record<string, number>, key: string | undefined | null) => {
        if (!key) return;
        obj[key] = (obj[key] || 0) + 1;
      };

      increment(counts.type, product.parentSubcategoryUrl);
      increment(counts.pattern, product.pattern);
      increment(counts.composition, product.composition);

      if (product.width !== undefined) {
        increment(counts.width, `Up To ${product.width}cm Wide`);
      }

      increment(counts.colour, product.color);

      if (product.isMotorized) {
        counts.motorized += 1;
      }
    });

    // Helper to convert map to array
    const toOptionArray = (obj: Record<string, number>): FilterOption[] => {
      return Object.entries(obj).map(([name, count]) => ({ name, count }));
    };

    return {
      typeOptions: toOptionArray(counts.type),
      patternOptions: toOptionArray(counts.pattern),
      compositionOptions: toOptionArray(counts.composition),
      widthOptions: toOptionArray(counts.width),
      colourOptions: Object.entries(counts.colour).map(([name, count]) => ({
        name,
        color: name, // Assuming color code/name matches, or you can look it up
        count,
      })),
      motorizedCount: counts.motorized,
    };
  }, [allProducts]);
};

const CategoryPage = ({
  categoryName,
  description,
  categoryUrl,
  ProductList,
}: CategoryPageProps) => {
  const [sort, setSort] = useState<"default" | "low" | "high" | "new">("default");

  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<string[]>([]);
  const [selectedComposition, setSelectedComposition] = useState<string[]>([]);
  const [selectedWidth, setSelectedWidth] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<[number, number]>([0, 1000]);
  const [selectedColour, setSelectedColour] = useState<string[]>([]);
  const [selectedMotorized, setSelectedMotorized] = useState<boolean>(false);
  const { addFreeSampleItem } = useIndexedDb();

  const subcategoryArray = Array.isArray(ProductList)
    ? ProductList.filter((sub) => sub.status === "PUBLISHED")
    : ProductList && ProductList.status === "PUBLISHED"
      ? [ProductList]
      : [];

  const allProducts = useMemo(() => {
    return subcategoryArray.flatMap((subCat) =>
      (subCat.products || [])
        .filter((product) => product.status === "PUBLISHED")
        .map((product) => ({
          ...product,
          parentSubcategoryUrl: subCat.slug,
        })),
    );
  }, [subcategoryArray]);
  const {
    typeOptions,
    patternOptions,
    compositionOptions,
    widthOptions,
    colourOptions,
    motorizedCount,
  } = useFilterOptions(allProducts);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (selectedMotorized && !product.isMotorized) return false;

      const type = product.parentSubcategoryUrl ?? "";
      const pattern = product.pattern ?? "";
      const composition = product.composition ?? "";
      const color = product.color ?? "";
      const width = product.width ?? 0;

      if (selectedType.length && !selectedType.includes(type)) return false;
      if (selectedPattern.length && !selectedPattern.includes(pattern)) return false;
      if (selectedComposition.length && !selectedComposition.includes(composition)) return false;
      if (selectedWidth.length && !selectedWidth.some((w) => w.includes(String(width))))
        return false;
      if (selectedColour.length && !selectedColour.includes(color)) return false;

      const basePrice = product.discountPrice ?? product.price ?? 0;
      const finalPrice = selectedMotorized ? basePrice + (product.motorPrice ?? 0) : basePrice;

      if (finalPrice < selectedPrice[0] || finalPrice > selectedPrice[1]) return false;

      return true;
    });
  }, [
    allProducts,
    selectedType,
    selectedPattern,
    selectedComposition,
    selectedWidth,
    selectedColour,
    selectedPrice,
    selectedMotorized,
  ]);

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    const getPrice = (product: Product) => {
      const base = product.discountPrice ?? product.price ?? 0;
      return selectedMotorized ? base + (product.motorPrice ?? 0) : base;
    };

    if (sort === "low") products.sort((a, b) => getPrice(a) - getPrice(b));
    if (sort === "high") products.sort((a, b) => getPrice(b) - getPrice(a));
    if (sort === "new")
      products.sort(
        (a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
      );

    return products;
  }, [filteredProducts, sort, selectedMotorized]);

  const handleFreeSample = async (product: Product) => {
    try {
      await addFreeSampleItem(product, categoryUrl || "");
    } catch (err) {
      console.error(err);
      Toaster("error", "Failed to add Free Sample!");
    }
  };

  return (
    <>
      <Herobanner
        desktopImage="/assets/images/category/desktop-banner.jpg"
        mobileImage="/assets/images/category/mobile-banner.png"
      />
      <div className="container mx-auto px-2 flex gap-6 xl:gap-10 mt-10">
        <div className="hidden lg:block lg:w-[25%]">
          <Filters
            typeOptions={typeOptions}
            patternOptions={patternOptions}
            compositionOptions={compositionOptions}
            widthOptions={widthOptions}
            colourOptions={colourOptions}
            motorizedCount={motorizedCount} // Pass motorized count
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedPattern={selectedPattern}
            setSelectedPattern={setSelectedPattern}
            selectedComposition={selectedComposition}
            setSelectedComposition={setSelectedComposition}
            selectedWidth={selectedWidth}
            setSelectedWidth={setSelectedWidth}
            selectedColour={selectedColour}
            setSelectedColour={setSelectedColour}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            showTypeFilter={subcategoryArray.length > 1}
            selectedMotorized={selectedMotorized}
            setSelectedMotorized={setSelectedMotorized}
          />
        </div>

        <div className="w-full lg:w-[75%]">
          <CategoryHeader
            categoryName={categoryName}
            description={description}
            sort={sort}
            setSort={setSort}
            // Note: If CategoryHeader uses these props, you need to update its types as well,
            // otherwise pass the raw strings like: typeOptions.map(t => t.name)
            typeOptions={typeOptions}
            patternOptions={patternOptions}
            compositionOptions={compositionOptions}
            widthOptions={widthOptions}
            colourOptions={colourOptions}
            motorizedCount={motorizedCount}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedPattern={selectedPattern}
            setSelectedPattern={setSelectedPattern}
            selectedComposition={selectedComposition}
            setSelectedComposition={setSelectedComposition}
            selectedWidth={selectedWidth}
            setSelectedWidth={setSelectedWidth}
            selectedColour={selectedColour}
            setSelectedColour={setSelectedColour}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            showTypeFilter={subcategoryArray.length > 1}
            selectedMotorized={selectedMotorized}
            setSelectedMotorized={setSelectedMotorized}
          />
          <Card
            products={sortedProducts}
            categoryName={categoryName}
            categoryUrl={categoryUrl}
            selectedMotorized={selectedMotorized}
            onFreeSample={handleFreeSample}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
