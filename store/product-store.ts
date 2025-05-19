import { create } from "zustand";
import { fetchProducts } from "../lib/api";
import { getStoredProducts } from "../lib/storage";
import { Product } from "../lib/types";

interface ProductState {
  products: Product[];
  total: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  fetchProducts: (limit?: number, page?: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  total: 0,
  currentPage: 1,
  loading: false,
  error: null,
  fetchProducts: async (limit = 9, page = 1) => {
    set({ loading: true, error: null });

    try {
      const skip = (page - 1) * limit;

      const storedData = getStoredProducts();
      if (storedData && page === 1) {
        set({
          products: storedData.products.slice(0, limit),
          total: storedData.total,
          loading: false,
        });
        return;
      }

      const data = await fetchProducts(limit, skip);
      set({
        products: data.products,
        total: data.total,
        loading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch products",
        loading: false,
      });
    }
  },
  setCurrentPage: (page) => set({ currentPage: page }),
}));
