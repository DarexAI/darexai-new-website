import React from 'react';
import { useLocation } from 'react-router-dom';
import { SEOManager, SEOData } from '../utils/seo';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  noIndex?: boolean;
  schema?: any;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image,
  noIndex = false,
  schema
}) => {
  const location = useLocation();

  React.useEffect(() => {
    // Get default SEO data for current page
    const defaultSEOData = SEOManager.getPageSEOData(location.pathname);
    
    // Override with custom props if provided
    const seoData: SEOData = {
      ...defaultSEOData,
      ...(title && { title }),
      ...(description && { description }),
      ...(keywords && { keywords }),
      ...(image && { ogImage: image, twitterImage: image }),
      ...(noIndex && { robots: 'noindex, follow' }),
      ...(schema && { schema })
    };

    // Update page SEO
    SEOManager.updatePageSEO(seoData);

    // Add hreflang tags
    SEOManager.addHrefLangTags();
    
    // Preload critical resources
    SEOManager.preloadCriticalResources();
  }, [location.pathname, title, description, keywords, image, noIndex, schema]);

  return null;
};

export default SEOHead;