// Analytics and SEO integration utilities

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export class AnalyticsSEO {
  private static GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with actual GA4 ID

  // Initialize Google Analytics 4
  static initializeGA4(): void {
    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', this.GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true
    });
  }

  // Track page views with SEO context
  static trackPageView(path: string, title: string): void {
    if (typeof window.gtag === 'function') {
      window.gtag('config', this.GA_MEASUREMENT_ID, {
        page_path: path,
        page_title: title,
        page_location: window.location.href
      });

      // Track custom events for SEO insights
      window.gtag('event', 'page_view', {
        page_title: title,
        page_location: window.location.href,
        page_path: path,
        content_group1: this.getContentGroup(path),
        content_group2: this.getPageType(path)
      });
    }
  }

  // Track user engagement for SEO signals
  static trackEngagement(action: string, details?: any): void {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'engagement', {
        event_category: 'User Engagement',
        event_label: action,
        value: 1,
        ...details
      });
    }
  }

  // Track conversion events that impact SEO rankings
  static trackConversion(type: 'demo_booking' | 'newsletter_signup' | 'contact_form' | 'whatsapp_click', value?: number): void {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        event_category: 'Conversion',
        event_label: type,
        value: value || 1,
        currency: 'INR'
      });

      // Track as a custom conversion for better SEO insights
      window.gtag('event', type, {
        event_category: 'Lead Generation',
        event_label: 'High Intent Action',
        value: value || 1
      });
    }
  }

  // Track Core Web Vitals for SEO
  static trackCoreWebVitals(): void {
    // Track Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      window.gtag('event', 'core_web_vitals', {
        event_category: 'Web Vitals',
        event_label: 'LCP',
        value: Math.round(lastEntry.startTime)
      });
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // Track First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fid = (entry as any).processingStart - (entry as any).startTime;
        window.gtag('event', 'core_web_vitals', {
          event_category: 'Web Vitals', 
          event_label: 'FID',
          value: Math.round(fid)
        });
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });

    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      
      // Send CLS value when page is hidden
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          window.gtag('event', 'core_web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'CLS', 
            value: Math.round(clsValue * 1000)
          });
        }
      });
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  }

  // Get content group for GA4 reporting
  private static getContentGroup(path: string): string {
    if (path === '/') return 'Homepage';
    if (path.startsWith('/about')) return 'About';
    if (path.startsWith('/industries')) return 'Industries';
    if (path.startsWith('/how-it-works')) return 'Process';
    if (path.startsWith('/faq')) return 'Support';
    if (path.startsWith('/contact')) return 'Contact';
    if (path.startsWith('/blog')) return 'Content';
    return 'Other';
  }

  // Get page type for SEO categorization
  private static getPageType(path: string): string {
    if (path === '/') return 'Landing';
    if (path === '/about') return 'About';
    if (path === '/contact') return 'Contact';
    if (path === '/faq') return 'FAQ';
    if (path.includes('privacy') || path.includes('terms') || path.includes('cookies')) return 'Legal';
    return 'Content';
  }

  // Track search queries for SEO insights
  static trackSiteSearch(query: string, results?: number): void {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'search', {
        search_term: query,
        results: results || 0,
        event_category: 'Site Search'
      });
    }
  }

  // Track file downloads
  static trackDownload(fileName: string, fileType: string): void {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'file_download', {
        event_category: 'Downloads',
        event_label: fileName,
        file_extension: fileType,
        file_name: fileName
      });
    }
  }

  // Track external link clicks
  static trackExternalLink(url: string, linkText: string): void {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'click', {
        event_category: 'External Links',
        event_label: url,
        link_text: linkText,
        link_url: url
      });
    }
  }

  // Track scroll depth for engagement metrics
  static initializeScrollTracking(): void {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 90, 100];
    const trackedMilestones = new Set<number>();

    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        milestones.forEach(milestone => {
          if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
            trackedMilestones.add(milestone);
            
            window.gtag('event', 'scroll', {
              event_category: 'Engagement',
              event_label: `${milestone}%`,
              value: milestone
            });
          }
        });
      }
    };

    window.addEventListener('scroll', trackScroll, { passive: true });
  }
}

// Initialize analytics and SEO tracking
export const initializeAnalyticsSEO = (): void => {
  // Only initialize in production
  if (process.env.NODE_ENV === 'production') {
    AnalyticsSEO.initializeGA4();
    AnalyticsSEO.trackCoreWebVitals();
    AnalyticsSEO.initializeScrollTracking();
  }
};