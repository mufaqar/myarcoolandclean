import Link from 'next/link';

const services = [
  {
    title: 'AC Repair & Installation',
    description: 'Professional AC repair, maintenance, and installation for all brands. Emergency service available 24/7.',
    href: '/services/ac-repair',
    popular: true,
  },
  {
    title: 'Appliance Repair',
    description: 'Expert repair for washing machines, refrigerators, and all home appliances. Same-day service.',
    href: '/services/appliance-repair',
  },
  {
    title: 'Cleaning Services',
    description: 'Deep carpet cleaning, sofa upholstery cleaning, and professional home cleaning with eco-friendly methods.',
    href: '/services/cleaning',
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-28 bg-white">
      <div className="container-lg">
        <div className="mb-16">
          <p className="section-eyebrow">What We Do</p>
          <h2 className="section-title">Our Services</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative overflow-hidden bg-white border border-primary-200 hover:border-accent transition-all duration-300 p-8 hover:shadow-lg"
            >
              {service.popular && (
                <span className="inline-block mb-4 text-xs font-semibold text-white bg-accent px-3 py-1 uppercase tracking-wide">
                  Most Popular
                </span>
              )}
              <h3 className="font-heading text-xl font-semibold text-primary-900 mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-primary-600 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <span className="text-xs font-semibold text-accent group-hover:gap-3 inline-flex items-center gap-2 transition-all">
                Learn More &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
