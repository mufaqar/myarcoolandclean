import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white" style={{ minHeight: '100svh' }}>
      <div className="lg:hidden absolute inset-0 z-0">
        <Image src="/hero.png" alt="M Yar Cool and Clean" fill className="object-cover object-center" priority />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,rgba(15,23,42,0.70) 0%,rgba(15,23,42,0.50) 45%,rgba(15,23,42,0.88) 100%)' }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20 xl:px-28 py-24 lg:py-0 lg:max-w-[52%]">
          <div className="inline-flex items-center gap-2 self-start mb-7">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-accent,#4a5f7f)' }} />
            <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full lg:hidden"
              style={{ color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.28)', background: 'rgba(255,255,255,0.10)' }}>
              Trusted Home Maintenance
            </span>
            <span className="hidden lg:inline text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ color: 'var(--color-accent,#4a5f7f)', border: '1px solid rgba(74,95,127,0.28)', background: 'rgba(74,95,127,0.07)' }}>
              Trusted Home Maintenance
            </span>
          </div>

          <h1 className="font-heading font-bold tracking-tight mb-5" style={{ fontSize: 'clamp(2.6rem,4.5vw,5rem)', lineHeight: 1.04 }}>
            <span className="block lg:hidden text-white">
              M Yar Cool &amp; Clean<br />
              <span className="relative inline-block" style={{ color: '#93c5fd' }}>
                Home Maintenance Services
              </span>
            </span>
            <span className="hidden lg:block" style={{ color: 'var(--color-primary-900,#0f172a)' }}>
              M Yar Cool &amp; Clean<br />
              <span className="relative inline-block" style={{ color: 'var(--color-accent,#4a5f7f)' }}>
                Home Maintenance Services
              </span>
            </span>
          </h1>

          <p className="font-body leading-relaxed mb-10 lg:hidden" style={{ maxWidth: '30rem', fontSize: '1.05rem', color: 'rgba(255,255,255,0.78)' }}>
            Professional home maintenance and repair services. Expert technicians, same-day service, transparent pricing.
          </p>
          <p className="hidden lg:block font-body leading-relaxed mb-10" style={{ maxWidth: '30rem', fontSize: '1.05rem', color: 'var(--color-primary-600,#475569)' }}>
            Professional home maintenance and repair services. Expert technicians, same-day service, transparent pricing.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-14">
            <Link href="/services" className="btn-primary inline-flex items-center justify-center gap-2 group">
              Explore Services
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/contact" className="lg:hidden inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm"
              style={{ border: '1.5px solid rgba(255,255,255,0.42)', color: 'white', background: 'rgba(255,255,255,0.08)' }}>
              Get Quote
            </Link>
            <Link href="/contact" className="hidden lg:inline-flex btn-outline items-center justify-center gap-2">
              Get Quote
            </Link>
          </div>

          <div className="lg:hidden grid grid-cols-3 gap-3 rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.09)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.18)' }}>
            {[{ num: '5K+', label: 'Happy Clients' }, { num: '20+', label: 'Services' }, { num: '4.9★', label: 'Avg Rating' }].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold mb-0.5" style={{ color: '#93c5fd' }}>{s.num}</p>
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.58)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-start gap-8 pt-10 border-t" style={{ borderColor: 'var(--color-primary-100,#f1f5f9)' }}>
            {[
              { num: '5K+', label: 'Happy Clients', sub: 'Across the region', accent: true },
              { num: '20+', label: 'Services', sub: 'Home & commercial', accent: false },
              { num: '4.9★', label: 'Avg Rating', sub: 'Verified reviews', accent: false },
            ].map((s) => (
              <div key={s.label} className="flex-1 pl-4 group transition-all duration-200 hover:pl-5"
                style={{ borderLeft: `3px solid ${s.accent ? 'var(--color-accent,#4a5f7f)' : 'var(--color-primary-200,#e2e8f0)'}` }}>
                <p className="text-3xl font-bold mb-0.5" style={{ color: 'var(--color-accent,#4a5f7f)' }}>{s.num}</p>
                <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--color-primary-900,#0f172a)' }}>{s.label}</p>
                <p className="text-xs" style={{ color: 'var(--color-primary-400,#94a3b8)' }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block relative flex-shrink-0" style={{ width: '48%' }}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg,#f0f4ff 0%,#e8edf8 100%)' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative" style={{ width: '340px', height: '460px' }}>
              <div className="absolute -top-5 -left-12 z-20 bg-white rounded-2xl px-4 py-3"
                style={{ minWidth: '190px', boxShadow: '0 8px 28px rgba(0,0,0,0.10)', border: '1px solid #f1f5f9' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#94a3b8' }}>Live Support</span>
                </div>
                <p className="text-sm font-semibold" style={{ color: '#0f172a' }}>24/7 Emergency Service</p>
              </div>

              <div className="relative w-full h-full rounded-3xl overflow-hidden"
                style={{ boxShadow: '0 24px 60px rgba(15,23,42,0.18),0 0 0 1px rgba(15,23,42,0.06)' }}>
                <Image src="/hero.png" alt="Professional technician" fill className="object-cover object-top" priority />
                <div className="absolute inset-x-0 bottom-0 h-28" style={{ background: 'linear-gradient(to top,rgba(15,23,42,0.35),transparent)' }} />
                <div className="absolute bottom-4 left-5 z-10 flex items-center gap-2">
                  <span className="w-5 h-px" style={{ background: 'rgba(255,255,255,0.65)' }} />
                  <span className="text-white text-[10px] font-bold uppercase tracking-[0.15em]">Professional Certified</span>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-12 z-20 text-white rounded-2xl px-5 py-4"
                style={{ background: 'var(--color-accent,#4a5f7f)', minWidth: '168px', boxShadow: '0 12px 36px rgba(74,95,127,0.38)' }}>
                <p className="text-sm font-bold mb-0.5">Same-Day Service</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.72)' }}>Fast response &amp; expert fixes</p>
              </div>

              <div className="absolute top-1/2 -right-16 -translate-y-1/2 flex flex-col items-center gap-2">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white"
                  style={{ background: 'var(--color-accent,#4a5f7f)', boxShadow: '0 4px 14px rgba(74,95,127,0.32)' }}>
                  20+
                </div>
                <div className="w-px h-10 rounded-full" style={{ background: '#cbd5e1' }} />
                <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ writingMode: 'vertical-rl', color: '#94a3b8' }}>Services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
