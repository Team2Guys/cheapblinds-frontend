import { Modal } from "@components";
import { fetchProducts } from "@config/fetch";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import { GET_PRODUCT_BY_SEARCH_QUERY } from "@graphql";
import { Product } from "@/types/category";
import Image from "next/image";

const SearchBar = ({ className }: { className?: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetchProducts(GET_PRODUCT_BY_SEARCH_QUERY);
        setProducts(response);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return products.filter((item) => {
      const isPublished = item?.status === "PUBLISHED";
      const matchesName = item?.name?.toLowerCase().includes(query);
      return isPublished && matchesName;
    });
  }, [searchQuery, products]);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    setSearchQuery("");
  };

  const handleLinkClick = () => {
    setSearchQuery("");
    handleClose();
  };

  return (
    <div className={`relative ${className} z-50`}>
      <div className="hidden md:flex flex-col relative w-full">
        <div className="flex border rounded-full border-black px-4 gap-2 p-2 items-center w-full bg-white">
          <IoSearch size={22} />
          <input
            className="outline-none w-full text-sm bg-transparent"
            type="text"
            placeholder="Search products..."
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
          <div className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden max-h-[400px] overflow-y-auto z-50">
            <SearchResults
              results={filteredProducts}
              isLoading={isLoading}
              onLinkClick={handleLinkClick}
            />
          </div>
        )}
      </div>

      <button className="md:hidden p-2" onClick={handleOpen} aria-label="Open search modal">
        <IoSearch size={25} />
      </button>

      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <div className="flex flex-col gap-4 h-auto">
          <div className="flex items-center gap-3 border border-gray-300 rounded-full p-3">
            <IoSearch size={22} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full outline-none text-sm"
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
          <div className="flex-1 overflow-y-auto max-h-[400px]">
            <SearchResults
              results={filteredProducts}
              isLoading={isLoading}
              onLinkClick={handleLinkClick}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

const SearchResults = ({
  results,
  isLoading,
  onLinkClick,
}: {
  results: Product[];
  isLoading: boolean;
  onLinkClick: () => void;
}) => {
  if (isLoading) {
    return <div className="p-4 text-center text-gray-500 text-sm">Loading...</div>;
  }

  if (results.length === 0) {
    return <div className="p-4 text-center text-gray-500 text-sm">No products found.</div>;
  }

  return (
    <ul className="flex flex-col divide-y divide-gray-100">
      {results.map((product) => (
        <li key={product.id}>
          <Link
            href={`/${product.category?.slug}/${product.subcategory?.slug}/${product.slug}`}
            onClick={onLinkClick}
            className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-gray-100 border border-gray-200">
              <Image
                src={product.posterImageUrl || ""}
                alt={product.name}
                className="h-full w-full object-cover"
                fill
              />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-medium line-clamp-1">{product.name}</span>
              <span className="text-xs">{product.subcategory?.name}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchBar;
