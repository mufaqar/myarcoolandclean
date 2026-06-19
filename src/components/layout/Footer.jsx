import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';

const footerLinks = {
  Services: [
    { label: 'AC Repair & Installation', href: '/services/ac-repair' },
    { label: 'Appliance Repair', href: '/services/appliance-repair' },
    { label: 'Cleaning Services', href: '/services/cleaning' },
  ],
  'Quick Links': [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ],
};

const socials = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary-900 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10">
        <div className="container-lg py-16 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Link href="/" className="inline-flex">
                <Image
                  src="/logo.png"
                  alt="M Yar Cool and Clean"
                  width={220}
                  height={68}
                  className="h-auto w-auto max-w-[180px] md:max-w-[220px]"
                  priority
                />
              </Link>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/70">
                Professional home maintenance and repair services. Available 24/7 for emergencies across all areas.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3 text-sm text-white/75">
                  <span className="mt-0.5 p-2 text-accent"><FiMapPin size={14} /></span>
                  <span className="leading-6">Islamabad & Rawalpindi, Pakistan</span>
                </div>

                <div className="flex items-start gap-3 text-sm text-white/75">
                  <span className="mt-0.5 p-2 text-accent"><FiMail size={14} /></span>
                  <a href="mailto:myarcoolandclean@gmail.com" className="break-all leading-6 transition-colors hover:text-accent">
                    myarcoolandclean@gmail.com
                  </a>
                </div>

                <div className="flex items-start gap-3 text-sm text-white/75">
                  <span className="mt-0.5 p-2 text-accent"><FiPhone size={14} /></span>
                  <a href="tel:+923056687553" className="leading-6 transition-colors hover:text-accent">
                    +92 305 6687553 <br /> +92 334 7787554
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {Object.entries(footerLinks).map(([title, links]) => (
                  <div key={title}>
                    <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white">{title}</h4>
                    <ul className="space-y-3">
                      {links.map((link) => (
                        <li key={link.label}>
                          <Link href={link.href} className="text-sm text-white/65 transition-colors duration-200 hover:text-accent">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary-900/80 border-t border-white/10">
          <div className="container-lg flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
            <p className="text-xs leading-6 text-white/50">
              &copy; {new Date().getFullYear()} M Yar Cool and Clean. All rights reserved.
            </p>

            <div className="flex items-center justify-center gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/60 transition-all hover:border-accent hover:bg-accent hover:text-primary-900"
                >
                  <Icon size={14} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
