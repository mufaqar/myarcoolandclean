'use client';
import { useRef, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsApi, categoriesApi } from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';
import SkeletonCard from '@/components/ui/SkeletonCard';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LatestProducts({ title = 'Our Services', eyebrow }) {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);

  // Fetch all categories
  const { data: categories, isLoading: catsLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getAll(),
    select: (res) => res.data.data,
    onSuccess: (data) => {
      if (data?.length && !activeCategory) setActiveCategory(data[0].slug);
    },
  });

  // Set first category once loaded
  useEffect(() => {
    if (categories?.length && !activeCategory) {
      setActiveCategory(categories[0].slug);
    }
  }, [categories]);

  // Fetch products for active category
  const { data: products, isLoading: prodsLoading, isError } = useQuery({
    queryKey: ['products', 'by-category', activeCategory],
    queryFn: () => productsApi.getAll({ category: activeCategory, limit: 8, sort: '-createdAt' }),
    select: (res) => res.data.data,
    enabled: !!activeCategory,
  });

  // Animate cards whenever products change
  useEffect(() => {
    if (!products?.length) return;
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('[data-product-card]');
      if (!cards || cards.length === 0) return;
      gsap.set(cards, { opacity: 0, y: 24 });
      gsap.to(cards, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        opacity: 1,
        y: 0,
        stagger: 0.09,
        duration: 0.65,
        ease: 'power2.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, [products]);

  const isLoading = catsLoading || prodsLoading;

  return (
    <section className="py-24 bg-slate-50" ref={containerRef}>
      <div className="container-lg">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
            <h2 className="section-title text-4xl md:text-5xl">{title}</h2>
          </div>
          {activeCategory && (
            <Link
              href={`/product-category/${activeCategory}`}
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
            >
              Explore All Services →
            </Link>
          )}
        </div>

        {/* ── Category Tabs ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {catsLoading
            ? Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-10 w-40 rounded-full bg-primary-100 animate-pulse" />
              ))
            : categories?.map((cat) => {
                const isActive = activeCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                    style={
                      isActive
                        ? {
                            background: 'var(--color-accent,#2563EB)',
                            color: 'white',
                            boxShadow: '0 4px 14px rgba(37,99,235,0.28)',
                          }
                        : {
                            background: 'white',
                            color: 'var(--color-primary-600,#475569)',
                            border: '1.5px solid var(--color-primary-200,#e2e8f0)',
                          }
                    }
                  >
                    {cat.name}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white opacity-75" />
                    )}
                  </button>
                );
              })}
        </div>

        {/* ── Active category label ── */}
        {!catsLoading && activeCategory && (
          <div className="flex items-center gap-3 mb-8">
            <span
              className="w-1 h-6 rounded-full"
              style={{ background: 'var(--color-accent,#2563EB)' }}
            />
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--color-primary-500,#64748b)' }}>
              {categories?.find((c) => c.slug === activeCategory)?.name}
            </p>
          </div>
        )}

        {/* ── Grid ── */}
        {isError ? (
          <div className="text-center py-16" style={{ color: 'var(--color-primary-400,#94a3b8)' }}>
            <p>Unable to load services. Please try again.</p>
          </div>
        ) : (
          <div ref={gridRef}>
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {products?.map((product, idx) => (
                  <div
                    key={product._id}
                    data-product-card
                    className={idx === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!isLoading && !products?.length && (
              <div className="text-center py-20" style={{ color: 'var(--color-primary-400,#94a3b8)' }}>
                <p className="text-lg font-medium">No services found in this category.</p>
              </div>
            )}
          </div>
        )}

        {/* ── Bottom CTA (mobile) ── */}
        <div className="text-center mt-12 md:hidden">
          {activeCategory && (
            <Link
              href={`/product-category/${activeCategory}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
            >
              View All Services →
            </Link>
          )}
        </div>

      </div>
    </section>
  );
}