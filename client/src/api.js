const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/api/products`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const signupUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/auth/user/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Signup failed");
  }
  return await response.json();
};
