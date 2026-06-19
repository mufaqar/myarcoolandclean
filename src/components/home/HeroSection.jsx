'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { heroTextAnimation } from '@/lib/gsapAnimations';

export default function HeroSection() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    heroTextAnimation(containerRef);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white" ref={containerRef} style={{ minHeight: '100svh' }}>

      {/* ══════════ MOBILE: full-bleed bg image ══════════ */}
      <div className="lg:hidden absolute inset-0 z-0">
        <Image src="/hero.png" alt="M Yar Cool and Clean - Professional Home Maintenance Services" fill className="object-cover object-center" priority />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,rgba(15,23,42,0.70) 0%,rgba(15,23,42,0.50) 45%,rgba(15,23,42,0.88) 100%)' }} />
      </div>

      {/* ══════════ DESKTOP: background accents ══════════ */}
      {/* Dot matrix top-left */}
      <svg aria-hidden="true" className="hidden lg:block absolute top-0 left-0 w-80 h-80 pointer-events-none" style={{ opacity: 0.055 }} viewBox="0 0 320 320">
        {Array.from({ length: 11 }, (_, r) =>
          Array.from({ length: 11 }, (_, c) => (
            <circle key={`${r}-${c}`} cx={c * 30 + 10} cy={r * 30 + 10} r="2.5" fill="#0f172a" />
          ))
        )}
      </svg>
      {/* Accent glow bottom-left */}
      <div aria-hidden="true" className="hidden lg:block absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(37,99,235,0.12) 0%,transparent 70%)' }} />

      {/* ══════════ MAIN GRID ══════════ */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">

        {/* ─── LEFT: text content ─── */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20 xl:px-28 py-24 lg:py-0 lg:max-w-[52%]">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 self-start mb-7">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-accent,#2563EB)' }} />
            <span className="lg:hidden text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.28)', background: 'rgba(255,255,255,0.10)' }}>
              Trusted Home Maintenance
            </span>
            <span className="hidden lg:inline text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ color: 'var(--color-accent,#2563EB)', border: '1px solid color-mix(in srgb,var(--color-accent,#2563EB) 28%,transparent)', background: 'color-mix(in srgb,var(--color-accent,#2563EB) 7%,transparent)' }}>
              Trusted Home Maintenance
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading font-bold tracking-tight mb-5" style={{ fontSize: 'clamp(2.6rem,4.5vw,5rem)', lineHeight: 1.04 }}>
            <span className="block lg:hidden text-white">
              M Yar Cool &amp; Clean<br />
              <span className="relative inline-block" style={{ color: '#93c5fd' }}>
                Home Maintenance Services
                <svg aria-hidden="true" viewBox="0 0 340 12" fill="none" style={{ position:'absolute',bottom:'-5px',left:0,width:'100%',height:'9px' }}>
                  <path d="M4 8 C80 2,180 11,336 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5" />
                </svg>
              </span>
            </span>
            <span className="hidden lg:block" style={{ color: 'var(--color-primary-900,#0f172a)' }}>
              M Yar Cool &amp; Clean<br />
              <span className="relative inline-block" style={{ color: 'var(--color-accent,#2563EB)' }}>
                Home Maintenance Services
                <svg aria-hidden="true" viewBox="0 0 340 12" fill="none" style={{ position:'absolute',bottom:'-5px',left:0,width:'100%',height:'9px' }}>
                  <path d="M4 8 C80 2,180 11,336 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.35" />
                </svg>
              </span>
            </span>
          </h1>

          {/* Sub-copy */}
          <p className="font-body leading-relaxed mb-10 lg:hidden" style={{ maxWidth:'30rem', fontSize:'1.05rem', color:'rgba(255,255,255,0.78)' }}>
            Professional home maintenance and repair services. Expert technicians, same-day service, transparent pricing.
          </p>
          <p className="hidden lg:block font-body leading-relaxed mb-10" style={{ maxWidth:'30rem', fontSize:'1.05rem', color:'var(--color-primary-600,#475569)' }}>
            Professional home maintenance and repair services. Expert technicians, same-day service, transparent pricing.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-14">
            <Link href="/product-category/uniform" className="btn-primary inline-flex items-center justify-center gap-2 group">
              Explore Services
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/contact-us" className="lg:hidden inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm"
              style={{ border:'1.5px solid rgba(255,255,255,0.42)', color:'white', background:'rgba(255,255,255,0.08)' }}>
              Get Quote
            </Link>
            <Link href="/contact-us" className="hidden lg:inline-flex btn-outline items-center justify-center gap-2">
              Get Quote
            </Link>
          </div>

          {/* Stats — mobile glass */}
          <div className="lg:hidden grid grid-cols-3 gap-3 rounded-2xl p-5"
            style={{ background:'rgba(255,255,255,0.09)', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)', border:'1px solid rgba(255,255,255,0.18)' }}>
            {[{num:'5K+',label:'Happy Clients'},{num:'20+',label:'Services'},{num:'4.9★',label:'Avg Rating'}].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold mb-0.5" style={{ color:'#93c5fd' }}>{s.num}</p>
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color:'rgba(255,255,255,0.58)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Stats — desktop: bordered left-accent panels */}
          <div className="hidden lg:flex items-start gap-8 pt-10 border-t" style={{ borderColor:'var(--color-primary-100,#f1f5f9)' }}>
            {[
              { num:'5K+', label:'Happy Clients', sub:'Across the region', accent: true },
              { num:'20+', label:'Services', sub:'Home & commercial', accent: false },
              { num:'4.9★', label:'Avg Rating', sub:'Verified reviews', accent: false },
            ].map((s) => (
              <div key={s.label} className="flex-1 pl-4 group transition-all duration-200 hover:pl-5"
                style={{ borderLeft: `3px solid ${s.accent ? 'var(--color-accent,#2563EB)' : 'var(--color-primary-200,#e2e8f0)'}` }}>
                <p className="text-3xl font-bold mb-0.5" style={{ color:'var(--color-accent,#2563EB)' }}>{s.num}</p>
                <p className="text-sm font-semibold mb-0.5" style={{ color:'var(--color-primary-900,#0f172a)' }}>{s.label}</p>
                <p className="text-xs" style={{ color:'var(--color-primary-400,#94a3b8)' }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── RIGHT: image panel (desktop only) ─── */}
        <div className="hidden lg:block relative flex-shrink-0" style={{ width: '48%' }}>

          {/* Tinted bg that fills the full right panel height */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(160deg,#f0f4ff 0%,#e8edf8 100%)' }} />

          {/* Diagonal accent slice in top-right corner */}
          <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
            style={{ background: 'linear-gradient(225deg,color-mix(in srgb,var(--color-accent,#2563EB) 12%,transparent) 0%,transparent 60%)' }} />

          {/* Image — centered, fixed width, no fill tricks */}
          <div className="absolute inset-0 flex items-center justify-center" ref={imageRef}>
            <div className="relative" style={{ width: '340px', height: '460px' }}>

              {/* Floating badge — top left of image */}
              <div className="absolute -top-5 -left-12 z-20 bg-white rounded-2xl px-4 py-3"
                style={{ minWidth:'190px', boxShadow:'0 8px 28px rgba(0,0,0,0.10)', border:'1px solid #f1f5f9' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:'#22c55e' }} />
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color:'#94a3b8' }}>Live Support</span>
                </div>
                <p className="text-sm font-semibold" style={{ color:'#0f172a' }}>24/7 Emergency Service</p>
              </div>

              {/* Main image card */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden"
                style={{ boxShadow:'0 24px 60px rgba(15,23,42,0.18),0 0 0 1px rgba(15,23,42,0.06)' }}>
                <Image src="/hero.png" alt="M Yar Cool & Clean professional technician" fill className="object-cover object-top" priority />
                {/* Inner bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-28"
                  style={{ background:'linear-gradient(to top,rgba(15,23,42,0.35),transparent)' }} />
                {/* Certified tag inside image */}
                <div className="absolute bottom-4 left-5 z-10 flex items-center gap-2">
                  <span className="w-5 h-px" style={{ background:'rgba(255,255,255,0.65)' }} />
                  <span className="text-white text-[10px] font-bold uppercase tracking-[0.15em]">Professional Certified</span>
                </div>
              </div>

              {/* Floating badge — bottom right of image */}
              <div className="absolute -bottom-5 -right-12 z-20 text-white rounded-2xl px-5 py-4"
                style={{ background:'var(--color-accent,#2563EB)', minWidth:'168px', boxShadow:'0 12px 36px rgba(37,99,235,0.38)' }}>
                <p className="text-sm font-bold mb-0.5">Same-Day Service</p>
                <p className="text-xs" style={{ color:'rgba(255,255,255,0.72)' }}>Fast response &amp; expert fixes</p>
              </div>

              {/* Vertical service count — right side */}
              <div className="absolute top-1/2 -right-16 -translate-y-1/2 flex flex-col items-center gap-2">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white"
                  style={{ background:'var(--color-accent,#2563EB)', boxShadow:'0 4px 14px rgba(37,99,235,0.32)' }}>
                  20+
                </div>
                <div className="w-px h-10 rounded-full" style={{ background:'#cbd5e1' }} />
                <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ writingMode:'vertical-rl', color:'#94a3b8' }}>Services</p>
              </div>

            </div>
          </div>

          {/* Dot grid bottom-right corner of panel */}
          <svg aria-hidden="true" className="absolute bottom-10 right-10 opacity-[0.12] pointer-events-none" width="100" height="100" viewBox="0 0 100 100">
            {Array.from({ length: 4 }, (_, r) =>
              Array.from({ length: 4 }, (_, c) => (
                <circle key={`${r}-${c}`} cx={c * 28 + 10} cy={r * 28 + 10} r="2.5" fill="var(--color-accent,#2563EB)" />
              ))
            )}
          </svg>
        </div>

      </div>
    </section>
  );
}