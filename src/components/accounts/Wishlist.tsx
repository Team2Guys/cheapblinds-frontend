"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card } from "@components";
import { useAuth } from "@context/UserContext";
import { Product } from "@/types/category";
import { Toaster } from "@components/ui";
import { useIndexedDb } from "@lib/useIndexedDb";

export const Wishlist = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // IndexedDB state + functions
  const { wishlist, freeSamples, removeFromWishlist, addFreeSampleItem } = useIndexedDb();

  // Redirect if not logged in
  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) return <p>Loading...</p>;
  if (!user) return null;

  // Delete from Wishlist
  const handleDelete = async (id: string) => {
    await removeFromWishlist(id);
  };

  // Add to Free Sample (with duplicate check)
  const handleFreeSample = async (product: Product) => {
    const alreadyExists = freeSamples.some((p) => String(p.id) === String(product.id));

    if (alreadyExists) {
      Toaster("success", "Product is already in Free Samples!");
      return;
    }

    await addFreeSampleItem(product, product.categoryUrl || "");
    await removeFromWishlist(String(product.id));
  };

  return (
    <div className="space-y-5">
      <h1 className="text-heading text-center">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-center">Your wishlist is empty.</p>
      ) : (
        <>
          <p className="text-xl font-medium font-rubik">
            <span>{wishlist.length}</span> Item(s)
          </p>

          <Card
            products={wishlist}
            productsPerPage={9}
            IsDeleteButton
            onDelete={handleDelete}
            onFreeSample={handleFreeSample}
          />
        </>
      )}
    </div>
  );
};
