"use client";

import { Herobanner, Card, Filters } from "@components";
import React, { useState, useMemo } from "react";
import { CategoryPageProps, Product } from "@/types/category";
import CategoryHeader from "@components/category/categoryHeader";

// Helper hook to generate filter options dynamically
const useFilterOptions = (allProducts: Product[]) => {
  return useMemo(() => {
    const typeSet = new Set<string>();
    const patternSet = new Set<string>();
    const compositionSet = new Set<string>();
    const widthSet = new Set<string>();
    const colourSet = new Set<string>();

    allProducts.forEach((product) => {
      if (product.parentSubcategoryUrl) typeSet.add(product.parentSubcategoryUrl);
      if (product.pattern) patternSet.add(product.pattern);
      if (product.composition) compositionSet.add(product.composition);
      if (product.width !== undefined) widthSet.add(`Up To ${product.width}cm Wide`);
      if (product.color) colourSet.add(product.color);
    });

    return {
      typeOptions: Array.from(typeSet),
      patternOptions: Array.from(patternSet),
      compositionOptions: Array.from(compositionSet),
      widthOptions: Array.from(widthSet),
      colourOptions: Array.from(colourSet).map((color) => ({ name: color, color })), // replace color with code if needed
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

  // ----- Filter States -----
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<string[]>([]);
  const [selectedComposition, setSelectedComposition] = useState<string[]>([]);
  const [selectedWidth, setSelectedWidth] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<[number, number]>([0, 1000]);
  const [selectedColour, setSelectedColour] = useState<string[]>([]);

  const subcategoryArray = Array.isArray(ProductList)
    ? ProductList
    : ProductList
      ? [ProductList]
      : [];

  // Flatten all products and add parentSubcategoryUrl
  const allProducts = useMemo(() => {
    return subcategoryArray.flatMap((subCat) =>
      (subCat.products || []).map((product) => ({
        ...product,
        parentSubcategoryUrl: subCat.slug,
      })),
    );
  }, [subcategoryArray]);

  // Get dynamic filter options
  const { typeOptions, patternOptions, compositionOptions, widthOptions, colourOptions } =
    useFilterOptions(allProducts);

  // ----- Filter Products -----
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
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

      const price = product.discountPrice ?? product.price ?? 0;
      if (price < selectedPrice[0] || price > selectedPrice[1]) return false;

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
  ]);

  // ----- Sort Products -----
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    const getPrice = (product: Product) => product.discountPrice ?? product.price ?? 0;

    if (sort === "low") products.sort((a, b) => getPrice(a) - getPrice(b));
    if (sort === "high") products.sort((a, b) => getPrice(b) - getPrice(a));
    if (sort === "new")
      products.sort(
        (a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
      );

    return products;
  }, [filteredProducts, sort]);

  return (
    <>
      <Herobanner
        desktopImage="/assets/images/category/desktop-banner.jpg"
        mobileImage="/assets/images/category/mobile-banner.png"
      />
      <div className="container mx-auto px-2 flex gap-6 xl:gap-10 mt-10">
        {/* Filters */}
        <div className="hidden lg:block lg:w-[25%]">
          <Filters
            typeOptions={typeOptions}
            patternOptions={patternOptions}
            compositionOptions={compositionOptions}
            widthOptions={widthOptions}
            colourOptions={colourOptions}
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
          />
        </div>

        {/* Product List */}
        <div className="w-full lg:w-[75%]">
          <CategoryHeader
            categoryName={categoryName}
            description={description}
            sort={sort}
            setSort={setSort}
            typeOptions={typeOptions}
            patternOptions={patternOptions}
            compositionOptions={compositionOptions}
            widthOptions={widthOptions}
            colourOptions={colourOptions}
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
          />
          <Card products={sortedProducts} categoryName={categoryName} categoryUrl={categoryUrl} />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
