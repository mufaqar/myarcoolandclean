'use client';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { categoriesApi } from '@/lib/api';

gsap.registerPlugin(ScrollTrigger);

export default function CategoriesSection() {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoriesApi.getAll({ parent: 'null', limit: 50 });
        if (response.data.success && response.data.data) {
          setCategories(response.data.data);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Animate categories on scroll
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('[data-category-card]');
    if (!cards || cards.length === 0) return;

    // Set initial state
    gsap.set(cards, { opacity: 0, scale: 0.9 });

    // Animate on scroll
    gsap.to(cards, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      scale: 1,
      stagger: 0.1,
      duration: 0.6,
      ease: 'back.out',
    });

    // Add hover animations
    cards.forEach((card) => {
      const img = card.querySelector('img');
      card.addEventListener('mouseenter', () => {
        gsap.to(img, {
          scale: 1.15,
          duration: 0.5,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(img, {
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="py-28 bg-white" ref={containerRef}>
      <div className="container-lg">
        {/* Header with better spacing */}
        <div className="mb-20">
          <p className="section-eyebrow">What We Do</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="section-title max-w-2xl">Our Service Categories</h2>
            <Link href="/product-category/appliance-repair" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors">
              View All Categories →
            </Link>
          </div>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6" ref={gridRef}>
          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">Loading categories...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No categories found</p>
            </div>
          ) : (
            categories.map((cat, idx) => (
              <div key={cat._id} data-category-card className={idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}>
                <Link 
                  href={`/product-category/${cat.slug}`}
                  className={`group relative overflow-hidden bg-white border border-primary-200 hover:border-accent transition-all duration-300 flex flex-col ${
                    idx === 0 ? 'aspect-auto h-80 md:h-full' : 'aspect-square'
                  }`}
                >
                  {/* Image Container */}
                  <div className={`relative flex-1 overflow-hidden bg-slate-100 ${idx === 0 ? 'h-64' : ''}`}>
                    <Image 
                      src={cat.image?.url || '/placeholder.png'} 
                      alt={cat.image?.alt || cat.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                      sizes="(max-width: 768px) 100vw, 33vw" 
                    />
                    <div className={`absolute inset-0 ${idx === 0 ? 'bg-gradient-to-t from-primary-900/60 via-primary-900/20 to-transparent' : 'bg-gradient-to-t from-primary-900/70 via-primary-900/30 to-transparent'}`} />
                  </div>

                  {/* Content Overlay */}
                  <div className={`absolute inset-0 flex flex-col justify-end ${idx === 0 ? 'p-8' : 'p-5'}`}>
                    <div className="bg-white/30 backdrop-blur-md rounded-xl hover:shadow-2xl p-4">
                      <h3 className={`font-heading text-white font-semibold leading-tight ${idx === 0 ? 'text-2xl' : 'text-lg'}`}>
                        {cat.name}
                      </h3>
                      <p className="text-white text-xs md:text-sm mt-2 md:mt-3">
                        {cat.description || 'View Services'}
                      </p>
                    </div>
                    {idx === 0 && (
                      <span className="inline-block mt-4 text-xs font-semibold text-white bg-black p-1 w-[8rem] hover:bg-accent-dark transition-colors uppercase tracking-wide">
                        Most Popular →
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>

        {/* CTA Below */}
        <div className="mt-16 text-center md:hidden">
          <Link href="/product-category/appliance-repair" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors">
            View All Categories →
          </Link>
        </div>
      </div>
    </section>
  );
}
