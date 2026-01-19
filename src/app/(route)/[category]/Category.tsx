"use client";

import { HeroSection, Card, Filters, Toaster } from "@components";
import React, { useState, useMemo, Suspense } from "react";
import { CategoryPageProps, Product } from "@/types/category";
import CategoryHeader from "@components/category/categoryHeader";
import { useIndexedDb } from "@lib/useIndexedDb";
export type FilterOption = {
  name: string;
  count: number;
};

export type ColorFilterOption = {
  name: string;
  color: string;
  count: number;
};
const useFilterOptions = (allProducts: Product[]) => {
  return useMemo(() => {
    const counts = {
      type: {} as Record<string, number>,
      pattern: {} as Record<string, number>,
      material: {} as Record<string, number>,
      width: {} as Record<string, number>,
      color: {} as Record<string, number>,
      motorized: 0,
    };

    allProducts.forEach((product) => {
      // Helper to increment counts
      const increment = (obj: Record<string, number>, key: string | undefined | null) => {
        if (!key) return;
        obj[key] = (obj[key] || 0) + 1;
      };

      increment(counts.type, product.subcategoryName);
      increment(counts.pattern, product.pattern);
      increment(counts.material, product.material);

      if (product.maxWidth !== undefined) {
        increment(counts.width, `Up To ${product.maxWidth / 10}cm Wide`);
      }

      increment(counts.color, product.color);

      if (product.isMotorized) {
        counts.motorized += 1;
      }
    });
    const toOptionArray = (obj: Record<string, number>): FilterOption[] => {
      return Object.entries(obj).map(([name, count]) => ({ name, count }));
    };

    return {
      typeOptions: toOptionArray(counts.type),
      patternOptions: toOptionArray(counts.pattern),
      materialOptions: toOptionArray(counts.material),
      widthOptions: toOptionArray(counts.width),
      colorOptions: Object.entries(counts.color).map(([name, count]) => ({
        name,
        color: name,
        count,
      })),
      motorizedCount: counts.motorized,
    };
  }, [allProducts]);
};

const CategoryPage = ({ categoryName, description, ProductList }: CategoryPageProps) => {
  const [sort, setSort] = useState<"default" | "low" | "high" | "new">("default");

  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<string[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string[]>([]);
  const [selectedWidth, setSelectedWidth] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<[number, number]>([0, 1000]);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
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
          subcategoryName: subCat.name,
        })),
    );
  }, [subcategoryArray]);
  const {
    typeOptions,
    patternOptions,
    materialOptions,
    widthOptions,
    colorOptions,
    motorizedCount,
  } = useFilterOptions(allProducts);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (selectedMotorized && !product.isMotorized) return false;

      const type = product.subcategoryName ?? "";
      const pattern = product.pattern ?? "";
      const material = product.material ?? "";
      const color = product.color ?? "";

      const productWidthLabel =
        product.maxWidth !== undefined ? `Up To ${product.maxWidth / 10}cm Wide` : null;
      if (selectedType.length && !selectedType.includes(type)) return false;
      if (selectedPattern.length && !selectedPattern.includes(pattern)) return false;
      if (selectedMaterial.length && !selectedMaterial.includes(material)) return false;
      if (selectedWidth.length) {
        if (!productWidthLabel || !selectedWidth.includes(productWidthLabel)) {
          return false;
        }
      }

      if (selectedColor.length && !selectedColor.includes(color)) return false;
      const basePrice = product.price ?? 0;
      const finalPrice = selectedMotorized ? basePrice + (product.motorPrice ?? 0) : basePrice;
      if (finalPrice < selectedPrice[0] || finalPrice > selectedPrice[1]) return false;

      return true;
    });
  }, [
    allProducts,
    selectedType,
    selectedPattern,
    selectedMaterial,
    selectedWidth,
    selectedColor,
    selectedPrice,
    selectedMotorized,
  ]);

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    const getPrice = (product: Product) => {
      const base = product.price ?? 0;
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
      await addFreeSampleItem(product);
    } catch {
      Toaster("error", "Failed to add Free Sample!");
    }
  };

  return (
    <>
      <HeroSection
        desktopImage="/assets/images/category/desktop-banner.jpg"
        mobileImage="/assets/images/category/mobile-banner.png"
      />
      <div className="container mx-auto px-2 flex gap-6 xl:gap-10 mt-10">
        <div className="hidden lg:block lg:w-[25%]">
          <Filters
            typeOptions={typeOptions}
            patternOptions={patternOptions}
            materialOptions={materialOptions}
            widthOptions={widthOptions}
            colorOptions={colorOptions}
            motorizedCount={motorizedCount}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedPattern={selectedPattern}
            setSelectedPattern={setSelectedPattern}
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
            selectedWidth={selectedWidth}
            setSelectedWidth={setSelectedWidth}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
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
            typeOptions={typeOptions}
            patternOptions={patternOptions}
            materialOptions={materialOptions}
            widthOptions={widthOptions}
            colorOptions={colorOptions}
            motorizedCount={motorizedCount}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedPattern={selectedPattern}
            setSelectedPattern={setSelectedPattern}
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
            selectedWidth={selectedWidth}
            setSelectedWidth={setSelectedWidth}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            showTypeFilter={subcategoryArray.length > 1}
            selectedMotorized={selectedMotorized}
            setSelectedMotorized={setSelectedMotorized}
          />
          <Suspense fallback={<div>Loading Product ...</div>}>
            <Card
              products={sortedProducts}
              categoryName={categoryName}
              selectedMotorized={selectedMotorized}
              onFreeSample={handleFreeSample}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default React.memo(CategoryPage);
