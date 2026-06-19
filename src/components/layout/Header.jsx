'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import clsx from 'clsx';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'AC Repair & Installation', href: '/services/ac-repair' },
      { label: 'Appliance Repair', href: '/services/appliance-repair' },
      { label: 'Cleaning Services', href: '/services/cleaning' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-white shadow-sm border-b border-primary-200 bg-white/30 backdrop-blur-md'
          : 'bg-white border-b border-primary-100'
      )}
    >
      <div className="container-lg flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.png"
            className="w-auto h-16 md:h-40 lg:h-50"
            alt="M Yar Cool and Clean"
            width={140}
            height={60}
            priority
          />
        </Link>

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
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-primary-700 hover:text-accent transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
                {link.children && <FiChevronDown size={14} className="mt-0.5" />}
              </Link>

              {link.children && (
                <div
                  className={clsx(
                    'absolute top-full left-0 w-52 bg-white shadow-md border-t-2 border-accent py-1 transition-all duration-200',
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

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-primary-600 hover:text-accent transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

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
