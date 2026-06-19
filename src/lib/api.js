import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// ─── Products ─────────────────────────────────────────────────
export const productsApi = {
  getAll: (params = {}) => api.get('/products', { params }),
  getBySlug: (slug) => api.get(`/products/${slug}`),
  getRelated: (slug) => api.get(`/products/${slug}/related`),
  getFeatured: () => api.get('/products', { params: { featured: true, limit: 8 } }),
  getNewArrivals: () => api.get('/products', { params: { newArrival: true, limit: 8 } }),
  getEditorChoices: () => api.get('/products', { params: { editorChoice: true, limit: 8 } }),
  addReview: (slug, data) => api.post(`/products/${slug}/reviews`, data),
  search: (q) => api.get('/products', { params: { search: q } }),
};

// ─── Categories ───────────────────────────────────────────────
export const categoriesApi = {
  getAll: (params = {}) => api.get('/categories', { params }),
  getTopLevel: () => api.get('/categories', { params: { parent: 'null' } }),
  getBySlug: (slug) => api.get(`/categories/${slug}`),
};

// ─── Inquiries ────────────────────────────────────────────────
export const inquiriesApi = {
  submit: (data) => api.post('/inquiries', data),
};

// ─── Newsletter ───────────────────────────────────────────────
export const newsletterApi = {
  subscribe: (data) => api.post('/newsletter/subscribe', data),
};

export default api;
