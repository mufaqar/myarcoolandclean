import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const adminApi = axios.create({
  baseURL: `${API_URL}`,
});

// Add token to every request
adminApi.interceptors.request.use((config) => {
  const token = Cookies.get('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('admin_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Analytics API
export const analyticsApi = {
  getDashboard: () => adminApi.get('/analytics/dashboard'),
  getProducts: () => adminApi.get('/analytics/products'),
  getInquiries: () => adminApi.get('/analytics/inquiries'),
};

// Products API
export const adminProductsApi = {
  getAll: (params) => adminApi.get('/products', { params }),
  create: (data) => adminApi.post('/products', data),
  update: (id, data) => adminApi.put(`/products/${id}`, data),
  delete: (id) => adminApi.delete(`/products/${id}`),
};

// Categories API
export const adminCategoriesApi = {
  getAll: (params) => adminApi.get('/categories', { params }),
  create: (data) => adminApi.post('/categories', data),
  update: (id, data) => adminApi.put(`/categories/${id}`, data),
  delete: (id) => adminApi.delete(`/categories/${id}`),
};

// Inquiries API
export const adminInquiriesApi = {
  getAll: (params) => adminApi.get('/inquiries', { params }),
  get: (id) => adminApi.get(`/inquiries/${id}`),
  update: (id, data) => adminApi.put(`/inquiries/${id}`, data),
  delete: (id) => adminApi.delete(`/inquiries/${id}`),
};

// Newsletter API
export const adminNewsletterApi = {
  getAll: (params) => adminApi.get('/newsletter', { params }),
  delete: (id) => adminApi.delete(`/newsletter/${id}`),
};

// Email Templates API
export const adminEmailTemplatesApi = {
  getAll: () => adminApi.get('/email-templates'),
  get: (id) => adminApi.get(`/email-templates/${id}`),
  getByType: (type) => adminApi.get(`/email-templates/type/${type}`),
  create: (data) => adminApi.post('/email-templates', data),
  update: (id, data) => adminApi.patch(`/email-templates/${id}`, data),
  delete: (id) => adminApi.delete(`/email-templates/${id}`),
};

// Email Triggers API (Promotional campaigns)
export const adminEmailTriggersApi = {
  getAll: (params) => adminApi.get('/email-triggers', { params }),
  get: (id) => adminApi.get(`/email-triggers/${id}`),
  create: (data) => adminApi.post('/email-triggers', data),
  update: (id, data) => adminApi.patch(`/email-triggers/${id}`, data),
  delete: (id) => adminApi.delete(`/email-triggers/${id}`),
  sendNow: (id) => adminApi.post(`/email-triggers/${id}/send`),
  testEmail: (id, testEmail) => adminApi.post(`/email-triggers/${id}/test`, { testEmail }),
};

// Image Upload API (Email Banners)
export const imageUploadApi = {
  uploadBanner: (file, type) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type); // 'header' or 'footer'
    return adminApi.post('/images/upload-banner', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteBanner: (publicId) => adminApi.delete('/images/delete-banner', { data: { publicId } }),
};

export const adminUsersApi = {
  getAll: () => adminApi.get('/auth/admins'),
  update: (id, data) => adminApi.put(`/auth/admins/${id}`, data),
  delete: (id) => adminApi.delete(`/auth/admins/${id}`),
};

export default adminApi;
