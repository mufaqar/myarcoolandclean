import Image from 'next/image';
import Link from 'next/link';

const stats = [
  { value: '3K+', label: 'Homes Served' },
  { value: '8K+', label: 'Services Completed' },
  { value: '4.9', label: 'Customer Rating' },
];

export default function AboutSection() {
  return (
    <section className="py-32 bg-primary-50">
      <div className="container-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-5 relative">
            <div className="relative w-full h-[500px] lg:h-[600px] bg-slate-200 border border-primary-200 overflow-hidden">
              <Image
                src="/about.png"
                alt="M Yar Cool and Clean Services"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-12 -right-8 bg-accent text-white p-8 w-56 shadow-xl border border-accent-light">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold">4.9</span>
                <span className="text-2xl">★</span>
              </div>
              <p className="text-sm text-accent-light mb-1">Customer Rating</p>
              <p className="text-xs text-white/70">Based on 3K+ reviews</p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="section-eyebrow">About M Yar Cool and Clean</p>
            <h2 className="section-title mb-10 text-5xl">
              We Keep Your Home Running Perfectly
            </h2>

            <div className="space-y-6 mb-10">
              <p className="text-primary-700 text-lg leading-relaxed">
                M Yar Cool and Clean is built on a simple belief: quality home maintenance should be reliable, affordable, and accessible to everyone.
              </p>
              <p className="text-primary-600 text-base leading-relaxed">
                Our certified technicians deliver expert service in AC repair, appliance maintenance, and professional cleaning &mdash; all with transparent pricing and same-day availability because your home deserves the best.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 mb-12 pt-8 border-t border-primary-200">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-5xl font-bold text-accent mb-2">{s.value}</p>
                  <p className="text-xs text-primary-500 font-medium uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Link href="/about" className="btn-primary">Learn Our Story</Link>
              <Link href="/contact" className="btn-outline">Get Service</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
