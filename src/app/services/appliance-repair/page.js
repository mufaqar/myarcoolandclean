import Link from 'next/link';

export const metadata = {
  title: 'Appliance Repair Services',
  description: 'Professional appliance repair services for washing machines, refrigerators, and more. Expert technicians, same-day service, all brands supported.',
};

export default function ApplianceRepairPage() {
  return (
    <>
      <section className="bg-white py-16 border-b border-primary-200">
        <div className="container-lg">
          <p className="section-eyebrow">Services</p>
          <h1 className="font-heading text-5xl md:text-6xl font-semibold text-primary-900 mb-6">Appliance Repair Services</h1>
          <p className="text-lg text-primary-600 max-w-3xl">
            Expert repair and maintenance for all home appliances. Washing machines, refrigerators, deep freezers, and more. Same-day service with genuine parts.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary-900 mb-6">Comprehensive Appliance Repair</h2>
              <p className="text-primary-600 leading-relaxed mb-6">
                M Yar Cool and Clean provides professional repair and maintenance services for all types of home appliances. Our skilled technicians are trained to diagnose and fix issues efficiently, ensuring your appliances are back in working order as quickly as possible.
              </p>
              <p className="text-primary-600 leading-relaxed mb-6">
                We service all major brands including Haier, Dawlance, LG, Samsung, Siemens, Electrolux, Kenwood, and many more. Our commitment to quality means we use genuine parts and provide warranty on all repairs.
              </p>

              <h3 className="font-heading text-xl font-semibold text-primary-900 mt-10 mb-4">Appliances We Repair:</h3>
              <div className="space-y-3">
                {[
                  'Washing Machine Repair - Front load, top load, and semi-automatic machines',
                  'Refrigerator Repair - Single door, double door, and side-by-side refrigerators',
                  'Deep Freezer Repair - Chest freezers and upright freezers',
                  'Dishwasher Repair - All brands and models',
                  'Microwave Oven Repair - Solo, grill, and convection microwaves',
                  'Water Dispenser Repair - Hot and cold water dispensers',
                  'Clothes Dryer Repair - Ventless and vented dryers',
                  'Oven & Cooker Repair - Built-in and freestanding units',
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
                <h3 className="font-heading text-xl font-semibold text-primary-900 mb-4">Why Choose Us?</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Certified Technicians', desc: 'Trained and experienced professionals' },
                    { title: 'Same-Day Service', desc: 'Fast response when you need it most' },
                    { title: 'Genuine Parts', desc: 'Quality replacement parts with warranty' },
                    { title: 'Transparent Pricing', desc: 'Clear quotes with no hidden charges' },
                  ].map((item) => (
                    <div key={item.title} className="bg-white border border-primary-200 p-4">
                      <p className="font-semibold text-primary-900 text-sm mb-1">{item.title}</p>
                      <p className="text-primary-500 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-accent text-white p-8">
                <h3 className="font-heading text-xl font-semibold mb-3">Need Appliance Repair?</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Contact us today for fast, reliable appliance repair service.
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
          <h2 className="font-heading text-3xl font-bold text-primary-900 mb-4">Book a Service Today</h2>
          <p className="text-primary-600 mb-8">Get your appliances fixed by the experts.</p>
          <Link href="/contact" className="btn-primary">Book Now</Link>
        </div>
      </section>
    </>
  );
}
