export const metadata = {
  title: 'About Us',
  description: 'Learn about M Yar Cool and Clean — your trusted partner for professional home maintenance and repair services in Pakistan.',
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-white py-16 border-b border-primary-200">
        <div className="container-lg text-center">
          <p className="section-eyebrow justify-center mb-4">Our Story</p>
          <h1 className="font-heading text-5xl md:text-6xl font-semibold text-primary-900">About M Yar Cool and Clean</h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-lg space-y-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-semibold text-primary-900 mb-8">Our Mission</h2>
            <p className="text-primary-700 text-lg leading-relaxed mb-6">
              M Yar Cool and Clean is built on a simple belief: quality home maintenance should be reliable, affordable, and accessible to everyone. We provide professional home maintenance and repair services across Pakistan, specializing in AC repair, appliance maintenance, and cleaning services.
            </p>
            <p className="text-primary-600 leading-relaxed mb-6">
              With years of experience serving Islamabad and Rawalpindi, our team of certified technicians is committed to delivering exceptional service quality. We understand the importance of a well-maintained home and the peace of mind that comes with knowing your appliances and systems are in expert hands.
            </p>
            <p className="text-primary-600 leading-relaxed">
              Whether you need urgent AC repair, routine appliance maintenance, or professional cleaning services, we&apos;re here 24/7 to help. Our transparent pricing, same-day service, and commitment to customer satisfaction make us the trusted choice for home maintenance in Pakistan.
            </p>
          </div>

          <div className="bg-slate-50 p-12 border border-primary-200">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-primary-900 mb-12 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: 'Quality', desc: 'Expert workmanship and reliable solutions for every service we provide.' },
                { title: 'Reliability', desc: 'Same-day service and on-time completion you can count on, every time.' },
                { title: 'Affordability', desc: 'Transparent pricing without hidden fees or surprises. Fair rates for quality work.' },
              ].map((v) => (
                <div key={v.title} className="text-center">
                  <h3 className="font-heading text-lg font-semibold text-accent mb-3">{v.title}</h3>
                  <p className="text-primary-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-semibold text-primary-900 mb-8">Why Choose Us?</h2>
            <div className="space-y-6">
              {[
                { title: 'Expert Technicians', desc: 'Our certified technicians have years of experience servicing all major appliance brands.' },
                { title: '24/7 Emergency Service', desc: 'Round-the-clock emergency support for urgent AC repairs and appliance issues.' },
                { title: 'Same-Day Service', desc: 'Fast response times and same-day service for most maintenance needs.' },
                { title: 'Transparent Pricing', desc: 'Clear, upfront quotes with no hidden charges. We tell you the cost before we start.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-lg bg-slate-50 border border-primary-200">
                  <div className="flex-shrink-0 w-1 bg-accent rounded" />
                  <div>
                    <p className="font-semibold text-primary-900">{item.title}</p>
                    <p className="text-sm text-primary-600 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
