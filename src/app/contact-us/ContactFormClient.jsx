'use client';
import { useState } from 'react';
import { FiMapPin, FiMail, FiPhone, FiClock } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { inquiriesApi } from '@/lib/api';
import toast from 'react-hot-toast';

const contactInfo = [
  { icon: FiMapPin, label: 'Service Areas', value: 'Islamabad & Rawalpindi, Pakistan' },
  { icon: FiMail, label: 'Email Us', value: 'myarcoolandclean@gmail.com', href: 'mailto:myarcoolandclean@gmail.com' },
  { icon: FiPhone, label: 'Call Us', value: '+92 305 6687553', href: 'tel:+923056687553' },
];

const socialLinks = [
  { icon: FaFacebook, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
];

const categories = [
  'Chef Wear', 'Medical Wear', 'Patient Wear',
  'Maid Uniforms', 'Bed Linen', 'Accessories',
  'Ladies Fashion', 'Corporate Wear', 'Other',
];

export default function ContactFormClient() {
  const [form, setForm] = useState({ name: '', email: '', category: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await inquiriesApi.submit(form);
      toast.success('Message sent! We will get back to you shortly.');
      setForm({ name: '', email: '', category: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 border-b border-primary-200">
        <div className="container-lg text-center">
          <p className="section-eyebrow justify-center mb-4">Get in Touch</p>
          <h1 className="font-heading text-5xl md:text-6xl font-semibold text-primary-900 mb-1">Contact Us</h1>
        </div>
      </section>

      {/* Map Location */}
      <section className="py-12">
        <div className="container-lg">
          <div className="overflow-hidden border border-primary-200 rounded-2xl shadow-2xl">
            <iframe
              title="M Yar Cool and Clean Service Areas - Islamabad & Rawalpindi"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.948!2d72.9840469!3d33.6747803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbdfbd2d83da9%3A0x7002ca260dbb4d6a!2s480%20Street%203%2C%20F-11%2F1%2C%20Islamabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1717260000000!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Contact Info - Dark Card */}
            <div className="lg:col-span-2">

              <div 
                className="relative overflow-hidden py-16 px-8 bg-primary-900 border border-primary-800"
              >
                {/* Subtle background */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)', backgroundSize: '40px 40px' }} />
                
                {/* Content */}
                <div className="relative z-10 space-y-10">
                  {/* Contact Items */}
                  <div className="space-y-8">
                    {contactInfo.map(({ icon: Icon, label, value, href }) => (
                      <div key={label}>
                        <div className="flex items-start gap-4">
                          <Icon size={24} className="text-gold flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-sm font-semibold text-white opacity-80 uppercase tracking-widest mb-1">
                              {label}
                            </p>
                            {href ? (
                              <a href={href} className="text-lg font-medium text-white hover:text-gold transition-colors">
                                {value}
                              </a>
                            ) : (
                              <p className="text-lg font-medium text-white">{value}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Socials */}
                  <div className="pt-8 border-t border-white/20">
                    <p className="text-sm font-semibold text-white opacity-80 uppercase tracking-widest mb-4">
                      Follow Us
                    </p>
                    <div className="flex gap-3">
                      {socialLinks.map(({ icon: Icon, href, label }) => (
                        <a
                          key={label}
                          href={href}
                          aria-label={label}
                          className="w-10 h-10 bg-white/20 hover:bg-gold rounded-full flex items-center justify-center text-white hover:text-[#425a45] transition-all duration-300"
                        >
                          <Icon size={18} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handle}
                  placeholder="Your full name"
                  required
                  className="w-full px-4 py-3 border border-primary-200 bg-white text-primary-900 placeholder-primary-400 rounded-none focus:outline-none focus:border-accent focus:ring-0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handle}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 border border-primary-200 bg-white text-primary-900 placeholder-primary-400 rounded-none focus:outline-none focus:border-accent focus:ring-0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handle}
                  className="w-full px-4 py-3 border border-primary-200 bg-white text-primary-900 rounded-none focus:outline-none focus:border-accent focus:ring-0"
                >
                  <option value="">Select a category...</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handle}
                  placeholder="Tell us how we can help..."
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-primary-200 bg-white text-primary-900 placeholder-primary-400 rounded-none focus:outline-none focus:border-accent focus:ring-0 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
