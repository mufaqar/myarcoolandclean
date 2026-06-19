// Dynamically generate sitemap.xml for SEO
export default async function sitemap() {
  const baseUrl = 'https://myarcoolandclean.com';
  const now = new Date();

  // Static pages with proper priority
  const staticPages = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/product-category`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // SEO-friendly utility pages
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Fetch dynamic categories with proper error handling
  let categoryPages = [];
  try {
    const categoriesUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/categories?limit=500`;
    const response = await fetch(categoriesUrl, {
      next: { revalidate: 3600 }, // Revalidate every hour for SEO freshness
    });
    
    if (response.ok) {
      const categories = await response.json();
      if (categories.data && Array.isArray(categories.data)) {
        categoryPages = categories.data.map((category) => ({
          url: `${baseUrl}/product-category/${category.slug}`,
          lastModified: new Date(category.updatedAt || Date.now()),
          changeFrequency: 'weekly',
          priority: 0.75, // Categories are important for navigation
        }));
      }
    }
  } catch (error) {
    console.error('[Sitemap] Error fetching categories:', error.message);
  }

  // Fetch dynamic products with pagination support
  let productPages = [];
  try {
    let allProducts = [];
    let page = 1;
    let hasMore = true;

    // Fetch all products with pagination
    while (hasMore) {
      const productsUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/products?page=${page}&limit=100`;
      const response = await fetch(productsUrl, {
        next: { revalidate: 3600 },
      });

      if (response.ok) {
        const products = await response.json();
        if (products.data && Array.isArray(products.data)) {
          allProducts = [...allProducts, ...products.data];
          hasMore = products.data.length === 100;
          page++;
        } else {
          hasMore = false;
        }
      } else {
        hasMore = false;
      }
    }

    // Map products with prioritization for featured items
    productPages = allProducts.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(product.updatedAt || Date.now()),
      changeFrequency: 'bi-weekly',
      priority: product.isFeatured ? 0.8 : product.isNewArrival ? 0.7 : 0.6,
    }));
  } catch (error) {
    console.error('[Sitemap] Error fetching products:', error.message);
  }

  const allPages = [...staticPages, ...categoryPages, ...productPages];
  
  // Log sitemap stats for monitoring
  console.log(`[Sitemap] Generated with ${allPages.length} URLs (${categoryPages.length} categories, ${productPages.length} products)`);

  return allPages;
}
