import { DM_Sans } from 'next/font/google';
import './globals.css';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CallButton from '@/components/ui/CallButton';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

export const metadata = {
  title: {
    default: 'M Yar Cool and Clean - Home Maintenance & Repair Services',
    template: '%s | M Yar Cool and Clean',
  },
  description:
    'Professional home maintenance and repair services in Pakistan. AC repair, appliance repair, and cleaning services. Same-day service, expert technicians.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <CallButton />
      </body>
    </html>
  );
}
