const BASE_URL = 'https://krishinext-4.onrender.com';

export const fetchProducts = async () => {
  const res = await fetch(`${BASE_URL}/api/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const submitOrder = async (orderData) => {
  const res = await fetch(`${BASE_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error('Failed to submit order');
  return res.json();
};
