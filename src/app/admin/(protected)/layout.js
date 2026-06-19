'use client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { AdminProtected } from '@/components/admin/AdminProtected';

export default function ProtectedAdminLayout({ children }) {
  return (
    <AdminProtected>
      <div className="flex h-screen bg-[#f9f7f4] overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 md:ml-64 overflow-y-auto">
          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </AdminProtected>
  );
}
