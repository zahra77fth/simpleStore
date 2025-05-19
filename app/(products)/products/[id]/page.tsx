import { notFound } from "next/navigation";
import { fetchProductById } from "@/lib/api";
import { ProductRatingIcon } from "@/components/ProductRatingIcon";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await fetchProductById(Number(params.id));

  if (!product) {
    notFound();
  }

  const discountAmount = (product.price * product.discountPercentage) / 100;
  const finalPrice = product.price - discountAmount;

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="aspect-square bg-white rounded-lg flex items-center justify-center">
            <ProductRatingIcon
              rating={product.rating}
              className="absolute top-4 right-4 z-10"
            />
            <span className="text-gray-400">Product Image</span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-gray-700 font-medium w-32">Price:</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-bold">
                  ${finalPrice.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                      {product.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-gray-700 font-medium w-32">Rating:</span>
              <ProductRatingIcon rating={product.rating} />
            </div>

            <div className="flex items-center">
              <span className="text-gray-700 font-medium w-32">Stock:</span>
              <span
                className={
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {product.stock > 0
                  ? `${product.stock} available`
                  : "Out of stock"}
              </span>
            </div>

            <div className="flex items-center">
              <span className="text-gray-700 font-medium w-32">Brand:</span>
              <span className="text-gray-900">{product.brand}</span>
            </div>

            <div className="flex items-center">
              <span className="text-gray-700 font-medium w-32">Category:</span>
              <span className="text-gray-900 capitalize">
                {product.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
