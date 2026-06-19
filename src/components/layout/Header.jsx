'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import useCartStore from '@/store/cartStore';
import { categoriesApi } from '@/lib/api';
import clsx from 'clsx';

const staticLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact Us', href: '/contact-us' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [navLinks, setNavLinks] = useState(staticLinks);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchRef = useRef(null);
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const openCart = useCartStore((s) => s.openCart);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.getAll();
        const categories = response.data.data || [];

        // Separate parent and child categories
        const parentCategories = categories.filter((cat) => !cat.parent);
        const childCategories = categories.filter((cat) => cat.parent);

        // Build a map of parent categories with their children
        const categoryMap = new Map();
        const parentIdSet = new Set(parentCategories.map(p => p._id));

        parentCategories.forEach((parent) => {
          categoryMap.set(parent._id, {
            label: parent.name,
            href: `/product-category/${parent.slug}`,
            children: [],
          });
        });

        // Add children to their parent categories
        childCategories.forEach((child) => {
          if (categoryMap.has(child.parent)) {
            categoryMap.get(child.parent).children.push({
              label: child.name,
              href: `/product-category/${child.slug}`,
            });
          } else if (!parentIdSet.has(child.parent)) {
            // Add orphaned categories (whose parent doesn't exist) as standalone items
            categoryMap.set(child._id, {
              label: child.name,
              href: `/product-category/${child.slug}`,
              children: [],
            });
          }
        });

        // Convert map to array
        const dynamicLinks = Array.from(categoryMap.values());

        // Separate first 2 categories from the rest
        const firstTwoCategories = dynamicLinks.slice(0, 2).map(cat => ({
          label: cat.label,
          href: cat.href,
          // No children for first two - they'll be standalone links
        }));
        const remainingCategories = dynamicLinks.slice(2);

        // Group remaining categories into "More" dropdowns (max 5 per dropdown)
        const moreDropdowns = [];
        for (let i = 0; i < remainingCategories.length; i += 5) {
          const batch = remainingCategories.slice(i, i + 5);
          const dropdownIndex = Math.floor(i / 5) + 1;
          moreDropdowns.push({
            label: `More${dropdownIndex > 1 ? ` ${dropdownIndex}` : ''}`,
            href: '#',
            children: batch,
            isMore: true,
          });
        }

        const updatedLinks = [
          staticLinks[0], // Home
          staticLinks[1], // About Us
          ...firstTwoCategories,
          ...moreDropdowns,
          staticLinks[2], // Contact Us
        ];

        setNavLinks(updatedLinks);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        // Fallback to static links if API fails
        setNavLinks(staticLinks);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'bg-white shadow-sm border-b border-primary-200 bg-white/30 backdrop-blur-md shadow-2xl' : 'bg-white border-b border-primary-100'
      )}
    >
      <div className="container-lg flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image 
            src="/logo.png" 
            className="w-auto h-16 md:h-40 lg:h-50"
            alt="myarcoolandclean"
            width={140}
            height={60}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.children && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className={clsx(
                  'flex items-center gap-1 px-4 py-2 text-sm font-medium text-primary-700 hover:text-accent transition-colors duration-200 whitespace-nowrap',
                )}
              >
                {link.label}
                {link.children && <FiChevronDown size={14} className="mt-0.5" />}
              </Link>

              {/* Dropdown */}
              {link.children && (
                <div
                  className={clsx(
                    'absolute top-full left-0 w-48 bg-white shadow-md border-t-2 border-accent py-1 transition-all duration-200',
                    activeDropdown === link.label
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-2'
                  )}
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-4 py-2.5 text-sm text-primary-700 hover:bg-slate-50 hover:text-accent transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services..."
                  className="w-44 md:w-56 text-sm px-3 py-1.5 border border-primary-200 outline-none focus:border-accent transition-colors bg-white text-primary-900"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-primary-400 hover:text-primary-600 transition-colors"
                >
                  <FiX size={18} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-primary-600 hover:text-accent transition-colors"
                aria-label="Search"
              >
                <FiSearch size={20} />
              </button>
            )}
          </div>

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative p-2 text-primary-600 hover:text-accent transition-colors"
            aria-label="Cart"
          >
            <FiShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-primary-600 hover:text-accent transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={clsx(
          'lg:hidden border-t border-gray-100 bg-white overflow-hidden transition-all duration-300',
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="container-lg py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <div key={link.label}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 text-sm font-medium text-gray-700 hover:text-accent border-b border-gray-50 transition-colors"
              >
                {link.label}
              </Link>
              {link.children?.map((child) => (
                <Link
                  key={child.label}
                  href={child.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 pl-4 text-sm text-gray-500 hover:text-accent transition-colors"
                >
                  — {child.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
