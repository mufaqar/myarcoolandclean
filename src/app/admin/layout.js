'use client';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { AdminProtected } from '@/components/admin/AdminProtected';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return children;
  }

  return (
    <AdminProtected>
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 md:ml-64 overflow-y-auto">
          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </AdminProtected>
  );
}
