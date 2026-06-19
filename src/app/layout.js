import { Playfair_Display, DM_Sans } from 'next/font/google';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import Providers from '@/components/Providers';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CartDrawer from '@/components/ui/CartDrawer';
import CallButton from '@/components/ui/CallButton';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

export const metadata = {
  title: {
    default: 'Home Maintenance & AC Repair Services Pakistan',
    template: '%s | M Yar Cool and Clean',
  },
  description:
    'Professional home maintenance & AC repair in Pakistan. Same-day service, expert technicians, 24/7 emergency support.',
  keywords: ['home maintenance', 'AC repair', 'appliance repair', 'washing machine repair', 'fridge repair', 'carpet cleaning', 'home services'],
  authors: [{ name: 'myarcoolandclean' }],
  creator: 'myarcoolandclean',
  publisher: 'myarcoolandclean',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    title: 'M Yar Cool and Clean — Keep Your Home Running Smoothly',
    description: 'Professional home maintenance and appliance repair services. AC repair, washing machine service, fridge repair, carpet cleaning across Pakistan.',
    url: 'https://myarcoolandclean.com',
    siteName: 'M Yar Cool and Clean',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: 'https://myarcoolandclean.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'M Yar Cool and Clean - Professional Home Maintenance Pakistan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M Yar Cool and Clean — Professional Home Maintenance Pakistan',
    description: 'Expert home maintenance and appliance repair services',
    creator: '@myarcoolandclean',
    images: ['https://myarcoolandclean.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://myarcoolandclean.com',
  },
  verification: {
    google: '', // Add your Google verification code
  },
  metadataBase: new URL('https://myarcoolandclean.com'),
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }) {
  // JSON-LD Structured Data for SEO & AEO
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://myarcoolandclean.com',
    name: 'M Yar Cool and Clean',
    alternateName: 'My Ar Cool and Clean',
    description: 'Professional home maintenance and appliance repair services in Pakistan',
    url: 'https://myarcoolandclean.com',
    telephone: '+923056687553',
    email: 'contact@myarcoolandclean.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Service Address',
      addressLocality: 'Islamabad & Rawalpindi',
      addressRegion: 'Punjab',
      postalCode: '46000',
      addressCountry: 'PK',
    },
    sameAs: [
      'https://www.facebook.com/myarcoolandclean',
      'https://www.instagram.com/myarcoolandclean',
      'https://www.youtube.com/myarcoolandclean',
      'https://www.tiktok.com/@myarcoolandclean',
    ],
    priceRange: 'PKR 1000-50000',
    areaServed: {
      '@type': 'Country',
      name: 'Pakistan',
    },
    knowsAbout: ['AC Repair', 'Washing Machine Repair', 'Refrigerator Repair', 'Carpet Cleaning', 'Home Maintenance', 'Appliance Repair', 'AC Installation', 'Emergency Repair'],
    image: 'https://myarcoolandclean.com/og-image.jpg',
    logo: {
      '@type': 'ImageObject',
      url: 'https://myarcoolandclean.com/logo.png',
      width: 250,
      height: 60,
    },
  };

  // Service schemas for AEO - clear definitions
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@graph': [
      {
        '@type': 'Service',
        name: 'AC Repair & Maintenance',
        description: 'Professional air conditioning unit repair, maintenance, and gas refill services',
        provider: { '@type': 'LocalBusiness', name: 'M Yar Cool and Clean' },
        areaServed: 'PK',
        serviceType: 'Air Conditioning Repair',
      },
      {
        '@type': 'Service',
        name: 'Washing Machine Repair',
        description: 'Expert washing machine repair and maintenance for all brands',
        provider: { '@type': 'LocalBusiness', name: 'M Yar Cool and Clean' },
        areaServed: 'PK',
        serviceType: 'Appliance Repair',
      },
      {
        '@type': 'Service',
        name: 'Refrigerator Repair',
        description: 'Professional refrigerator and freezer repair and servicing',
        provider: { '@type': 'LocalBusiness', name: 'M Yar Cool and Clean' },
        areaServed: 'PK',
        serviceType: 'Appliance Repair',
      },
      {
        '@type': 'Service',
        name: 'Carpet & Upholstery Cleaning',
        description: 'Deep carpet cleaning and upholstery care services',
        provider: { '@type': 'LocalBusiness', name: 'M Yar Cool and Clean' },
        areaServed: 'PK',
        serviceType: 'Cleaning Service',
      },
    ],
  };

  // FAQ Schema for AEO - direct answers
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the response time for emergency AC repair?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We provide 24/7 emergency AC repair service with typically 1-2 hour response time in Islamabad and Rawalpindi.',
        },
      },
      {
        '@type': 'Question',
        name: 'How often should I service my air conditioner?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For optimal performance, air conditioners should be serviced every 3-6 months. During heavy use seasons, more frequent maintenance may be needed.',
        },
      },
      {
        '@type': 'Question',
        name: 'What brands of appliances do you service?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We service all major brands including Haier, Daikin, Gree, Dawlance, Orient, Siemens, Electrolux, LG, Samsung, and many others.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide warranty on repairs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we provide warranty on all repair work. Labor warranty typically covers 30 days, and parts warranty varies by component.',
        },
      },
      {
        '@type': 'Question',
        name: 'What payment methods do you accept?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We accept cash, bank transfers, credit/debit cards, and online payment methods for your convenience.',
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        {/* Structured Data for SEO & AEO */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* Google Analytics - replace GA_ID with your tracking ID */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=GA_ID`}
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_ID');
            `,
          }}
        />

        {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="PWdOzKXWGwKtvOOsxm+I2w"
          async
        />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <Providers>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                fontFamily: 'var(--font-dm-sans)',
                borderRadius: '0',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#4a5f7f', secondary: '#fff' } },
            }}
          />
          <TopBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <CallButton />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
