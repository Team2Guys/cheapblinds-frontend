import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types/category";
import { addToStore, deleteFromStore, getAllFromStore, clearStore, STORES } from "@/lib/indexedDB";
import { Toaster } from "@components/ui";

interface IndexedDbContextType {
  wishlist: Product[];
  freeSamples: Product[];
  cart: Product[];

  addToWishlist: (_product: Product, _categoryUrl: string, _categoryName: string) => Promise<void>;
  removeFromWishlist: (_id: string) => Promise<void>;
  clearWishlist: () => Promise<void>;

  addFreeSampleItem: (_product: Product, _categoryUrl: string) => Promise<void>;
  removeFreeSampleItem: (_id: string) => Promise<void>;
  clearFreeSamples: () => Promise<void>;

  addToCart: (_product: Product, _categoryUrl: string) => Promise<void>;
  removeFromCart: (_id: string) => Promise<void>;
  clearCart: () => Promise<void>;

  openWishlist: boolean;
  setOpenWishlist: React.Dispatch<React.SetStateAction<boolean>>;

  openFreeSample: boolean;
  setOpenFreeSample: React.Dispatch<React.SetStateAction<boolean>>;

  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const IndexedDbContext = createContext<IndexedDbContextType | undefined>(undefined);

export const IndexedDbProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [freeSamples, setFreeSamples] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  const [openWishlist, setOpenWishlist] = useState(false);
  const [openFreeSample, setOpenFreeSample] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  // Load all data on mount
  useEffect(() => {
    const fetchData = async () => {
      setWishlist(await getAllFromStore(STORES.WISHLIST));
      setFreeSamples(await getAllFromStore(STORES.FREESAMPLE));
      setCart(await getAllFromStore(STORES.CART));
    };
    fetchData();
  }, []);

  // -------------------- WISHLIST --------------------
  const addToWishlist = async (product: Product, categoryUrl: string, categoryName: string) => {
    try {
      if (wishlist.find((p) => p.id === product.id)) {
        Toaster("success", "Product already in Wishlist!");
        return;
      }

      const wishlistProduct = {
        ...product,
        categoryUrl,
        categoryName,
        url: `/${categoryUrl}/${product.parentSubcategoryUrl}/${product.slug}`,
      };

      await addToStore(STORES.WISHLIST, wishlistProduct);
      setWishlist((prev) => [wishlistProduct, ...prev]);
      setOpenWishlist(true);
    } catch (err) {
      console.error(err);
      Toaster("error", "Failed to add product to wishlist");
    }
  };

  const removeFromWishlist = async (id: string) => {
    await deleteFromStore(STORES.WISHLIST, id);
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const clearWishlist = async () => {
    await clearStore(STORES.WISHLIST);
    setWishlist([]);
  };

  // -------------------- FREE SAMPLE --------------------
  const addFreeSampleItem = async (product: Product, categoryUrl: string) => {
    try {
      if (freeSamples.find((p) => p.id === product.id)) {
        Toaster("success", "Product already in Free Samples!");
        return;
      }

      const sampleProduct = {
        ...product,
        price: 0,
        categoryUrl,
        subcategoryUrl: product.parentSubcategoryUrl,
      };

      await addToStore(STORES.FREESAMPLE, sampleProduct);
      setFreeSamples((prev) => [sampleProduct, ...prev]);
      setOpenFreeSample(true);
    } catch (err) {
      console.error(err);
      Toaster("error", "Failed to add product to Free Samples!");
    }
  };

  const removeFreeSampleItem = async (id: string) => {
    try {
      await deleteFromStore(STORES.FREESAMPLE, id);
      const updated = await getAllFromStore(STORES.FREESAMPLE);
      setFreeSamples(updated);
    } catch (err) {
      console.error(err);
      Toaster("error", "Failed to remove sample!");
    }
  };

  const clearFreeSamples = async () => {
    await clearStore(STORES.FREESAMPLE);
    setFreeSamples([]);
  };

  // -------------------- CART --------------------
  const addToCart = async (product: Product, categoryUrl: string) => {
    try {
      if (cart.find((p) => p.id === product.id)) {
        Toaster("success", "Product already in Cart!");
        return;
      }

      const cartItem = {
        ...product,
        categoryUrl,
        quantity: 1,
      };

      await addToStore(STORES.CART, cartItem);
      setCart((prev) => [cartItem, ...prev]);
      setOpenCart(true);
    } catch (err) {
      console.error(err);
      Toaster("error", "Failed to add to Cart!");
    }
  };

  const removeFromCart = async (id: string) => {
    await deleteFromStore(STORES.CART, id);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = async () => {
    await clearStore(STORES.CART);
    setCart([]);
  };

  return (
    <IndexedDbContext.Provider
      value={{
        wishlist,
        freeSamples,
        cart,

        addToWishlist,
        removeFromWishlist,
        clearWishlist,

        addFreeSampleItem,
        removeFreeSampleItem,
        clearFreeSamples,

        addToCart,
        removeFromCart,
        clearCart,

        openWishlist,
        setOpenWishlist,

        openFreeSample,
        setOpenFreeSample,

        openCart,
        setOpenCart,
      }}
    >
      {children}
    </IndexedDbContext.Provider>
  );
};

export const useIndexedDb = () => {
  const context = useContext(IndexedDbContext);
  if (!context) throw new Error("useIndexedDb must be used within IndexedDbProvider");
  return context;
};
