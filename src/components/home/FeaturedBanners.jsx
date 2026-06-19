import Link from 'next/link';
import Image from 'next/image';

const banners = [
  { eyebrow: 'Emergency Service', title: 'AC Repair & Installation', href: '/services/ac-repair', image: '/acservices.png', bg: 'bg-slate-100' },
  { eyebrow: 'Featured Service', title: 'Deep Cleaning Service', href: '/services/cleaning', image: '/cleaning.png', bg: 'bg-primary-900', dark: true },
];

export default function FeaturedBanners() {
  return (
    <section className="py-28 bg-slate-50">
      <div className="container-lg">
        <div className="mb-16">
          <p className="section-eyebrow">Featured Offers</p>
          <h2 className="section-title">Special Promotions</h2>
        </div>

        <div className="space-y-6">
          {banners.map((b, idx) => (
            <Link
              key={b.title}
              href={b.href}
              className={`group relative overflow-hidden ${b.bg} flex items-center justify-between min-h-[240px] px-8 md:px-12 py-8 md:py-12 transition-all duration-300 hover:shadow-lg border border-primary-200 hover:border-accent ${idx === 0 ? 'lg:col-span-2' : ''}`}
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
                  Get Started &rarr;
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
