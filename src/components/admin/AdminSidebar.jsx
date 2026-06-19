'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/adminStore';
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiHome,
  FiPackage,
  FiFolder,
  FiMail,
  FiUsers,
  FiBarChart2,
  FiList,
} from 'react-icons/fi';

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: FiHome, permission: null },
  { href: '/admin/products', label: 'Products', icon: FiPackage, permission: 'manage_products' },
  { href: '/admin/categories', label: 'Categories', icon: FiFolder, permission: 'manage_categories' },
  { href: '/admin/inquiries', label: 'Inquiries', icon: FiList, permission: 'manage_inquiries' },
  { href: '/admin/newsletter', label: 'Newsletter', icon: FiMail, permission: 'manage_newsletter' },
  { href: '/admin/email-triggers', label: 'Promotions', icon: FiMail, permission: 'manage_promotions' },
  { href: '/admin/analytics', label: 'Analytics', icon: FiBarChart2, permission: 'view_analytics' },
  { href: '/admin/users', label: 'Users', icon: FiUsers, permission: 'manage_users' },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout, admin, hasPermission } = useAdminStore();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const visibleMenuItems = menuItems.filter(
    (item) => !item.permission || hasPermission(item.permission)
  );

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-5 z-50 md:hidden bg-accent hover:bg-accent-dark text-white p-4 rounded-full transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-accent-dark text-white transform transition-transform duration-300 z-50 overflow-y-auto flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-4 md:p-6 border-b border-accent/20 text-center bg-accent-dark/10 flex-shrink-0">
          <img src="/logo.png" alt="Admin" className='w-24 md:w-40 mx-auto' />
          <span className="bg-accent text-xs md:text-sm text-white mt-2 px-2 py-1 rounded-full inline-block">{admin?.role}</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {visibleMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition ${
                    isActive
                      ? 'bg-accent text-white'
                      : 'hover:bg-accent/20 text-gray-300'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-700 bg-[#084887] flex-shrink-0">
          <div className="mb-4">
            <p className="text-xs md:text-sm text-gray-400">Logged in as:</p>
            <p className="text-white text-sm md:text-base font-medium truncate">{admin?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition text-sm"
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Background overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
