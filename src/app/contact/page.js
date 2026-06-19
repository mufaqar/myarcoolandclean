import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with M Yar Cool and Clean. Contact us for service requests, quotes, and emergency repairs. Available 24/7.',
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-white py-16 border-b border-primary-200">
        <div className="container-lg text-center">
          <p className="section-eyebrow justify-center mb-4">Get in Touch</p>
          <h1 className="font-heading text-5xl md:text-6xl font-semibold text-primary-900">Contact Us</h1>
          <p className="mt-6 text-lg text-primary-600 max-w-2xl mx-auto">
            We&apos;re here to help. Contact us for service requests, quotes, or emergency repairs.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-3xl font-bold text-primary-900 mb-8">Get In Touch</h2>
              <p className="text-primary-600 mb-10">
                Reach out to us for any inquiries, service requests, or emergency repairs. Our team is available 24/7 to assist you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <FiPhone className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-900 mb-1">Phone</p>
                    <a href="tel:+923056687553" className="text-primary-600 hover:text-accent transition-colors">+92 305 6687553</a>
                    <br />
                    <a href="tel:+923347787554" className="text-primary-600 hover:text-accent transition-colors">+92 334 7787554</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <FiMail className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-900 mb-1">Email</p>
                    <a href="mailto:myarcoolandclean@gmail.com" className="text-primary-600 hover:text-accent transition-colors">
                      myarcoolandclean@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-900 mb-1">Location</p>
                    <p className="text-primary-600">Islamabad & Rawalpindi, Pakistan</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-slate-50 border border-primary-200">
                <h3 className="font-heading text-lg font-semibold text-primary-900 mb-2">24/7 Emergency Service</h3>
                <p className="text-primary-600 text-sm mb-4">
                  For urgent AC repairs or appliance emergencies, call us anytime.
                </p>
                <a href="tel:+923056687553" className="btn-primary text-sm">
                  Call Emergency Line
                </a>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-3xl font-bold text-primary-900 mb-8">Send Us a Message</h2>
              <form
                action="mailto:myarcoolandclean@gmail.com"
                method="POST"
                encType="text/plain"
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-primary-200 bg-white text-sm text-primary-900 outline-none focus:border-accent transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-primary-200 bg-white text-sm text-primary-900 outline-none focus:border-accent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-primary-200 bg-white text-sm text-primary-900 outline-none focus:border-accent transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-primary-700 mb-2">Service Needed</label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-primary-200 bg-white text-sm text-primary-900 outline-none focus:border-accent transition-colors"
                  >
                    <option value="">Select a service...</option>
                    <option value="AC Repair">AC Repair & Installation</option>
                    <option value="Appliance Repair">Appliance Repair</option>
                    <option value="Cleaning">Cleaning Services</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-primary-200 bg-white text-sm text-primary-900 outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Describe your service needs..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
