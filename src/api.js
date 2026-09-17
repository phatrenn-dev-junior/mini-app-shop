import WebApp from '@twa-dev/sdk';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Attach Telegram's signed initData so the backend can verify the user.
  if (WebApp?.initData) {
    headers['x-telegram-init-data'] = WebApp.initData;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getCategories: () => request('/api/categories'),
  getProducts: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/api/products${qs ? `?${qs}` : ''}`);
  },
  getProduct: (id) => request(`/api/products/${id}`),
  createOrder: (payload) =>
    request('/api/orders', { method: 'POST', body: JSON.stringify(payload) }),
  getOrders: () => request('/api/orders'),
};
