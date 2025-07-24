// Sitemap generation utility for dynamic content

export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export class SitemapGenerator {
  private static readonly BASE_URL = 'https://darexai.com';

  static generateSitemap(additionalUrls: SitemapEntry[] = []): string {
    const staticPages: SitemapEntry[] = [
      {
        url: '/',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 1.0
      },
      {
        url: '/about',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.9
      },
      {
        url: '/industries',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.85
      },
      {
        url: '/how-it-works',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.85
      },
      {
        url: '/faq',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.75
      },
      {
        url: '/contact',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.8
      }
    ];

    const allUrls = [...staticPages, ...additionalUrls];

    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const urlsetClose = '</urlset>';

    const urlEntries = allUrls.map(entry => {
      return `
  <url>
    <loc>${this.BASE_URL}${entry.url}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority ? `<priority>${entry.priority.toFixed(2)}</priority>` : ''}
  </url>`;
    }).join('');

    return `${xmlHeader}\n${urlsetOpen}${urlEntries}\n${urlsetClose}`;
  }

  static generateRobotsTxt(additionalRules: string[] = []): string {
    const baseRules = [
      'User-agent: *',
      'Allow: /',
      '',
      '# Important pages',
      'Allow: /about',
      'Allow: /industries', 
      'Allow: /how-it-works',
      'Allow: /faq',
      'Allow: /contact',
      '',
      '# Disallow admin/private areas',
      'Disallow: /admin',
      'Disallow: /api',
      'Disallow: /private',
      '',
      '# Sitemap location',
      `Sitemap: ${this.BASE_URL}/sitemap.xml`,
      '',
      '# Crawl delay for respectful crawling',
      'Crawl-delay: 1'
    ];

    return [...baseRules, ...additionalRules].join('\n');
  }

  // Generate hreflang sitemap for international SEO
  static generateHreflangSitemap(): string {
    const hreflangs = [
      { lang: 'en', region: '', url: '' },
      { lang: 'en', region: 'IN', url: '' },
      { lang: 'x-default', region: '', url: '' }
    ];

    const pages = ['/', '/about', '/industries', '/how-it-works', '/faq', '/contact'];

    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
    const urlsetClose = '</urlset>';

    const urlEntries = pages.map(page => {
      const hreflangTags = hreflangs.map(hreflang => {
        const hreflangCode = hreflang.region ? `${hreflang.lang}-${hreflang.region}` : hreflang.lang;
        return `    <xhtml:link rel="alternate" hreflang="${hreflangCode}" href="${this.BASE_URL}${page}" />`;
      }).join('\n');

      return `
  <url>
    <loc>${this.BASE_URL}${page}</loc>
${hreflangTags}
  </url>`;
    }).join('');

    return `${xmlHeader}\n${urlsetOpen}${urlEntries}\n${urlsetClose}`;
  }
}