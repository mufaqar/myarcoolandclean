// Dynamically generate robots.txt for search engine crawlers, ads, & AI (AEO)
export default function robots() {
  return {
    rules: [
      // Allow all major search engines & ad networks
      {
        userAgent: ['Googlebot', 'Googlebot-Image', 'Googlebot-Video', 'Bingbot', 'Slurp', 'DuckDuckBot'],
        allow: ['/', '/product', '/product-category', '/about-us', '/contact-us'],
        disallow: ['/admin', '/api', '/_next', '/static', '/admin-api'],
        crawlDelay: 1,
      },
      // Ad network crawlers - allow to crawl public pages for ads
      {
        userAgent: ['Mediapartners-Google', 'AdsBot-Google', 'Bingbot-Media'],
        allow: '/',
        crawlDelay: 0.5,
      },
      // Analytics & monitoring bots
      {
        userAgent: ['MJ12bot', 'AhrefsBot', 'SemrushBot', 'DotBot'],
        allow: ['/', '/product', '/product-category'],
        crawlDelay: 2,
      },
      // AI Search Engines with Attribution (AEO - Answer Engine Optimization)
      // These crawlers cite sources properly
      {
        userAgent: ['PerplexityBot', 'Perplexity', 'YouBot', 'Qwant', 'facebookexternalhit'],
        allow: ['/', '/product', '/product-category', '/about-us', '/contact-us'],
        disallow: ['/admin', '/api', '/_next', '/static'],
        crawlDelay: 1,
      },
      // OpenAI's SearchGPT and related crawlers
      {
        userAgent: ['OpenAI-SearchBot', 'OpenAI', 'GPTBot'],
        allow: ['/', '/product', '/product-category', '/about-us'],
        crawlDelay: 1,
      },
      // Other attribution-respecting AI crawlers
      {
        userAgent: ['Applebot', 'Applebot-Extended', 'CCBot'],
        allow: ['/', '/product', '/product-category', '/about-us', '/contact-us'],
        crawlDelay: 1,
      },
      // Block non-attributed AI/scraping bots
      {
        userAgent: ['ChatGPT-User', 'anthropic-ai', 'Claude-Web', 'ClaudeBot'],
        disallow: '/',
      },
      // Default rule for others
      {
        userAgent: '*',
        allow: ['/', '/product', '/product-category', '/about-us', '/contact-us'],
        disallow: ['/admin', '/api', '/_next', '/static', '/admin-api', '/auth'],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://myarcoolandclean.com/sitemap.xml',
    host: 'https://myarcoolandclean.com',
  };
}
