import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import adminApi from '@/lib/adminApi';

export const useAdminStore = create(
  persist(
    (set, get) => ({
      token: null,
      admin: null,
      isLoading: false,
      error: null,

      setToken: (token) => {
        if (token) {
          Cookies.set('admin_token', token, { expires: 7 });
        } else {
          Cookies.remove('admin_token');
        }
        set({ token });
      },

      setAdmin: (admin) => set({ admin }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await adminApi.post('/auth/login', { email, password });
          const data = response.data;

          if (!data.success) {
            throw new Error(data.message || 'Login failed');
          }

          set({ token: data.token, admin: data.admin, isLoading: false });
          Cookies.set('admin_token', data.token, { expires: 7 });
          return true;
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || 'Login failed';
          set({ error: errorMessage, isLoading: false });
          return false;
        }
      },

      logout: () => {
        Cookies.remove('admin_token');
        set({ token: null, admin: null, error: null });
      },

      getCurrentAdmin: async () => {
        const token = get().token || Cookies.get('admin_token');
        if (!token) return null;

        set({ isLoading: true });
        try {
          const response = await adminApi.get('/auth/me');
          const data = response.data;

          if (data.success) {
            set({ admin: data.admin, token, isLoading: false });
            return data.admin;
          } else {
            set({ token: null, admin: null, isLoading: false });
            Cookies.remove('admin_token');
            return null;
          }
        } catch (error) {
          console.error('Auth error:', error);
          set({ token: null, admin: null, isLoading: false });
          Cookies.remove('admin_token');
          return null;
        }
      },

      hasPermission: (permission) => {
        const { admin } = get();
        if (!admin) return false;
        if (admin.role === 'super_admin') return true;
        return admin.permissions?.includes(permission) || false;
      },
    }),
    {
      name: 'admin-storage',
      partialize: (state) => ({
        token: state.token,
        admin: state.admin,
      }),
    }
  )
);
