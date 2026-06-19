// Dynamic imports for code splitting
// These components are only loaded when needed, reducing initial bundle size

import dynamic from 'next/dynamic';
import React from 'react';

// Skeleton/Loader component for fallback
const Loader = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
);

// Home page components - lazy load heavy animation/graphics components
export const DynamicHeroSection = dynamic(() => import('./home/HeroSection'), {
  loading: () => <Loader />,
  ssr: true,
});

export const DynamicFeaturedBanners = dynamic(
  () => import('./home/FeaturedBanners'),
  {
    loading: () => <Loader />,
    ssr: true,
  }
);

export const DynamicBrandSlider = dynamic(
  () => import('./home/BrandSlider'),
  {
    loading: () => <Loader />,
    ssr: true,
  }
);

export const DynamicWhyChooseUs = dynamic(
  () => import('./home/WhyChooseUs'),
  {
    loading: () => <Loader />,
    ssr: true,
  }
);

// Admin components - lazy load heavy admin panels
export const DynamicAdminSidebar = dynamic(
  () => import('./admin/AdminSidebar'),
  {
    loading: () => <Loader />,
    ssr: false,
  }
);

export const DynamicAdminProtected = dynamic(
  () => import('./admin/AdminProtected'),
  {
    loading: () => <Loader />,
    ssr: false,
  }
);

// Product components - lazy load gallery and forms
export const DynamicProductGallery = dynamic(
  () => import('./product/ProductGallery'),
  {
    loading: () => <Loader />,
    ssr: true,
  }
);

export const DynamicReviewForm = dynamic(
  () => import('./product/ReviewForm'),
  {
    loading: () => <Loader />,
    ssr: true,
  }
);

// UI components - lazy load heavy modals/drawers
export const DynamicQuoteModal = dynamic(
  () => import('./ui/QuoteModal'),
  {
    loading: () => <Loader />,
    ssr: false,
  }
);

export const DynamicCartDrawer = dynamic(
  () => import('./ui/CartDrawer'),
  {
    loading: () => <Loader />,
    ssr: false,
  }
);
