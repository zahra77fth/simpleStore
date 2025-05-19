"use client";

import { ProductList } from "@/components/ProductList";
import { ProductsPagination } from "@/components/ProductsPagination";
import { useProductStore } from "@/store/product-store";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const ITEMS_PER_PAGE = 9;

export default function ProductsPage() {
  const {
    products,
    total,
    loading,
    error,
    currentPage,
    fetchProducts,
    setCurrentPage,
  } = useProductStore();

  useEffect(() => {
    fetchProducts(ITEMS_PER_PAGE, currentPage);
  }, [currentPage, fetchProducts]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <div className="container py-8">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          <p>Error loading products: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="animate-spin mx-auto" />
        </div>
      ) : (
        <>
          <ProductList products={products} />
          {totalPages > 1 && (
            <ProductsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
