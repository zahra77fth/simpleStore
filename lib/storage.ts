import { ProductsResponse } from "./types";

const PRODUCTS_STORAGE_KEY = "products_data";

export const getStoredProducts = (): ProductsResponse | null => {
  if (typeof window === "undefined") return null;

  const storedData = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  if (!storedData) return null;

  try {
    const parsedData = JSON.parse(storedData) as ProductsResponse;
    // Validate that we have products array and it's not empty
    if (parsedData?.products?.length > 0) {
      return parsedData;
    }
    return null;
  } catch {
    return null;
  }
};

export const storeProducts = (data: ProductsResponse): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(data));
};

export const clearProductsStorage = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PRODUCTS_STORAGE_KEY);
};
