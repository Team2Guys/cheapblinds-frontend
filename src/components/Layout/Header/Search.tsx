"use client";

import { Modal } from "@components";
import { queryData } from "@config/fetch";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import { PRODUCT_BY_SEARCH } from "@graphql";
import { Product } from "@/types/category";
import Image from "next/image";

/* ---------------------------------- */
/* Debounce Hook */
/* ---------------------------------- */
function useDebounce<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/* ---------------------------------- */
/* Main Component */
/* ---------------------------------- */
const SearchBar = ({ className }: { className?: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(20);

  const debouncedQuery = useDebounce(searchQuery, 300);

  /* Fetch products once */
  useEffect(() => {
    async function loadProducts() {
      try {
        const response: Product[] = await queryData(
          PRODUCT_BY_SEARCH,
          "productList"
        );
        setProducts(response);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  /* Reset pagination when query changes */
  useEffect(() => {
    setVisibleCount(20);
  }, [debouncedQuery]);

  /* Filtered products */
  const filteredProducts = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    const query = debouncedQuery.toLowerCase();

    return products.filter(
      (item) =>
        item.status === "PUBLISHED" &&
        item.name?.toLowerCase().includes(query)
    );
  }, [debouncedQuery, products]);

  /* Visible products */
  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const handleClose = () => {
    setIsModalOpen(false);
    setSearchQuery("");
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  return (
    <div className={`relative ${className} z-40`}>
      {/* DESKTOP SEARCH */}
      <div className="hidden md:flex flex-col relative w-full">
        <div className="flex border rounded-full border-black px-4 gap-2 p-2 items-center bg-white">
          <IoSearch size={22} />
          <input
            type="text"
            placeholder="Search products..."
            className="outline-none w-full bg-transparent text-[16px] md:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")}>
              <IoClose size={18} className="text-gray-500" />
            </button>
          )}
        </div>

        {searchQuery && (
          <div className="absolute top-full mt-2 left-0 w-full bg-white border shadow-xl rounded-xl max-h-[400px] overflow-y-auto z-50">
            <SearchResults
              results={visibleProducts}
              isLoading={isLoading}
              onClose={handleClose}
              hasMore={visibleProducts.length < filteredProducts.length}
              onLoadMore={loadMore}
            />
          </div>
        )}
      </div>

      {/* MOBILE BUTTON */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsModalOpen(true)}
        aria-label="Open search"
      >
        <IoSearch size={25} />
      </button>

      {/* MOBILE MODAL */}
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 border rounded-full p-3">
            <IoSearch size={22} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full outline-none text-[16px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <IoClose size={20} className="text-gray-500" />
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            <SearchResults
              results={visibleProducts}
              isLoading={isLoading}
              onClose={handleClose}
              hasMore={visibleProducts.length < filteredProducts.length}
              onLoadMore={loadMore}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

/* ---------------------------------- */
/* Search Results */
/* ---------------------------------- */
const SearchResults = ({
  results,
  isLoading,
  onClose,
  hasMore,
  onLoadMore,
}: {
  results: Product[];
  isLoading: boolean;
  onClose: () => void;
  hasMore: boolean;
  onLoadMore: () => void;
}) => {
  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">
        Loading...
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">
        No products found.
      </div>
    );
  }

  return (
    <>
      <ul className="divide-y">
        {results.map((product) => (
          <li key={product.id}>
            <Link
              href={product.newPath || "/"}
              onClick={onClose}
              className="flex items-center gap-4 p-3 hover:bg-gray-50"
            >
              <div className="relative h-12 w-12 rounded-md overflow-hidden border">
                <Image
                  unoptimized
                  src={
                    product.posterImageUrl ||
                    "/assets/images/placeholder.png"
                  }
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium line-clamp-1">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500">
                  {product.subcategory?.name}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="p-3 flex justify-center">
          <button
            onClick={onLoadMore}
            className="text-sm font-medium px-4 py-2 border rounded-full hover:bg-gray-100"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default SearchBar;
