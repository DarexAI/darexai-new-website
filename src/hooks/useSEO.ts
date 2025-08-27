import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOManager, SEOData } from '../utils/seo';

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const gtag = typeof window !== 'undefined' ? window.gtag : undefined;

export const useSEO = (customSEOData?: Partial<SEOData>) => {
  const location = useLocation();

  useEffect(() => {
    // Get default SEO data for the current page
    const defaultSEOData = SEOManager.getPageSEOData(location.pathname);
    
    // Merge with custom data if provided
    const finalSEOData: SEOData = {
      ...defaultSEOData,
      ...customSEOData
    };

    // Update page SEO
    SEOManager.updatePageSEO(finalSEOData);

    // Scroll to top on route change for better UX
    window.scrollTo(0, 0);

    // Track page view for analytics
    if (gtag) {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: finalSEOData.title,
        page_location: window.location.href
      });
    }
  }, [location.pathname, customSEOData]);

  // Return utility functions
  return {
    updateSEO: (newSEOData: Partial<SEOData>) => {
      const defaultSEOData = SEOManager.getPageSEOData(location.pathname);
      const mergedData = { ...defaultSEOData, ...customSEOData, ...newSEOData };
      SEOManager.updatePageSEO(mergedData);
    },
    
    setPageTitle: (title: string) => {
      document.title = title;
    },
    
    addStructuredData: (schema: Record<string, unknown>) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  };
};

// Hook for breadcrumb navigation
export const useBreadcrumbs = (breadcrumbs: Array<{ name: string; href: string }>) => {
  useEffect(() => {
    const breadcrumbSchema = SEOManager.generateBreadcrumbSchema(
      breadcrumbs.map(crumb => ({
        name: crumb.name,
        url: `https://darexai.com${crumb.href}`
      }))
    );

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'breadcrumb-schema';
    script.textContent = JSON.stringify(breadcrumbSchema);
    
    // Remove existing breadcrumb schema
    const existing = document.getElementById('breadcrumb-schema');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const script = document.getElementById('breadcrumb-schema');
      if (script) {
        script.remove();
      }
    };
  }, [breadcrumbs]);
};

// Hook for service pages
export const useServiceSEO = (serviceName: string, description: string, features: string[]) => {
  useEffect(() => {
    const serviceSchema = SEOManager.generateServiceSchema(serviceName, description, features);
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'service-schema';
    script.textContent = JSON.stringify(serviceSchema);
    
    // Remove existing service schema
    const existing = document.getElementById('service-schema');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const script = document.getElementById('service-schema');
      if (script) {
        script.remove();
      }
    };
  }, [serviceName, description, features]);
};