import HeroSection from '@/components/home/HeroSection';
import FeaturedBanners from '@/components/home/FeaturedBanners';
import AboutSection from '@/components/home/AboutSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import LatestProducts from '@/components/home/LatestProducts';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import BrandSlider from '@/components/home/BrandSlider';

// ISR: Revalidate the page every 3600 seconds (1 hour)
export const revalidate = 3600;

// Static rendering strategy for homepage
export const dynamic = 'force-static';

export const metadata = {
  title: 'Home Maintenance & AC Repair Services Pakistan',
  description:
    'M Yar Cool & Clean provides professional home maintenance and AC repair services across Pakistan. Expert technicians, same-day service, 24/7 emergency support for AC repair, washing machine service, fridge repair, and carpet cleaning.',
};

// JSON-LD Structured Data for Organization + LocalBusiness
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://myarcoolandclean.com/#organization',
      name: 'M Yar Cool and Clean',
      url: 'https://myarcoolandclean.com',
      logo: 'https://myarcoolandclean.com/logo.png',
      description: 'Professional home maintenance and repair services across Pakistan',
      sameAs: [
        'https://www.facebook.com/myarcoolandclean',
        'https://www.instagram.com/myarcoolandclean',
        'https://www.linkedin.com/company/myarcoolandclean',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+92 305 6687553',
        email: 'myarcoolandclean@gmail.com',
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://myarcoolandclean.com/#localbusiness',
      name: 'M Yar Cool and Clean',
      url: 'https://myarcoolandclean.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Your Address',
        addressLocality: 'Islamabad & Rawalpindi',
        addressRegion: 'Punjab',
        postalCode: '46000',
        addressCountry: 'PK',
      },
      telephone: '+923056687553',
      priceRange: '$$$',
      areaServed: {
        '@type': 'Country',
        name: 'PK',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      {/* Inject JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <HeroSection />
      <FeaturedBanners />
      <AboutSection />
      <CategoriesSection />
      <LatestProducts eyebrow="New Arrivals" title="Latest Services" />
      <WhyChooseUs />
      <LatestProducts
        eyebrow="Featured Services"
        title="Editor Choice's"
        queryParams={{ editorChoice: true }}
      />
      <BrandSlider />

      <section className="py-20 px-6 md:px-12 lg:px-20 relative">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="section-eyebrow text-accent">Why Choose Us</p>
            <h2 className="section-title">M Yar Cool & Clean — Your Trusted Home Maintenance Partner</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Professional Home Maintenance & AC Repair Services</h3>
                <p className="text-primary-700 leading-relaxed">
                  M Yar Cool & Clean specializes in comprehensive home maintenance and AC repair services across Pakistan. Our professional team handles AC repair and installation for all brands, washing machine repair, refrigerator repair, carpet cleaning, and sofa upholstery cleaning services with expert precision and care.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Available 24/7 for Emergency Support</h3>
                <p className="text-primary-700 leading-relaxed">
                  With extensive experience in home maintenance, our expert technicians are trained to handle all types of AC units and appliances. We deliver same-day service when urgently needed and maintain the highest standards of professionalism. Contact us anytime for emergency AC repair, appliance maintenance, or cleaning services.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary-900 mb-6">Our Services Include:</h3>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-lg bg-slate-50 border border-primary-200">
                  <div className="flex-shrink-0 w-1 bg-accent rounded"></div>
                  <div>
                    <p className="font-semibold text-primary-900">AC Repair & Installation</p>
                    <p className="text-sm text-primary-600 mt-1">Complete AC repair solutions for all brands with emergency support</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-lg bg-slate-50 border border-primary-200">
                  <div className="flex-shrink-0 w-1 bg-accent rounded"></div>
                  <div>
                    <p className="font-semibold text-primary-900">Appliance Repair Services</p>
                    <p className="text-sm text-primary-600 mt-1">Washing machine, refrigerator, and other home appliance repairs</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-lg bg-slate-50 border border-primary-200">
                  <div className="flex-shrink-0 w-1 bg-accent rounded"></div>
                  <div>
                    <p className="font-semibold text-primary-900">Professional Cleaning</p>
                    <p className="text-sm text-primary-600 mt-1">Deep carpet, sofa, and home cleaning with eco-friendly methods</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 rounded-2xl border border-accent/20" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(37,99,235,0.03) 100%)' }}>
            <p className="text-primary-700 text-center leading-relaxed">
              M Yar Cool & Clean provides reliable home maintenance solutions with transparent pricing and professional service. Whether you need urgent AC repair, routine appliance maintenance, or premium cleaning services, we're here 24/7 across Pakistan. <span className="font-semibold text-primary-900">Get in touch today for your home maintenance needs.</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
