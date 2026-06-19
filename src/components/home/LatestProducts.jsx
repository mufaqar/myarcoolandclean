import Link from 'next/link';

const services = [
  {
    title: 'AC Repair & Maintenance',
    description: 'Complete AC repair solutions for all brands with emergency support. Gas refill, compressor repair, and routine maintenance.',
    href: '/services/ac-repair',
  },
  {
    title: 'Appliance Repair Services',
    description: 'Washing machine, refrigerator, and other home appliance repairs. Expert diagnostics and reliable fixes.',
    href: '/services/appliance-repair',
  },
  {
    title: 'Professional Cleaning',
    description: 'Deep carpet, sofa, and home cleaning with eco-friendly methods. Upholstery care and stain removal.',
    href: '/services/cleaning',
  },
];

export default function LatestProducts() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container-lg">
        <div className="mb-12">
          <p className="section-eyebrow">Our Services</p>
          <h2 className="section-title text-4xl md:text-5xl">What We Offer</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group p-8 border border-primary-200 bg-white hover:border-accent hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-heading text-lg font-semibold text-primary-900 mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-primary-600 leading-relaxed">
                {service.description}
              </p>
              <span className="inline-block mt-6 text-xs font-semibold text-accent group-hover:gap-3 flex items-center gap-2 transition-all">
                Learn More &rarr;
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="btn-primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
