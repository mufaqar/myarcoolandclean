import Link from 'next/link';

export const metadata = {
  title: 'Cleaning Services',
  description: 'Professional cleaning services including carpet deep cleaning, sofa upholstery cleaning, and home cleaning. Eco-friendly methods, thorough results.',
};

export default function CleaningPage() {
  return (
    <>
      <section className="bg-white py-16 border-b border-primary-200">
        <div className="container-lg">
          <p className="section-eyebrow">Services</p>
          <h1 className="font-heading text-5xl md:text-6xl font-semibold text-primary-900 mb-6">Cleaning Services</h1>
          <p className="text-lg text-primary-600 max-w-3xl">
            Professional deep cleaning for carpets, sofas, upholstery, and homes. Eco-friendly methods and modern equipment for spotless results.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary-900 mb-6">Professional Cleaning Services</h2>
              <p className="text-primary-600 leading-relaxed mb-6">
                At M Yar Cool and Clean, we offer comprehensive cleaning services using eco-friendly products and state-of-the-art equipment. Our trained cleaning professionals deliver thorough, deep cleaning that revitalizes your carpets, sofas, and living spaces.
              </p>
              <p className="text-primary-600 leading-relaxed mb-6">
                We understand that a clean home is essential for your family&apos;s health and comfort. That&apos;s why we use safe, non-toxic cleaning solutions that are tough on dirt but gentle on fabrics and the environment.
              </p>

              <h3 className="font-heading text-xl font-semibold text-primary-900 mt-10 mb-4">Our Cleaning Services Include:</h3>
              <div className="space-y-3">
                {[
                  'Carpet Deep Cleaning - Hot water extraction for deep carpet cleaning',
                  'Sofa & Upholstery Cleaning - Professional sofa, chair, and fabric cleaning',
                  'Home Deep Cleaning - Comprehensive home cleaning service',
                  'Office Cleaning - Professional commercial cleaning',
                  'Stain Removal - Expert treatment for tough stains',
                  'Mattress Cleaning - Deep cleaning for healthier sleep',
                  'Curtain & Drapes Cleaning - Professional fabric care',
                  'Eco-Friendly Methods - Safe, non-toxic cleaning products',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span className="text-primary-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-slate-50 border border-primary-200 p-8 mb-8">
                <h3 className="font-heading text-xl font-semibold text-primary-900 mb-4">Benefits of Professional Cleaning</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Healthier Home', desc: 'Remove allergens, dust mites, and bacteria' },
                    { title: 'Longer Fabric Life', desc: 'Professional care extends carpet and upholstery life' },
                    { title: 'Deep Clean Results', desc: 'Advanced equipment for thorough cleaning' },
                    { title: 'Eco-Friendly', desc: 'Safe for kids, pets, and the environment' },
                  ].map((item) => (
                    <div key={item.title} className="bg-white border border-primary-200 p-4">
                      <p className="font-semibold text-primary-900 text-sm mb-1">{item.title}</p>
                      <p className="text-primary-500 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-accent text-white p-8">
                <h3 className="font-heading text-xl font-semibold mb-3">Book a Cleaning Service</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Schedule your cleaning service today. Free quotes available.
                </p>
                <div className="flex gap-4">
                  <a href="tel:+923056687553" className="bg-white text-accent font-semibold px-6 py-3 text-sm hover:bg-white/90 transition-colors">
                    Call +92 305 6687553
                  </a>
                  <Link href="/contact" className="border border-white text-white font-semibold px-6 py-3 text-sm hover:bg-white/10 transition-colors">
                    Send Message
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container-lg text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-900 mb-4">Ready for a Cleaner Home?</h2>
          <p className="text-primary-600 mb-8">Contact us to schedule your cleaning service.</p>
          <Link href="/contact" className="btn-primary">Book Cleaning</Link>
        </div>
      </section>
    </>
  );
}
