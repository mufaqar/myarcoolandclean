'use client';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const banners = [
  { eyebrow: 'Emergency Service', title: 'AC Repair & Installation', href: '/product-category/ac-repair', image: '/acservices.png', bg: 'bg-slate-100' },
  { eyebrow: 'Featured Service', title: 'Deep Cleaning Service', href: '/product-category/cleaning', image: '/cleaning.png', bg: 'bg-primary-900', dark: true },
];

export default function FeaturedBanners() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Use gsap.context() for proper component-level isolation
    const ctx = gsap.context(() => {
      const banners = containerRef.current?.querySelectorAll('[data-banner]');
      if (!banners || banners.length === 0) return;

      gsap.set(banners, { opacity: 0, y: 40 });

      gsap.to(banners, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Add hover animations to images
      banners.forEach((banner) => {
        const img = banner.querySelector('img');
        banner.addEventListener('mouseenter', () => {
          if (img) {
            gsap.to(img, {
              scale: 1.15,
              duration: 0.5,
              ease: 'power2.out',
            });
          }
        });

        banner.addEventListener('mouseleave', () => {
          if (img) {
            gsap.to(img, {
              scale: 1,
              duration: 0.5,
              ease: 'power2.out',
            });
          }
        });
      });
    }, containerRef);

    return () => {
      // Perfect cleanup - reverts all GSAP changes and kills ScrollTriggers
      ctx.revert();
    };
  }, []);

  return (
    <section className="py-28 bg-slate-50" ref={containerRef}>
      <div className="container-lg">
        {/* Header */}
        <div className="mb-16">
          <p className="section-eyebrow">Featured Offers</p>
          <h2 className="section-title">Special Promotions</h2>
        </div>

        {/* Staggered Layout */}
        <div className="space-y-6" ref={containerRef}>
          {banners.map((b, idx) => (
            <Link
              key={b.title}
              href={b.href}
              data-banner
              className={`group relative overflow-hidden ${b.bg} flex items-center justify-between min-h-[240px] px-8 md:px-12 py-8 md:py-12 transition-all duration-300 hover:shadow-lg border border-primary-200 hover:border-accent ${
                idx === 0 ? 'lg:col-span-2' : ''
              }`}
              style={idx === 1 ? { maxWidth: '85%', marginLeft: 'auto' } : {}}
            >
              <div className="relative z-10 flex-1">
                <p className={`text-xs font-semibold uppercase tracking-[0.15em] mb-3 ${b.dark ? 'text-accent' : 'text-accent-dark'}`}>
                  {b.eyebrow}
                </p>
                <h3 className={`font-heading text-3xl md:text-4xl font-semibold leading-tight mb-4 ${b.dark ? 'text-white' : 'text-primary-900'}`}>
                  {b.title}
                </h3>
                <span className={`inline-block text-xs font-semibold uppercase tracking-wide transition-colors ${b.dark ? 'text-white/70 group-hover:text-accent' : 'text-primary-600 group-hover:text-accent'}`}>
                  Get Started →
                </span>
              </div>
              <div className="relative w-40 h-48 flex-shrink-0 overflow-hidden hidden md:block">
                <Image 
                  src={b.image} 
                  alt={b.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  sizes="160px" 
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
