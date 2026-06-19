'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FiMapPin, FiMail, FiPhone, FiSend } from 'react-icons/fi';
import { newsletterApi } from '@/lib/api';
import toast from 'react-hot-toast';

const footerLinks = {
  Services: [
    { label: 'Plumbing', href: '/product-category/plumbing' },
    { label: 'Electrical', href: '/product-category/electrical' },
    { label: 'Carpentry', href: '/product-category/carpentry' },
    { label: 'HVAC', href: '/product-category/hvac' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'My Account', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'Emergency Service', href: '#' },
  ],
  Company: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Leadership', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Promotions', href: '#' },
  ],
};

const socials = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Cookie Policy', href: '#' },
  { label: 'Terms of Use', href: '#' },
];

export default function Footer() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!form.email.trim()) {
      return toast.error('Please enter your email');
    }

    setLoading(true);
    try {
      await newsletterApi.subscribe({
        name: form.name.trim(),
        email: form.email.trim(),
      });
      toast.success('Thank you for subscribing!');
      setForm({ name: '', email: '' });
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Subscription failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-primary-900 text-white">
      {/* Subtle background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10">
        {/* Top area */}
        <div className="container-lg py-16 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Brand */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-flex">
                <Image
                  src="/logo.png"
                  alt="myarcoolandclean"
                  width={220}
                  height={68}
                  className="h-auto w-auto max-w-[180px] md:max-w-[220px]"
                  priority
                />
              </Link>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/70 md:text-[15px]">
                Professional home maintenance and repair services. Available 24/7 for emergencies across all areas.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3 text-sm text-white/75">
                  <span className="mt-0.5 p-2 text-accent">
                    <FiMapPin size={14} />
                  </span>
                  <span className="leading-6">Islamabad & Rawalpindi, Pakistan</span>
                </div>

                <div className="flex items-start gap-3 text-sm text-white/75">
                  <span className="mt-0.5 p-2 text-accent">
                    <FiMail size={14} />
                  </span>
                  <a
                    href="mailto:myarcoolandclean@gmail.com"
                    className="break-all leading-6 transition-colors hover:text-accent"
                  >
                    myarcoolandclean@gmail.com
                  </a>
                </div>

                <div className="flex items-start gap-3 text-sm text-white/75">
                  <span className="mt-0.5 p-2 text-accent">
                    <FiPhone size={14} />
                  </span>
                  <a
                    href="tel:+923056687553"
                    className="leading-6 transition-colors hover:text-accent"
                  >
                    +92 305 6687553 <br /> +92 334 7787554
                  </a>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {Object.entries(footerLinks).map(([title, links]) => (
                  <div key={title}>
                    <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white">
                      {title}
                    </h4>
                    <ul className="space-y-3">
                      {links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-sm text-white/65 transition-colors duration-200 hover:text-accent"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Newsletter card */}
              <div className="mt-12 border border-white/10 p-8 bg-white/5 lg:p-10">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                  <div className="flex-1">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                      Newsletter
                    </p>
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Stay Updated
                    </h4>
                    <p className="text-sm leading-6 text-white/65 max-w-md">
                      Get latest service updates, promotions, and expert maintenance tips.
                    </p>
                  </div>

                  <form onSubmit={handleSubscribe} className="w-full lg:w-auto">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, email: e.target.value }))
                        }
                        className="flex-1 lg:flex-initial h-12 border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-accent focus:bg-white/15"
                      />

                      <button
                        type="submit"
                        disabled={loading}
                        className="h-12 px-6 bg-accent text-primary-900 font-semibold text-sm transition hover:bg-accent-light disabled:opacity-50"
                      >
                        {loading ? '...' : 'Subscribe'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-primary-900/80 border-t border-white/10">
          <div className="container-lg flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
            <p className="text-xs leading-6 text-white/50">
              © {new Date().getFullYear()} myarcoolandclean. All rights reserved.
            </p>

            <div className="flex items-center justify-center gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 transition-all hover:border-accent hover:bg-accent hover:text-primary-900"
                >
                  <Icon size={14} />
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-xs">
              {legalLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white/50 transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}