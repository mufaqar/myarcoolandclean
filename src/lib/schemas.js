/**
 * Structured Data / JSON-LD Schemas for SEO & AEO
 * Used to generate schema.org compliant data for search engines and AI models
 */

export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateProductSchema(product, baseUrl = 'https://myarcoolandclean.com') {
  const imageUrl = typeof product.images?.[0] === 'string' 
    ? product.images[0] 
    : product.images?.[0]?.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: product.name,
    description: product.description || product.shortDescription,
    image: imageUrl,
    url: `${baseUrl}/product/${product.slug}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'M Yar Cool and Clean',
      url: baseUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Pakistan',
    },
    serviceType: product.category?.name || 'Home Maintenance',
    aggregateRating: product.rating && {
      '@type': 'AggregateRating',
      ratingValue: product.rating.average,
      reviewCount: product.rating.count,
    },
  };
}

export function generateCategorySchema(category, baseUrl = 'https://myarcoolandclean.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: `${baseUrl}/product-category/${category.slug}`,
    mainEntity: {
      '@type': 'Collection',
      name: category.name,
      description: category.description,
    },
    publisher: {
      '@type': 'Organization',
      name: 'M Yar Cool and Clean',
      url: baseUrl,
    },
  };
}

export function generateLocalBusinessSchema(business = {}) {
  const defaults = {
    name: 'M Yar Cool and Clean',
    telephone: '+923056687553',
    email: 'contact@myarcoolandclean.com',
    url: 'https://myarcoolandclean.com',
    streetAddress: 'Service Address',
    addressLocality: 'Islamabad & Rawalpindi',
    addressRegion: 'Punjab',
    postalCode: '46000',
  };

  const config = { ...defaults, ...business };

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: config.name,
    url: config.url,
    telephone: config.telephone,
    email: config.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.streetAddress,
      addressLocality: config.addressLocality,
      addressRegion: config.addressRegion,
      postalCode: config.postalCode,
      addressCountry: 'PK',
    },
    sameAs: [
      'https://www.facebook.com/myarcoolandclean',
      'https://www.instagram.com/myarcoolandclean',
    ],
    image: 'https://myarcoolandclean.com/og-image.jpg',
  };
}

export function generateContactPageSchema(baseUrl = 'https://myarcoolandclean.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: `${baseUrl}/contact-us`,
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'M Yar Cool and Clean',
      telephone: '+923056687553',
      email: 'contact@myarcoolandclean.com',
      url: baseUrl,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'PK',
        addressLocality: 'Islamabad & Rawalpindi',
      },
    },
  };
}

// AEO-specific: FAQ content that answers direct questions
export function generateServiceFAQSchema(serviceType = 'General') {
  const faqByService = {
    'AC Repair': [
      {
        question: 'What is the typical cost of AC repair in Pakistan?',
        answer: 'AC repair costs vary from PKR 2,000-15,000 depending on the issue. Simple gas refills cost PKR 2,000-4,000, while compressor repairs can cost PKR 8,000-20,000. Get a free quote from M Yar Cool and Clean.',
      },
      {
        question: 'How often should I service my AC unit?',
        answer: 'AC units should be serviced every 3-6 months for optimal performance. Heavy-use seasons may require more frequent maintenance. Professional servicing includes cleaning, gas refill, and component inspection.',
      },
      {
        question: 'Do you provide emergency AC repair?',
        answer: 'Yes, M Yar Cool and Clean offers 24/7 emergency AC repair service with typically 1-2 hour response time in Islamabad and Rawalpindi.',
      },
    ],
    'Washing Machine': [
      {
        question: 'What are common washing machine problems?',
        answer: 'Common issues include water leaks, not draining properly, drum not spinning, and making unusual noises. M Yar Cool and Clean provides diagnosis and repair for all major brands.',
      },
      {
        question: 'How much does washing machine repair cost?',
        answer: 'Repair costs range from PKR 2,000-8,000 depending on the fault. Simple fixes like filter cleaning cost less, while motor or bearing replacement costs more.',
      },
    ],
    'Refrigerator': [
      {
        question: 'Why is my refrigerator not cooling?',
        answer: 'Common causes include gas leak, compressor failure, or clogged pipes. Professional inspection by M Yar Cool and Clean can identify the exact issue.',
      },
      {
        question: 'How long do refrigerators typically last?',
        answer: 'Modern refrigerators last 10-15 years with proper maintenance. Regular servicing and professional repairs extend their lifespan.',
      },
    ],
  };

  const faqList = faqByService[serviceType] || faqByService['General'] || [];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// For answer engines - clear, structured content
export function generateAEOAnswerSchema(topic, answer, source = 'https://myarcoolandclean.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Answer',
    text: answer,
    url: source,
    author: {
      '@type': 'Organization',
      name: 'M Yar Cool and Clean',
    },
    datePublished: new Date().toISOString(),
  };
}

export function generateAggregateRatingSchema(ratingValue = 4.8, reviewCount = 200, bestRating = 5) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue,
    reviewCount,
    bestRating,
    worstRating: 1,
  };
}

/**
 * Merge multiple schemas for composite pages
 */
export function mergeSchemas(...schemas) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas.map(schema => 
      schema['@context'] ? { ...schema } : schema
    ),
  };
}
