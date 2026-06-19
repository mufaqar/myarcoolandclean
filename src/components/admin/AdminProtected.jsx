'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAdminStore } from '@/store/adminStore';

export function AdminProtected({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { admin, token, getCurrentAdmin } = useAdminStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Skip protection for login page
    if (pathname === '/admin/login') {
      setIsLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!token && !admin) {
          const result = await getCurrentAdmin();
          if (!result) {
            router.push('/admin/login');
          }
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setError(err.message);
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [token, admin, getCurrentAdmin, router, pathname]);

  // For login page, render immediately
  if (pathname === '/admin/login') {
    return children;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5FB]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#084887] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5FB]">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => router.push('/admin/login')}
            className="bg-[#d4a574] hover:bg-[#c89560] text-white px-4 py-2 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!admin) {
    return null; // Will redirect to login
  }

  return children;
}
