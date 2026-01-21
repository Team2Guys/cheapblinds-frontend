"use client";

import { Modal } from "@components";
import { queryData } from "@config/fetch";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import { SEARCH_QUERY } from "@graphql";
import { Category, Product, Subcategory } from "@/types/category";
import Image from "next/image";

interface SearchInput {
  query: string;
  categoryLimit?: number;
  subcategoryLimit?: number;
  productLimit?: number;
}

interface SearchVariables {
  input: SearchInput;
}

interface SearchData {
  categories: Category[];
  subcategories: Subcategory[];
  products: Product[];
}

const SearchBar = ({ className }: { className?: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchData | null>(null);
  const [productLimit, setProductLimit] = useState(10);

  const searchRef = useRef<HTMLDivElement | null>(null);

  const fetchResults = async (query: string, limit: number) => {
    if (query.trim().length < 2) {
      setResults(null);
      return;
    }

    setIsLoading(true);
    try {
      const variables: SearchVariables = {
        input: {
          query: query,
          categoryLimit: 10,
          subcategoryLimit: 20,
          productLimit: limit,
        },
      };

      const data = await queryData<SearchData>(
        SEARCH_QUERY,
        "search",
        variables as unknown as Record<string, string | number>,
      );

      setResults(data);
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length >= 2) {
        fetchResults(searchQuery, productLimit);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, productLimit]);

  useEffect(() => {
    setProductLimit(10);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const resetSearch = () => {
    setSearchQuery("");
    setResults(null);
    setIsDropdownVisible(false);
    setIsModalOpen(false);
  };

  const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setProductLimit((prev) => prev + 10);
  };

  return (
    <div className={`relative ${className} z-40`} ref={searchRef}>
      <div className="hidden md:flex flex-col relative w-full">
        <div className="flex border rounded-full border-black px-4 gap-2 p-2 items-center bg-white">
          <IoSearch size={22} />
          <input
            type="text"
            placeholder="Search products..."
            className="outline-none w-full bg-transparent text-[16px] md:text-sm"
            value={searchQuery}
            onFocus={() => setIsDropdownVisible(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownVisible(true);
            }}
          />
          {isLoading && (
            <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-black rounded-full" />
          )}
          {searchQuery && (
            <button onClick={resetSearch}>
              <IoClose size={18} className="text-gray-500" />
            </button>
          )}
        </div>

        {isDropdownVisible && searchQuery.length >= 2 && (
          <div className="absolute top-full mt-2 left-0 w-full bg-white border shadow-xl rounded-xl max-h-[400px] overflow-y-auto z-50">
            <SearchResults
              results={results}
              onLinkClick={resetSearch}
              onLoadMore={handleLoadMore}
              isLoading={isLoading}
              currentLimit={productLimit}
            />
          </div>
        )}
      </div>

      <button
        className="md:hidden p-2"
        onClick={() => setIsModalOpen(true)}
        aria-label="Open search"
      >
        <IoSearch size={25} />
      </button>

      <Modal isOpen={isModalOpen} onClose={resetSearch}>
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
            {isLoading && (
              <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-black rounded-full" />
            )}
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <IoClose size={20} className="text-gray-500" />
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            <SearchResults
              results={results}
              onLinkClick={resetSearch}
              onLoadMore={handleLoadMore}
              isLoading={isLoading}
              currentLimit={productLimit}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

interface SearchResultsProps {
  results: SearchData | null;
  onLinkClick: () => void;
  onLoadMore: (_e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
  currentLimit: number;
}

const SearchResults = ({
  results,
  onLinkClick,
  onLoadMore,
  isLoading,
  currentLimit,
}: SearchResultsProps) => {
  if (isLoading && !results) {
    return <div className="p-10 text-center text-gray-500 text-sm">Searching...</div>;
  }

  if (!results) return null;

  const { categories, subcategories, products } = results;
  const hasResults = categories.length > 0 || subcategories.length > 0 || products.length > 0;

  if (!hasResults && !isLoading) {
    return <div className="p-10 text-center text-gray-500 text-sm">No results found.</div>;
  }

  return (
    <div className="divide-y divide-gray-50">
      {/* Categories */}
      {categories.length > 0 && (
        <div className="p-3">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2 px-2">
            Categories
          </p>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.newPath || "/"}
              onClick={onLinkClick}
              className="block p-2 hover:bg-gray-50 rounded-md text-sm"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {/* Sub-Categories */}
      {subcategories.length > 0 && (
        <div className="p-3">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2 px-2">
            Sub-Categories
          </p>
          {subcategories.map((sub) => (
            <Link
              key={sub.id}
              href={sub.newPath || "/"}
              onClick={onLinkClick}
              className="block p-2 hover:bg-gray-50 rounded-md text-sm"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}

      {/* Products */}
      {products.length > 0 && (
        <div className="p-3">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2 px-2">
            Products
          </p>
          <div className="flex flex-col gap-1">
            {products.map((prod) => (
              <Link
                key={prod.id}
                href={prod.newPath || "/"}
                onClick={onLinkClick}
                className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-md transition-colors"
              >
                <div className="relative w-12 h-12 shrink-0 border rounded-md overflow-hidden bg-gray-50">
                  <Image
                    unoptimized
                    src={prod.posterImageUrl || "https://placehold.co/600x600?text=Product+Image"}
                    alt={prod.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 line-clamp-1">
                    {prod.name}
                  </span>
                  <span className="text-sm font-semibold text-black">
                    <span className="font-currency text-lg font-normal"> </span>
                    {prod.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {products.length >= currentLimit && (
            <button
              onClick={onLoadMore}
              disabled={isLoading}
              className="w-full mt-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors border-t border-gray-100 disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "Load More Products"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
