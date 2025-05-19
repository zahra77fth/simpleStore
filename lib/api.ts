import { Product, ProductsResponse } from "./types";
import { storeProducts } from "./storage";

const API_URL = "https://dummyjson.com/products";

export const fetchProducts = async (
  limit: number = 30,
  skip: number = 0
): Promise<ProductsResponse> => {
  try {
    const response = await fetch(`${API_URL}?limit=${limit}&skip=${skip}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as ProductsResponse;
    storeProducts(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    throw error;
  }
};
