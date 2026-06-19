import { generateBreadcrumbSchema } from '@/lib/schemas';
import ProductDetailClient from './ProductDetailClient';

// ISR: Revalidate every 1 hour
export const revalidate = 3600;

// Generate static params for all products at build time
export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products?limit=1000`, {
      cache: 'no-store',
    });
    const data = await response.json();

    if (data.data && Array.isArray(data.data)) {
      return data.data.map((product) => ({
        slug: product.slug,
      }));
    }
  } catch (error) {
    console.error('Error generating static params for products:', error);
  }

  return [];
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = params;
  
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products/${slug}`,
      { next: { revalidate: 3600 } }
    );
    const productData = await response.json();
    const product = productData.data;

    if (!product) {
      return {
        title: 'Service Not Found | myarcoolandclean',
        description: 'The service you are looking for could not be found.',
      };
    }

    const firstImage = product.images?.length > 0 ? (typeof product.images[0] === 'string' ? product.images[0] : product.images[0].url) : null;

    return {
      title: `${product.name} | M Yar Cool and Clean`,
      description: product.description || `Book ${product.name} service - Professional home maintenance solutions.`,
      keywords: [product.name, 'home maintenance', 'Pakistan', product.category?.name || product.category],
      openGraph: {
        title: `${product.name} | M Yar Cool and Clean Professional Services`,
        description: product.description,
        type: 'website',
        url: `https://myarcoolandclean.com/product/${slug}`,
        images: firstImage ? [{ url: firstImage }] : [],
      },
      alternates: {
        canonical: `https://myarcoolandclean.com/product/${slug}`,
      },
      ...(firstImage && {
        preload: [
          {
            href: firstImage,
            as: 'image',
            type: 'image/webp',
          },
        ],
      }),
    };
  } catch (error) {
    console.error('Error generating metadata for product:', error);
    return {
      title: 'Service | M Yar Cool and Clean',
      description: 'Professional home maintenance services from myarcoolandclean',
    };
  }
}

// Server component - fetches data at build/revalidation time
async function fetchProductData(slug) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products/${slug}`,
      { next: { revalidate: 3600 } }
    );
    const data = await response.json();
    console.log(`Fetched product: ${slug}, data:`, data);
    return data.data || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function fetchRelatedProducts(slug) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products/${slug}/related?limit=4`,
      { next: { revalidate: 3600 } }
    );
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export default async function ProductDetailPage({ params }) {
  const { slug } = params;
  const [product, related] = await Promise.all([
    fetchProductData(slug),
    fetchRelatedProducts(slug),
  ]);

  // Breadcrumb schema for navigation clarity
  const breadcrumbSchema = product ? generateBreadcrumbSchema([
    { name: 'Home', url: 'https://myarcoolandclean.com' },
    { name: 'Services', url: 'https://myarcoolandclean.com/product-category' },
    { name: product.category?.name || 'Services', url: `https://myarcoolandclean.com/product-category/${product.category?.slug || 'services'}` },
    { name: product.name, url: `https://myarcoolandclean.com/product/${slug}` },
  ]) : null;

  // JSON-LD Structured Data for Service (AEO optimized)
  const jsonLd = product ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: product.name,
    description: product.description || product.shortDescription,
    url: `https://myarcoolandclean.com/product/${slug}`,
    image: product.images?.map(img => typeof img === 'string' ? img : img.url) || [],
    provider: {
      '@type': 'LocalBusiness',
      name: 'M Yar Cool and Clean',
      url: 'https://myarcoolandclean.com',
      telephone: '+923056687553',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Islamabad & Rawalpindi',
        addressRegion: 'Punjab',
        postalCode: '46000',
        addressCountry: 'PK',
      },
    },
    serviceType: product.category?.name || 'Home Maintenance',
    areaServed: {
      '@type': 'Country',
      name: 'Pakistan',
    },
    availableLanguage: 'en',
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 0,
      },
    }),
  } : null;

  return (
    <>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailClient product={product} related={related} />
    </>
  );
}