import HeroSection from '@/components/home/HeroSection';
import FeaturedBanners from '@/components/home/FeaturedBanners';
import AboutSection from '@/components/home/AboutSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import LatestProducts from '@/components/home/LatestProducts';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import BrandSlider from '@/components/home/BrandSlider';

export const metadata = {
  title: 'Home Maintenance & AC Repair Services Pakistan',
  description:
    'M Yar Cool & Clean provides professional home maintenance and AC repair services across Pakistan. Expert technicians, same-day service, 24/7 emergency support.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedBanners />
      <AboutSection />
      <CategoriesSection />
      <LatestProducts />
      <WhyChooseUs />
      <BrandSlider />
    </>
  );
}
