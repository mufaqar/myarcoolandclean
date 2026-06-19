import Link from 'next/link';

export const metadata = {
  title: 'Our Services',
  description: 'Professional home maintenance and repair services including AC repair, appliance repair, and cleaning services. Same-day service available.',
};

const services = [
  {
    title: 'AC Repair & Installation',
    description: 'Complete air conditioning solutions including repair, maintenance, installation, and gas refill for all brands. Our expert technicians handle split ACs, window units, central AC systems, and ducted cooling with precision and care.',
    href: '/services/ac-repair',
    features: ['AC Repair & Diagnostics', 'Gas Refill & Charging', 'AC Installation & Setup', 'Routine Maintenance', 'Emergency Repair 24/7', 'All Brands Supported'],
    image: '/acservices.png',
  },
  {
    title: 'Appliance Repair',
    description: 'Expert repair and maintenance for all home appliances including washing machines, refrigerators, deep freezers, and more. We service all major brands with genuine parts and professional workmanship.',
    href: '/services/appliance-repair',
    features: ['Washing Machine Repair', 'Refrigerator Service', 'Deep Freezer Repair', 'Dishwasher Repair', 'Microwave Oven Repair', 'Water Dispenser Repair'],
    image: '/cleaning.png',
  },
  {
    title: 'Cleaning Services',
    description: 'Professional deep cleaning services for carpets, sofas, upholstery, and homes. Using eco-friendly cleaning methods and modern equipment, we deliver spotless results that exceed expectations.',
    href: '/services/cleaning',
    features: ['Carpet Deep Cleaning', 'Sofa & Upholstery Cleaning', 'Home Deep Cleaning', 'Office Cleaning', 'Stain Removal', 'Eco-Friendly Methods'],
    image: '/acservices.png',
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-white py-16 border-b border-primary-200">
        <div className="container-lg text-center">
          <p className="section-eyebrow justify-center mb-4">What We Do</p>
          <h1 className="font-heading text-5xl md:text-6xl font-semibold text-primary-900">Our Services</h1>
          <p className="mt-6 text-lg text-primary-600 max-w-2xl mx-auto">
            Professional home maintenance and repair services tailored to your needs. Expert technicians, same-day service, and transparent pricing.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-lg space-y-24">
          {services.map((service, idx) => (
            <div key={service.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-900 mb-6">{service.title}</h2>
                <p className="text-primary-600 leading-relaxed mb-8">{service.description}</p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-primary-700">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link href={service.href} className="btn-primary">
                  Learn More
                </Link>
              </div>
              <div className={`relative h-80 bg-slate-100 border border-primary-200 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="absolute inset-0 flex items-center justify-center text-primary-300 text-lg font-semibold">
                  {service.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container-lg text-center">
          <h2 className="font-heading text-4xl font-bold text-primary-900 mb-6">Need Help?</h2>
          <p className="text-primary-600 mb-8 max-w-xl mx-auto">
            Contact us today for a free quote or emergency service. We&apos;re available 24/7.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact" className="btn-primary">Contact Us</Link>
            <a href="tel:+923056687553" className="btn-outline">Call Now</a>
          </div>
        </div>
      </section>
    </>
  );
}
