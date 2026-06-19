import Link from 'next/link';
import { productsApi } from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';
import SkeletonCard from '@/components/ui/SkeletonCard';

// ISR: Revalidate every 1 hour
export const revalidate = 3600;

// Generate static params for all categories at build time
export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/categories`, {
      cache: 'no-store',
    });
    const categories = await response.json();

    if (categories.data && Array.isArray(categories.data)) {
      return categories.data
        .filter((cat) => !cat.parent) // Only parent categories have pages
        .map((category) => ({
          slug: category.slug,
        }));
    }
  } catch (error) {
    console.error('Error generating static params for categories:', error);
  }

  return [];
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = params;
  const categoryName = slug?.replace(/-/g, ' ') || 'Products';

  return {
    title: `${categoryName} | M Yar Cool and Clean`,
    description: `Shop our wide range of ${categoryName} uniforms. Premium quality, custom logo embroidery available.`,
    keywords: [categoryName, 'uniforms', 'UAE', 'branded uniforms'],
    openGraph: {
      title: `${categoryName} | M Yar Cool and Clean`,
      description: `Explore our ${categoryName} services - professional home maintenance across Pakistan`,
      type: 'website',
      url: `https://myarcoolandclean.com/product-category/${slug}`,
    },
    alternates: {
      canonical: `https://myarcoolandclean.com/product-category/${slug}`,
    },
  };
}

// Server component - fetches data at build/revalidation time
async function fetchCategoryData(slug, page = 1) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products?category=${slug}&page=${page}&limit=12`,
      {
        next: { revalidate: 3600 },
      }
    );
    const data = await response.json();
    console.log(`Fetched products for category: ${slug}, page: ${page}, data:`, data);
    
    // Handle different response structures
    if (data.data) {
      if (Array.isArray(data.data)) {
        return { data: data.data, pagination: data.pagination || {} };
      } else if (data.data.data) {
        return { data: data.data.data, pagination: data.data.pagination || {} };
      }
    }
    return { data: [], pagination: {} };
  } catch (error) {
    console.error('Error fetching category products:', error);
    return { data: [], pagination: {} };
  }
}

export default async function ProductCategoryPage({ params, searchParams }) {
  const { slug } = params;
  const page = searchParams.page || '1';
  const result = await fetchCategoryData(slug, page);
  const products = result.data || [];
  const pagination = result.pagination || {};

  const categoryName = slug?.replace(/-/g, ' ') || 'Products';

  // JSON-LD Structured Data for Product Collection
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: categoryName,
    url: `https://myarcoolandclean.com/product-category/${slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://myarcoolandclean.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: categoryName,
          item: `https://myarcoolandclean.com/product-category/${slug}`,
        },
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.slice(0, 12).map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          image: product.image,
          url: `https://myarcoolandclean.com/product/${product.slug}`,
          description: product.description,
          price: product.price?.toFixed(2) || '0',
          priceCurrency: 'PKR',
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-[#F7F5FB] py-16 border-b border-gray-100">
        <div className="container-lg text-center">
          <p className="section-eyebrow justify-center mb-3">Category</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-accent-dark mb-4 capitalize">
            {categoryName}
          </h1>
          <div className="divider-gold mx-auto" />
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="container-lg">
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  {page > 1 && (
                    <Link
                      href={`/product-category/${slug}?page=${parseInt(page) - 1}`}
                      className="btn-outline"
                    >
                      Previous
                    </Link>
                  )}
                  <span className="px-4 py-2 text-sm text-gray-600">
                    Page {page} of {pagination.pages}
                  </span>
                  {page < pagination.pages && (
                    <Link
                      href={`/product-category/${slug}?page=${parseInt(page) + 1}`}
                      className="btn-outline"
                    >
                      Next
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="font-heading text-2xl text-accent-dark mb-4">No products found</h2>
              <Link href="/" className="btn-primary">
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
