import Link from "next/link";
import { Product } from "../lib/types";
import { ProductRatingIcon } from "./ProductRatingIcon";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const discountedPrice = product.price - (product.price * (product.discountPercentage / 100));

  return (
      <Link
          href={`/products/${product.id}`}
          className="group relative block overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        {/* Sale Badge */}
        {product.discountPercentage > 0 && (
            <div className="absolute top-4 right-4 z-10 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {Math.round(product.discountPercentage)}% OFF
            </div>
        )}

        {/* Product Image */}
        <div className="relative h-64 w-full overflow-hidden bg-gray-100">
          {product.images && product.images[0] ? (
              <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
          ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                <svg
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {product.brand}
          </span>
            <ProductRatingIcon rating={product.rating} />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-rose-500 transition-colors">
            {product.title}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {product.discountPercentage > 0 ? (
                  <>
                <span className="text-lg font-bold text-gray-900">
                  ${discountedPrice.toFixed(2)}
                </span>
                    <span className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                  </>
              ) : (
                  <span className="text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              )}
            </div>

            {product.stock > 0 ? (
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
              In Stock
            </span>
            ) : (
                <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
              Out of Stock
            </span>
            )}
          </div>
        </div>
      </Link>
  );
};