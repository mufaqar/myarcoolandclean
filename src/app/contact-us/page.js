import ContactFormClient from './ContactFormClient';

// Static rendering - contact page doesn't change
export const dynamic = 'force-static';
export const revalidate = 604800; // 7 days

export const metadata = {
  title: 'Contact myarcoolandclean — Request Home Maintenance Service',
  description:
    'Get in touch with myarcoolandclean. Contact us for service requests, quotes, and emergency repairs. Email, phone, or contact form available. 24/7 support.',
  keywords: ['contact', 'service request', 'quote', 'phone', 'myarcoolandclean', 'UAE maintenance'],
  alternates: {
    canonical: 'https://myarcoolandclean.com/contact-us',
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  mainEntity: {
    '@type': 'Organization',
    name: 'myarcoolandclean',
    url: 'https://myarcoolandclean.com',
    email: 'myarcoolandclean@gmail.com',
    telephone: '+92 305 6687553',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad & Rawalpindi',
      addressRegion: 'Punjab',
      postalCode: '46000',
      addressCountry: 'Pakistan',
      streetAddress: 'F11/1 street number 3 office number 1',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+92 305 6687553',
      email: 'myarcoolandclean@gmail.com',
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactFormClient />
    </>
  );
}
