import { Product } from "@/types/category";

export const DB_NAME = "CheapBlindsDB";
export const DB_VERSION = 2;

export const STORES = {
  WISHLIST: "wishlist",
  FREESAMPLE: "freeSample",
  CART: "cart",
};

// Initialize Database
export const initDB = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      Object.values(STORES).forEach((store) => {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store, { keyPath: "id" });
        }
      });
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

// Add or update item
export const addToStore = async (storeName: string, item: Product) => {
  const db = await initDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).put(item);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

// Delete item by ID
export const deleteFromStore = async (storeName: string, id: string) => {
  const db = await initDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

// Get all items
export const getAllFromStore = async (storeName: string) => {
  const db = await initDB();

  if (!db.objectStoreNames.contains(storeName)) {
    console.warn(`Store "${storeName}" does not exist. Returning empty array.`);
    return [];
  }

  return new Promise<Product[]>((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const req = tx.objectStore(storeName).getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
};

// Clear all items from a store
export const clearStore = async (storeName: string) => {
  const db = await initDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
