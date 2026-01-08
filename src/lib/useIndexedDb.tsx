"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { addToStore, deleteFromStore, getAllFromStore, clearStore, STORES } from "@/lib/indexedDB";

import { CartItems, Product, WishlistItems } from "@/types/category";
import { Toaster } from "@components/ui";

/* -------------------- CONTEXT TYPE -------------------- */

interface IndexedDbContextType {
  wishlist: WishlistItems[];
  freeSamples: WishlistItems[];
  cart: CartItems[];

  addToWishlist: (_product: Product) => Promise<void>;
  addFreeSampleItem: (_product: Product) => Promise<void>;
  addToCart: (_product: Product, _config: Partial<CartItems>) => Promise<void>;

  removeFromWishlist: (_id: string) => Promise<void>;
  removeFreeSampleItem: (_id: string) => Promise<void>;
  removeFromCart: (_id: string) => Promise<void>;

  clearWishlist: () => Promise<void>;
  clearFreeSamples: () => Promise<void>;
  clearCart: () => Promise<void>;
  increaseQuantity: (_id: string) => Promise<void>; // ✅
  decreaseQuantity: (_id: string) => Promise<void>; // ✅
  updateMotorized: (_id: string, _isMotorized: boolean) => Promise<void>;

  openWishlist: boolean;
  setOpenWishlist: React.Dispatch<React.SetStateAction<boolean>>;
  openFreeSample: boolean;
  setOpenFreeSample: React.Dispatch<React.SetStateAction<boolean>>;
  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const IndexedDbContext = createContext<IndexedDbContextType | undefined>(undefined);

/* -------------------- PROVIDER -------------------- */

export const IndexedDbProvider = ({ children }: { children: React.ReactNode }) => {
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

  const mapToCartItem = (product: Product, config: Partial<CartItems>): CartItems => ({
    id: crypto.randomUUID(),

    name: product.name,
    fabricId: product.fabricId,
    blindTypeId: product.blindTypeId,
    sku: product.sku,
    productUrl: product.productUrl,
    posterImageUrl: product.posterImageUrl,
    price: product.price,
    color: product.color,
    motorPrice: product.motorPrice,
    subPrice: config.subPrice,
    finalPrice: config.finalPrice,
    width: config.width!,
    drop: config.drop!,
    unit: config.unit,
    isMotorized: false,
    recessType: config.recessType,
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
    if (freeSamples.length >= 5) {
      Toaster("error", "You can only add up to 5 free samples");
      return;
    }

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

  const addToCart = async (product: Product, config: Partial<CartItems>) => {
    if (!config.width || !config.drop || !config.unit) {
      Toaster("error", "Width, Drop, and Unit are required");
      return;
    }

    // Compare options reliably
    const optionsEqual = (a?: CartItems["options"], b?: CartItems["options"]) => {
      if (!a || !b) return false;
      const keys = Object.keys(a) as (keyof CartItems["options"])[];
      return keys.every((key) => a[key] === b[key]);
    };

    const existingIndex = cart.findIndex(
      (c) =>
        c.blindTypeId === product.blindTypeId &&
        c.width === config.width &&
        c.drop === config.drop &&
        c.unit === config.unit &&
        optionsEqual(c.options, config.options),
    );

    if (existingIndex > -1) {
      const existingItem = cart[existingIndex];
      const newQuantity = (existingItem.quantity || 1) + 1;

      const updatedItem: CartItems = {
        ...existingItem,
        quantity: newQuantity,
        subPrice: config.subPrice ?? existingItem.subPrice ?? 0,
        finalPrice: (config.subPrice ?? existingItem.subPrice ?? 0) * newQuantity,
      };

      await addToStore(STORES.CART, updatedItem);
      setCart((prev) => {
        const newCart = [...prev];
        newCart[existingIndex] = updatedItem;
        return newCart;
      });

      setOpenCart(true);
      Toaster("success", "Added another item to cart");
      return;
    }

    // New item
    const newItem: CartItems = {
      ...mapToCartItem(product, config),
      quantity: 1,
      subPrice: config.subPrice,
      finalPrice: config.subPrice,
    };

    await addToStore(STORES.CART, newItem);
    setCart((prev) => [newItem, ...prev]);
    setOpenCart(true);
    Toaster("success", "Added to cart");
  };

  const updateMotorized = async (id: string, isMotorized: boolean) => {
    const item = cart.find((p) => p.id === id);
    if (!item) return;

    const quantity = item.quantity ?? 1;
    const subPrice = item.subPrice ?? 0;
    const motorPrice = item.motorPrice ?? 0;

    const finalPrice = subPrice * quantity + (isMotorized ? motorPrice * quantity : 0);

    const updatedItem: CartItems = {
      ...item,
      isMotorized,
      finalPrice,
    };

    await addToStore(STORES.CART, updatedItem);
    setCart((prev) => prev.map((p) => (p.id === id ? updatedItem : p)));
  };
  const increaseQuantity = async (id: string) => {
    const item = cart.find((p) => p.id === id);
    if (!item) return;

    const quantity = (item.quantity ?? 1) + 1;
    const subPrice = item.subPrice ?? 0;
    const motorPrice = item.motorPrice ?? 0;

    const finalPrice = subPrice * quantity + (item.isMotorized ? motorPrice * quantity : 0);

    const updatedItem: CartItems = {
      ...item,
      quantity,
      finalPrice,
    };

    await addToStore(STORES.CART, updatedItem);
    setCart((prev) => prev.map((p) => (p.id === id ? updatedItem : p)));
  };

  const decreaseQuantity = async (id: string) => {
    const item = cart.find((p) => p.id === id);
    if (!item || (item.quantity ?? 1) <= 1) return;

    const quantity = (item.quantity ?? 1) - 1;
    const subPrice = item.subPrice ?? 0;
    const motorPrice = item.motorPrice ?? 0;

    const finalPrice = subPrice * quantity + (item.isMotorized ? motorPrice * quantity : 0);

    const updatedItem: CartItems = {
      ...item,
      quantity,
      finalPrice,
    };

    await addToStore(STORES.CART, updatedItem);
    setCart((prev) => prev.map((p) => (p.id === id ? updatedItem : p)));
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

        increaseQuantity,
        decreaseQuantity,
        updateMotorized,
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
  if (!ctx) throw new Error("useIndexedDb must be used within IndexedDbProvider");
  return ctx;
};
