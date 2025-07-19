const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/api/products`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};
