/** @type {import('next').NextConfig} */

// Bundle analyzer - optional, enable by running: ANALYZE=true npm run build
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // Enable compression and optimization
  compress: true,
  swcMinify: true,
  
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'myarcoolandclean.com',
      },
      {
        protocol: 'https',
        hostname: '*.myarcoolandclean.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'homefixpro.pk',
      },
      {
        protocol: 'https',
        hostname: 'myarcoolandclean.com',
      },
    ],
    // Optimize image serving
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Enable SWR (stale-while-revalidate) for ISR
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  // Headers for caching strategy
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(js|css|fonts)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      }
    ];
  },

  // Webpack configuration to fix optimization conflicts
  webpack: (config, { isServer }) => {
    // Fix: optimization.usedExports conflicts with cacheUnaffected
    if (config.optimization) {
      config.optimization.usedExports = false;
    }
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
