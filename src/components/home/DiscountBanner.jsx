'use client';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DiscountBanner() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Use gsap.context() for proper component-level isolation
    const ctx = gsap.context(() => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Animate background circles with subtle floating (no rotation for performance)
      if (circle1Ref.current && !prefersReducedMotion) {
        gsap.to(circle1Ref.current, {
          y: -15,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          paused: false,
        });
      }

      if (circle2Ref.current && !prefersReducedMotion) {
        gsap.to(circle2Ref.current, {
          y: 15,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          paused: false,
        });
      }

      // Set initial states
      if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 0, y: 20 });
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, y: 40 });
      if (descriptionRef.current) gsap.set(descriptionRef.current, { opacity: 0, y: 20 });
      
      const buttonChildren = buttonsRef.current?.children;
      if (buttonChildren && buttonChildren.length > 0) {
        gsap.set(buttonChildren, { opacity: 0, y: 20 });
      }

      // Determine if elements are in viewport on load
      const isMobile = window.innerWidth < 768;
      const isInViewport = () => {
        const rect = sectionRef.current?.getBoundingClientRect();
        return rect && rect.top < window.innerHeight * 0.9;
      };

      // Create timeline
      const tl = gsap.timeline({ paused: true });

      let hasPlayed = false;

      // Setup animations
      tl.to(
        eyebrowRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
        },
        0
      )
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
        },
        0.1
      )
      .to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
        },
        0.2
      );

      if (buttonChildren && buttonChildren.length > 0) {
        tl.to(
          buttonChildren,
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
          },
          0.3
        );
      }

      // Check if already in viewport and play immediately
      if (isInViewport()) {
        tl.play();
        hasPlayed = true;
      } else {
        // Use ScrollTrigger for elements not in initial viewport
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: isMobile ? 'top bottom' : 'top 80%',
          onEnter: () => {
            if (!hasPlayed) {
              tl.play();
              hasPlayed = true;
            }
          },
        });
      }
    }, sectionRef);

    return () => {
      // Perfect cleanup - reverts all GSAP changes and kills ScrollTriggers
      ctx.revert();
    };
  }, []);

  return (
    <section 
      className="py-16 bg-primary relative overflow-hidden" 
      ref={sectionRef}
      style={{ minHeight: '300px' }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #d4a853 0, #d4a853 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Decorative circles */}
      <div 
        ref={circle1Ref} 
        className="absolute -left-16 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent/10 pointer-events-none" 
        style={{ willChange: 'transform' }}
      />
      <div 
        ref={circle2Ref} 
        className="absolute -right-10 top-0 w-48 h-48 rounded-full bg-accent/5 pointer-events-none" 
        style={{ willChange: 'transform' }}
      />

      <div className="container-lg relative z-10 text-center">
        <p 
          ref={eyebrowRef} 
          className="text-accent-dark text-sm font-semibold uppercase tracking-[0.2em] mb-3"
          style={{ willChange: 'opacity, transform' }}
        >
          ✦ Sales
        </p>
        <h2 
          ref={titleRef} 
          className="font-heading text-3xl md:text-5xl font-bold text-white mb-4"
          style={{ willChange: 'opacity, transform' }}
        >
          Discount up to{' '}
          <span className="text-accent-dark">50%</span>
          {' '}for first purchase.
        </h2>
        <p 
          ref={descriptionRef} 
          className="text-white/60 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
          style={{ willChange: 'opacity, transform' }}
        >
          Get the best value on your first bulk order of professional wear. From chef jackets
          to medical scrubs, durable solutions at unbeatable prices.
        </p>
        <div ref={buttonsRef} className="flex flex-wrap gap-4 justify-center" style={{ willChange: 'opacity, transform' }}>
          <Link href="/product-category/uniform" className="btn-gold">
            View All Products
          </Link>
          <Link href="/contact-us" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}