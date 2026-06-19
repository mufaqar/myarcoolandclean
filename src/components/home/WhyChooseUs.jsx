import Link from 'next/link';
import { TbRosette, TbShieldCheck, TbCertificate, TbHeadset } from 'react-icons/tb';

const features = [
  {
    icon: TbRosette,
    title: 'Expert Technicians',
    desc: 'Our certified and trained technicians have years of experience servicing all major appliance brands and home maintenance needs.',
  },
  {
    icon: TbShieldCheck,
    title: 'Quality Workmanship',
    desc: 'Every repair is done right the first time, ensuring your appliances run efficiently and problems stay solved.',
  },
  {
    icon: TbCertificate,
    title: 'Affordable Pricing',
    desc: 'Transparent, honest quotes with no hidden charges. We believe quality service should be accessible to everyone.',
  },
  {
    icon: TbHeadset,
    title: '24/7 Support',
    desc: 'Emergency services available round the clock. Reach us via WhatsApp, phone, or email anytime for quick assistance.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-32 bg-white">
      <div className="container-lg">
        {/* Header section */}
        <div className="max-w-3xl mb-20">
          <p className="section-eyebrow">Why Choose Us</p>
          <h2 className="section-title mb-8 text-5xl">
            The Trusted Name in Home Maintenance
          </h2>
          <p className="text-primary-600 text-lg leading-relaxed">
            At myarcoolandclean, we specialize in professional appliance repair, maintenance, and home services. Whether it's AC repairs, washing machine service, or professional cleaning, our experienced technicians deliver reliable solutions with a focus on quality and affordability.
          </p>
        </div>

        {/* Features Grid - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((f, idx) => (
            <div
              key={f.title}
              className={`group p-8 border transition-all duration-300 ${
                idx === 0 
                  ? 'border-primary-200 bg-white hover:border-accent hover:shadow-lg' 
                  : 'border-primary-200 bg-white hover:border-accent hover:shadow-lg'
              }`}
            >
              <div className={`w-14 h-14 flex items-center justify-center mb-6 transition-colors duration-300 bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white`}>
                <f.icon size={24} />
              </div>
              <h4 className={`font-heading text-lg font-semibold mb-3 text-black text-primary-900`}>
                {f.title}
              </h4>
              <p className={`text-sm leading-relaxed text-black text-primary-600`}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-primary-200">
          <Link href="/about-us" className="btn-primary">
            Discover Our Promise
          </Link>
        </div>
      </div>
    </section>
  );
}