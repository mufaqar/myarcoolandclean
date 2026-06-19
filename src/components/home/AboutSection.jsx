'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import CounterAnimation from '@/components/ui/CounterAnimation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 3, suffix: 'K+', label: 'Homes Served' },
  { value: 8, suffix: 'K+', label: 'Services Completed' },
  { value: 4.9, suffix: '', label: 'Customer Rating' },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Use gsap.context() for proper component-level isolation
    const ctx = gsap.context(() => {
      // Image animation - slide in from left
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: -100,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Text animation - slide in from right
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: 100,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Stats cards stagger animation
      const statCards = statsRef.current?.querySelectorAll('[data-stat-card]');
      if (statCards) {
        gsap.set(statCards, { opacity: 0, y: 30 });
        gsap.to(statCards, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => {
      // Perfect cleanup - reverts all GSAP changes and kills ScrollTriggers
      ctx.revert();
    };
  }, []);

  return (
    <section className="py-32 bg-primary-50" ref={sectionRef}>
      <div className="container-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left side - Image with floating stats */}
          <div className="lg:col-span-5 relative" ref={imageRef}>
            {/* Main image */}
            <div className="relative w-full h-[500px] lg:h-[600px] bg-slate-200 border border-primary-200 overflow-hidden">
              <Image 
                src="/about.png" 
                alt="M Yar Cool and Clean Services" 
                fill 
                className="object-cover" 
                sizes="(max-width: 1024px) 100vw, 50vw" 
              />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-12 -right-8 bg-accent text-white p-8 w-56 shadow-xl border border-accent-light">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold">4.9</span>
                <span className="text-2xl">★</span>
              </div>
              <p className="text-sm text-accent-light mb-1">Customer Rating</p>
              <p className="text-xs text-white/70">Based on 3K+ reviews</p>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="lg:col-span-7 flex flex-col justify-center" ref={textRef}>
            <p className="section-eyebrow">About M Yar Cool and Clean</p>
            <h2 className="section-title mb-10 text-5xl">
              We Keep Your Home Running Perfectly
            </h2>
            
            <div className="space-y-6 mb-10">
              <p className="text-primary-700 text-lg leading-relaxed">
                M Yar Cool and Clean is built on a simple belief: quality home maintenance should be reliable, affordable, and accessible to everyone.
              </p>
              <p className="text-primary-600 text-base leading-relaxed">
                Our certified technicians deliver expert service in AC repair, appliance maintenance, and professional cleaning — all with transparent pricing and same-day availability because your home deserves the best.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-8 mb-12 pt-8 border-t border-primary-200" ref={statsRef}>
              {stats.map((s) => (
                <div key={s.label} data-stat-card>
                  <p className="text-5xl font-bold text-accent mb-2">
                    <CounterAnimation target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-primary-500 font-medium uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex gap-4">
              <Link href="/about-us" className="btn-primary">Learn Our Story</Link>
              <Link href="/contact-us" className="btn-outline">Get Service</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
