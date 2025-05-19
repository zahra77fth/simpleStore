"use client";
import { useEffect } from "react";
import { useProductStore } from "../store/product-store";

export const useProducts = (limit?: number, skip?: number) => {
  const { products, total, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts(limit, skip);
  }, [fetchProducts, limit, skip]);

  return {
    products,
    total,
    loading,
    error,
    refetch: () => fetchProducts(limit, skip),
  };
};
