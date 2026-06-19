'use client';
import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';

const socials = [
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
];

export default function TopBar() {
  return (
    <div className="flex bg-primary-900 text-center text-white text-xs py-2.5 px-4">
      <div className="container-lg flex flex-wrap items-center justify-center sm:justify-between sm:gap-8">
        <p className="font-body tracking-wide text-white/80">
          <span className="text-accent font-semibold">•</span>{' '}
          24/7 Emergency Support · Fast Same-Day Service
        </p>
        <div className="flex items-center gap-5">
          {socials.map(({ icon: Icon, href, label }) => (
            <Link key={label} href={href} aria-label={label} className="text-white/60 hover:text-accent transition-colors duration-200">
              <Icon size={13} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
