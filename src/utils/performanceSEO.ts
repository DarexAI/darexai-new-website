// Performance optimization utilities for better Core Web Vitals and SEO

export class PerformanceSEO {
  // Lazy load images with intersection observer
  static initializeLazyLoading(): void {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      });

      // Observe all lazy images
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Preload critical resources
  static preloadCriticalResources(): void {
    const criticalResources = [
      { href: '/image.png', as: 'image' },
      { href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap', as: 'style' },
      { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap', as: 'style' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.as === 'style') {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });
  }

  // Add DNS prefetch for external domains
  static addDNSPrefetch(): void {
    const domains = [
      '//fonts.googleapis.com',
      '//fonts.gstatic.com',
      '//images.pexels.com',
      '//www.google-analytics.com'
    ];

    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  }

  // Optimize images with responsive loading
  static createResponsiveImage(src: string, alt: string, className?: string): string {
    return `
      <img 
        src="${src}?auto=compress&cs=tinysrgb&w=400&fit=crop" 
        srcset="
          ${src}?auto=compress&cs=tinysrgb&w=400&fit=crop 400w,
          ${src}?auto=compress&cs=tinysrgb&w=800&fit=crop 800w,
          ${src}?auto=compress&cs=tinysrgb&w=1200&fit=crop 1200w
        "
        sizes="(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px"
        alt="${alt}"
        loading="lazy"
        decoding="async"
        class="${className || ''}"
      />
    `;
  }

  // Monitor Core Web Vitals
  static initializeCoreWebVitals(): void {
    // Track CLS (Cumulative Layout Shift)
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
          clsEntries.push(entry);
        }
      }
    });

    observer.observe({ type: 'layout-shift', buffered: true });

    // Track FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('FID:', (entry as any).processingStart - (entry as any).startTime);
      }
    });

    fidObserver.observe({ type: 'first-input', buffered: true });

    // Track LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });

    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  }

  // Optimize font loading
  static optimizeFontLoading(): void {
    // Add font-display: swap to existing font links
    const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    fontLinks.forEach(link => {
      const url = new URL((link as HTMLLinkElement).href);
      url.searchParams.set('display', 'swap');
      (link as HTMLLinkElement).href = url.toString();
    });
  }

  // Add critical CSS inline for above-the-fold content
  static addCriticalCSS(): void {
    const criticalCSS = `
      .hero-section { padding-top: 5rem; }
      @media (min-width: 768px) { .hero-section { padding-top: 6rem; } }
      .glass { background: rgba(15, 20, 25, 0.3); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.08); }
      .glass-card { background: rgba(15, 20, 25, 0.3); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; }
      .text-gradient { background: linear-gradient(135deg, #2563EB 0%, #7C3AED 50%, #0D9488 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .bg-gradient-primary { background: linear-gradient(135deg, #2563EB 0%, #4F46E5 100%); }
    `;

    const style = document.createElement('style');
    style.innerHTML = criticalCSS;
    document.head.appendChild(style);
  }

  // Service Worker registration for caching
  static registerServiceWorker(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered:', registration);
        })
        .catch(error => {
          console.log('SW registration failed:', error);
        });
    }
  }
}

// Initialize performance optimizations
export const initializePerformanceOptimizations = (): void => {
  // Run after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      PerformanceSEO.addDNSPrefetch();
      PerformanceSEO.optimizeFontLoading();
      PerformanceSEO.initializeLazyLoading();
      PerformanceSEO.initializeCoreWebVitals();
    });
  } else {
    PerformanceSEO.addDNSPrefetch();
    PerformanceSEO.optimizeFontLoading();
    PerformanceSEO.initializeLazyLoading();
    PerformanceSEO.initializeCoreWebVitals();
  }
};