"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  addToStore,
  deleteFromStore,
  getAllFromStore,
  clearStore,
  STORES,
} from "@/lib/indexedDB";

import { CartItems, Product, WishlistItems } from "@/types/category";
import { Toaster } from "@components/ui";

/* -------------------- CONTEXT TYPE -------------------- */

interface IndexedDbContextType {
  wishlist: WishlistItems[];
  freeSamples: WishlistItems[];
  cart: CartItems[];

  addToWishlist: (_product: Product) => Promise<void>;
  addFreeSampleItem: (_product: Product) => Promise<void>;
  addToCart: (
    _product: Product,
    _config: Partial<CartItems>
  ) => Promise<void>;

  removeFromWishlist: (_id: string) => Promise<void>;
  removeFreeSampleItem: (_id: string) => Promise<void>;
  removeFromCart: (_id: string) => Promise<void>;

  clearWishlist: () => Promise<void>;
  clearFreeSamples: () => Promise<void>;
  clearCart: () => Promise<void>;

  openWishlist: boolean;
  setOpenWishlist: React.Dispatch<React.SetStateAction<boolean>>;
  openFreeSample: boolean;
  setOpenFreeSample: React.Dispatch<React.SetStateAction<boolean>>;
  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const IndexedDbContext = createContext<IndexedDbContextType | undefined>(
  undefined
);

/* -------------------- PROVIDER -------------------- */

export const IndexedDbProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wishlist, setWishlist] = useState<WishlistItems[]>([]);
  const [freeSamples, setFreeSamples] = useState<WishlistItems[]>([]);
  const [cart, setCart] = useState<CartItems[]>([]);

  const [openWishlist, setOpenWishlist] = useState(false);
  const [openFreeSample, setOpenFreeSample] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  /* -------------------- LOAD STORES -------------------- */

  useEffect(() => {
    (async () => {
      setWishlist(await getAllFromStore(STORES.WISHLIST));
      setFreeSamples(await getAllFromStore(STORES.FREESAMPLE));
      setCart(await getAllFromStore(STORES.CART));
    })();
  }, []);

  /* -------------------- HELPERS -------------------- */

  const mapToWishlistItem = (product: Product): WishlistItems => ({
    id: product.id,
    name: product.name,
    fabricId: product.fabricId,
    blindTypeId: product.blindTypeId,
    sku: product.sku,
    productUrl: product.productUrl,
    posterImageUrl: product.posterImageUrl,
    price: product.price,
    color: product.color,
    isMotorized: product.isMotorized,
    motorPrice: product.motorPrice,
    status: product.status,
  });

const mapToCartItem = (
  product: Product,
  config: Partial<CartItems>
): CartItems => ({
  id: crypto.randomUUID(),

  name: product.name,
  fabricId: product.fabricId,
  blindTypeId: product.blindTypeId,
  sku: product.sku,
  productUrl: product.productUrl,
  posterImageUrl: product.posterImageUrl,
  price: product.price,
  color: product.color,
  finalPrice: config.finalPrice,
  width: config.width!,
  drop: config.drop!,
  isMotorized: false,
  motorPrice: product.motorPrice ?? 0,
  racessType: config.racessType,
  options: {
    headrailType: config.options?.headrailType,
    stackingStyle: config.options?.stackingStyle,
    lining: config.options?.lining,
    chainControl: config.options?.chainControl,
    chainSide: config.options?.chainSide,
  },
});


  /* -------------------- WISHLIST -------------------- */

  const addToWishlist = async (product: Product) => {
    if (wishlist.some((p) => p.id === product.id)) {
      Toaster("success", "Already in Wishlist");
      return;
    }

    const item = mapToWishlistItem(product);
    await addToStore(STORES.WISHLIST, item);
    setWishlist((prev) => [item, ...prev]);
    setOpenWishlist(true);
  };

  const removeFromWishlist = async (id: string) => {
    await deleteFromStore(STORES.WISHLIST, id);
    setWishlist((prev) => prev.filter((i) => i.id !== id));
  };

  const clearWishlist = async () => {
    await clearStore(STORES.WISHLIST);
    setWishlist([]);
  };

  /* -------------------- FREE SAMPLE -------------------- */

  const addFreeSampleItem = async (product: Product) => {
    if (freeSamples.some((p) => p.id === product.id)) {
      Toaster("success", "Already in Free Samples");
      return;
    }

    const item = { ...mapToWishlistItem(product), price: 0 };
    await addToStore(STORES.FREESAMPLE, item);
    setFreeSamples((prev) => [item, ...prev]);
    setOpenFreeSample(true);
  };

  const removeFreeSampleItem = async (id: string) => {
    await deleteFromStore(STORES.FREESAMPLE, id);
    setFreeSamples((prev) => prev.filter((i) => i.id !== id));
  };

  const clearFreeSamples = async () => {
    await clearStore(STORES.FREESAMPLE);
    setFreeSamples([]);
  };

  /* -------------------- CART (NO MERGE EVER) -------------------- */

  const addToCart = async (
    product: Product,
    config: Partial<CartItems>
  ) => {
    if (!config.width || !config.drop) {
      Toaster("error", "Width and Drop are required");
      return;
    }

    const item = mapToCartItem(product, config);

    await addToStore(STORES.CART, item);
    setCart((prev) => [item, ...prev]);
    setOpenCart(true);
  };

  const removeFromCart = async (id: string) => {
    await deleteFromStore(STORES.CART, id);
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = async () => {
    await clearStore(STORES.CART);
    setCart([]);
  };

  /* -------------------- PROVIDER -------------------- */

  return (
    <IndexedDbContext.Provider
      value={{
        wishlist,
        freeSamples,
        cart,

        addToWishlist,
        addFreeSampleItem,
        addToCart,

        removeFromWishlist,
        removeFreeSampleItem,
        removeFromCart,

        clearWishlist,
        clearFreeSamples,
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

/* -------------------- HOOK -------------------- */

export const useIndexedDb = () => {
  const ctx = useContext(IndexedDbContext);
  if (!ctx)
    throw new Error("useIndexedDb must be used within IndexedDbProvider");
  return ctx;
};
