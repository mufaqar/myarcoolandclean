import AboutSection from "@/components/home/AboutSection";

// ISR: Revalidate every 7 days
export const revalidate = 604800;

// Static rendering
export const dynamic = 'force-static';

export const metadata = {
  title: 'About myarcoolandclean — Your Professional Home Maintenance Partner',
  description: 'Learn about myarcoolandclean — your trusted partner for professional home maintenance in UAE. Quality, reliability, and innovation in every service.',
  keywords: ['about us', 'myarcoolandclean', 'home maintenance', 'UAE services', 'company story'],
  alternates: {
    canonical: 'https://myarcoolandclean.com/about-us',
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  mainEntity: {
    '@type': 'Organization',
    name: 'myarcoolandclean',
    url: 'https://myarcoolandclean.com',
    description: 'Professional home maintenance and repair services across the UAE',
    founder: {
      '@type': 'Person',
      name: 'myarcoolandclean Founders',
    },
    foundingDate: '2015', // Update with actual founding date
    areaServed: {
      '@type': 'Country',
      name: 'AE',
    },
    knowsAbout: ['Plumbing', 'Electrical', 'Carpentry', 'HVAC', 'Home Maintenance', 'Repairs'],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero */}
      <section className="bg-white py-16 border-b border-primary-200">
        <div className="container-lg text-center">
          <p className="section-eyebrow justify-center mb-4">Our Story</p>
          <h1 className="font-heading text-5xl md:text-6xl font-semibold text-primary-900">M Yar Cool and Clean</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container-lg space-y-16">
          
          <AboutSection />

          <div className="bg-slate-50 p-12 border border-primary-200">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-primary-900 mb-12 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: 'Quality', desc: 'Expert workmanship and reliable solutions for every service' },
                { title: 'Reliability', desc: 'Same-day service and on-time completion you can count on' },
                { title: 'Affordability', desc: 'Transparent pricing without hidden fees or surprises' },
              ].map((v) => (
                <div key={v.title} className="text-center">
                  <h3 className="font-heading text-lg font-semibold text-accent mb-3">{v.title}</h3>
                  <p className="text-primary-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
