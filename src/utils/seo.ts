import React from "react";

export interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  keywords?: string;
  author?: string;
  robots?: string;
  schema?: any;
}

export class SEOManager {
  private static readonly BASE_URL = 'https://darexai.com';
  private static readonly DEFAULT_IMAGE = `${this.BASE_URL}/image.png`;
  private static readonly SITE_NAME = 'Dare XAI';
  private static readonly DEFAULT_AUTHOR = 'Dare XAI Team';

  static updatePageSEO(seoData: SEOData): void {
    // Update title
    document.title = seoData.title;

    // Update or create meta tags
    this.updateMetaTag('description', seoData.description);
    this.updateMetaTag('keywords', seoData.keywords || '');
    this.updateMetaTag('author', seoData.author || this.DEFAULT_AUTHOR);
    this.updateMetaTag('robots', seoData.robots || 'index, follow');

    // Open Graph tags
    this.updateMetaProperty('og:title', seoData.ogTitle || seoData.title);
    this.updateMetaProperty('og:description', seoData.ogDescription || seoData.description);
    this.updateMetaProperty('og:image', seoData.ogImage || this.DEFAULT_IMAGE);
    this.updateMetaProperty('og:type', seoData.ogType || 'website');
    this.updateMetaProperty('og:site_name', this.SITE_NAME);
    this.updateMetaProperty('og:url', seoData.canonical || window.location.href);

    // Twitter Card tags
    this.updateMetaProperty('twitter:card', seoData.twitterCard || 'summary_large_image');
    this.updateMetaProperty('twitter:site', '@dare_xai');
    this.updateMetaProperty('twitter:creator', '@dare_xai');
    this.updateMetaProperty('twitter:title', seoData.twitterTitle || seoData.title);
    this.updateMetaProperty('twitter:description', seoData.twitterDescription || seoData.description);
    this.updateMetaProperty('twitter:image', seoData.twitterImage || seoData.ogImage || this.DEFAULT_IMAGE);

    // Canonical URL
    this.updateCanonical(seoData.canonical || window.location.href);

    // Structured Data
    if (seoData.schema) {
      this.updateStructuredData(seoData.schema);
    }

    // Update language and direction
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }

  private static updateMetaTag(name: string, content: string): void {
    if (!content) return;
    
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  private static updateMetaProperty(property: string, content: string): void {
    if (!content) return;
    
    let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  private static updateCanonical(url: string): void {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }

  private static updateStructuredData(schema: any): void {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  static getPageSEOData(page: string): SEOData {
    const baseData = {
      author: this.DEFAULT_AUTHOR,
      ogImage: this.DEFAULT_IMAGE,
      twitterCard: 'summary_large_image' as const,
      robots: 'index, follow',
    };

    switch (page) {
      case '/':
        return {
          ...baseData,
          title: 'Dare XAI - AI-Powered Business Automation Platform | Automate Smarter, Scale Faster',
          description: 'Transform your business with Dare XAI\'s enterprise AI automation platform. Automate sales, marketing, and operations with intelligent workflows. Book your free demo today.',
          keywords: 'AI automation, business automation, artificial intelligence, workflow automation, sales automation, marketing automation, enterprise AI, business intelligence, process automation',
          canonical: `${this.BASE_URL}/`,
          ogTitle: 'Dare XAI - Revolutionary AI Business Automation Platform',
          ogDescription: 'Join 500+ enterprises automating their business processes with AI. Increase productivity by 300% and reduce costs by 65%. Start your free trial today.',
          ogType: 'website',
          schema: this.getOrganizationSchema()
        };

      case '/about':
        return {
          ...baseData,
          title: 'About Dare XAI - AI Automation Experts | Our Mission & Team',
          description: 'Learn about Dare XAI\'s mission to transform 10,000 businesses with AI automation. Meet our founders and discover our innovative approach to enterprise AI solutions.',
          keywords: 'about dare xai, AI automation company, enterprise AI solutions, automation experts, AI team, business transformation',
          canonical: `${this.BASE_URL}/about`,
          ogTitle: 'About Dare XAI - Leading AI Automation Company',
          ogDescription: 'Founded by AI experts, Dare XAI helps businesses automate operations and scale faster. Learn about our mission and meet the team.',
          schema: this.getAboutPageSchema()
        };

      case '/industries':
        return {
          ...baseData,
          title: 'AI Automation Solutions by Industry | Dare XAI',
          description: 'Discover how Dare XAI\'s AI automation transforms real estate, healthcare, education, e-commerce, logistics, and financial services. Industry-specific solutions.',
          keywords: 'AI automation by industry, real estate automation, healthcare AI, education technology, e-commerce automation, logistics AI, financial services automation',
          canonical: `${this.BASE_URL}/industries`,
          ogTitle: 'Industry-Specific AI Automation Solutions',
          ogDescription: 'From real estate to healthcare, see how AI automation drives results across industries. Tailored solutions for your sector.',
          schema: this.getIndustriesSchema()
        };

      case '/how-it-works':
        return {
          ...baseData,
          title: 'How AI Automation Works | 3-Step Implementation Process | Dare XAI',
          description: 'Learn how Dare XAI implements AI automation in just 3 steps: Analysis, Development, and Deployment. From concept to results in 5-7 days.',
          keywords: 'how AI automation works, AI implementation process, automation deployment, AI integration, business process automation',
          canonical: `${this.BASE_URL}/how-it-works`,
          ogTitle: 'How AI Automation Works - Simple 3-Step Process',
          ogDescription: 'See how we transform your business processes with AI in just 3 simple steps. Fast implementation, immediate results.',
          schema: this.getHowItWorksSchema()
        };

      case '/faq':
        return {
          ...baseData,
          title: 'AI Automation FAQ | Common Questions Answered | Dare XAI',
          description: 'Get answers to frequently asked questions about AI automation, implementation, pricing, and support. Everything you need to know about Dare XAI.',
          keywords: 'AI automation FAQ, automation questions, AI implementation help, automation support, AI pricing questions',
          canonical: `${this.BASE_URL}/faq`,
          ogTitle: 'AI Automation FAQ - Get Your Questions Answered',
          ogDescription: 'Find answers to common questions about AI automation, implementation, and how Dare XAI can transform your business.',
          schema: this.getFAQSchema()
        };

      case '/contact':
        return {
          ...baseData,
          title: 'Contact Dare XAI | Get Started with AI Automation Today',
          description: 'Ready to transform your business with AI automation? Contact Dare XAI for a free consultation. Book your demo or reach out to our experts.',
          keywords: 'contact dare xai, AI automation consultation, book demo, AI automation experts, business automation contact',
          canonical: `${this.BASE_URL}/contact`,
          ogTitle: 'Contact Dare XAI - Start Your AI Transformation',
          ogDescription: 'Ready to automate your business? Contact our AI experts for a free consultation and see how we can transform your operations.',
          schema: this.getContactSchema()
        };

      case '/privacy':
        return {
          ...baseData,
          title: 'Privacy Policy | Dare XAI Data Protection & Privacy',
          description: 'Read Dare XAI\'s privacy policy to understand how we collect, use, and protect your personal data. GDPR compliant and transparent.',
          keywords: 'privacy policy, data protection, GDPR compliance, user privacy, data security',
          canonical: `${this.BASE_URL}/privacy`,
          robots: 'noindex, follow'
        };

      case '/terms':
        return {
          ...baseData,
          title: 'Terms of Service | Dare XAI Legal Terms & Conditions',
          description: 'Read Dare XAI\'s terms of service governing the use of our AI automation platform and services.',
          keywords: 'terms of service, legal terms, service agreement, terms and conditions',
          canonical: `${this.BASE_URL}/terms`,
          robots: 'noindex, follow'
        };

      case '/cookies':
        return {
          ...baseData,
          title: 'Cookie Policy | Dare XAI Website Cookies Information',
          description: 'Learn about how Dare XAI uses cookies to improve your browsing experience and website functionality.',
          keywords: 'cookie policy, website cookies, user experience, privacy',
          canonical: `${this.BASE_URL}/cookies`,
          robots: 'noindex, follow'
        };

      default:
        return {
          ...baseData,
          title: 'Dare XAI - AI-Powered Business Automation Platform',
          description: 'Transform your business with intelligent AI automation. Automate workflows, boost productivity, and scale faster with Dare XAI.',
          keywords: 'AI automation, business automation, workflow automation, artificial intelligence',
          canonical: `${this.BASE_URL}${page}`
        };
    }
  }

  private static getOrganizationSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Dare XAI",
      "description": "AI-powered business automation platform helping enterprises automate workflows and scale operations",
      "url": this.BASE_URL,
      "logo": `${this.BASE_URL}/image.png`,
      "sameAs": [
        "https://www.linkedin.com/company/dare-xai/",
        "https://x.com/dare_xai",
        "https://github.com/DarexAI-AI-Startup"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9119267828",
        "contactType": "customer service",
        "email": "hello@darexai.com",
        "availableLanguage": ["English", "Hindi"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "foundingDate": "2024",
      "numberOfEmployees": "10-50",
      "industry": "Artificial Intelligence",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI Automation Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Voice Calling Automation",
              "description": "Automated voice calling system for lead follow-up and customer engagement"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "WhatsApp Automation",
              "description": "Intelligent WhatsApp bots for customer support and engagement"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Workflow Automation",
              "description": "End-to-end business process automation solutions"
            }
          }
        ]
      }
    };
  }

  private static getAboutPageSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Dare XAI",
      "description": "Learn about Dare XAI's mission, team, and approach to AI automation",
      "mainEntity": {
        "@type": "Organization",
        "name": "Dare XAI",
        "founder": [
          {
            "@type": "Person",
            "name": "Aditya Kumar",
            "jobTitle": "Co-Founder",
            "sameAs": "https://www.linkedin.com/in/aditya-kumar-learner/"
          },
          {
            "@type": "Person", 
            "name": "Sanu Shaurya",
            "jobTitle": "Co-Founder",
            "sameAs": "https://www.linkedin.com/in/sanu-shaurya-a0194a247/"
          }
        ]
      }
    };
  }

  private static getIndustriesSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "AI Automation Solutions by Industry",
      "description": "Industry-specific AI automation solutions for real estate, healthcare, education, and more",
      "hasPart": [
        {
          "@type": "Service",
          "name": "Real Estate AI Automation", 
          "description": "Voice and WhatsApp bots for property inquiries and site visit bookings",
          "serviceType": "Real Estate Technology"
        },
        {
          "@type": "Service",
          "name": "Healthcare AI Automation",
          "description": "Patient engagement and appointment booking automation",
          "serviceType": "Healthcare Technology"
        },
        {
          "@type": "Service",
          "name": "Education AI Automation",
          "description": "Student inquiry management and demo booking automation", 
          "serviceType": "Education Technology"
        }
      ]
    };
  }

  private static getHowItWorksSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How AI Automation Works - Implementation Process",
      "description": "Learn how Dare XAI implements AI automation in 3 simple steps",
      "totalTime": "P7D",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Business Process Analysis"
        },
        {
          "@type": "HowToSupply", 
          "name": "AI Model Training"
        },
        {
          "@type": "HowToSupply",
          "name": "System Integration"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "name": "Analysis & Planning",
          "text": "We analyze your current processes and identify automation opportunities with maximum ROI potential",
          "url": `${this.BASE_URL}/how-it-works#step-1`
        },
        {
          "@type": "HowToStep",
          "name": "Custom Development", 
          "text": "Our AI engineers build tailored automation solutions that integrate with your existing systems",
          "url": `${this.BASE_URL}/how-it-works#step-2`
        },
        {
          "@type": "HowToStep",
          "name": "Deployment & Optimization",
          "text": "Seamless deployment with continuous monitoring and optimization for peak performance",
          "url": `${this.BASE_URL}/how-it-works#step-3`
        }
      ]
    };
  }

  private static getFAQSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Will this replace my sales/support team?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, it assists and scales your team without hiring more people. Your AI agent handles routine inquiries, lead qualification, and appointment booking, freeing your team to focus on closing deals and handling complex customer needs."
          }
        },
        {
          "@type": "Question",
          "name": "Can it speak in Hindi or regional languages?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we support multilingual voice and WhatsApp bots. Our AI can communicate fluently in Hindi, Tamil, Marathi, Bengali, and English with regional accent support."
          }
        },
        {
          "@type": "Question",
          "name": "What's the setup time?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Usually 5–7 days for full deployment. This includes process analysis, AI training, integration, and go-live support."
          }
        },
        {
          "@type": "Question",
          "name": "Is it affordable for small teams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Our pricing starts at ₹15,000/month, which is less than hiring one part-time employee. Most clients save 3-5x their investment."
          }
        }
      ]
    };
  }

  private static getContactSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Dare XAI",
      "description": "Get in touch with Dare XAI for AI automation consultation and support",
      "mainEntity": {
        "@type": "Organization",
        "name": "Dare XAI",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91-9119267828",
            "contactType": "customer service",
            "email": "hello@darexai.com",
            "availableLanguage": ["English", "Hindi"],
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "09:00",
              "closes": "18:00",
              "timeZone": "Asia/Kolkata"
            }
          }
        ]
      }
    };
  }

  static generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): any {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };
  }

  static generateServiceSchema(serviceName: string, description: string, features: string[]): any {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": serviceName,
      "description": description,
      "provider": {
        "@type": "Organization",
        "name": "Dare XAI",
        "url": this.BASE_URL
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": serviceName,
        "itemListElement": features.map((feature, index) => ({
          "@type": "Offer",
          "position": index + 1,
          "itemOffered": {
            "@type": "Service",
            "name": feature
          }
        }))
      },
      "areaServed": {
        "@type": "Country",
        "name": "India"
      },
      "availableLanguage": ["English", "Hindi", "Tamil", "Marathi", "Bengali"]
    };
  }

  static preloadCriticalResources(): void {
    // Preload critical fonts
    const fontUrls = [
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap'
    ];

    fontUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = url;
      document.head.appendChild(link);
    });

    // Preload critical images
    const criticalImages = [
      '/image.png'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  static addHrefLangTags(): void {
    // Add hreflang for international SEO
    const hreflangs = [
      { lang: 'en', href: this.BASE_URL },
      { lang: 'en-IN', href: this.BASE_URL },
      { lang: 'x-default', href: this.BASE_URL }
    ];

    hreflangs.forEach(({ lang, href }) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = href;
      document.head.appendChild(link);
    });
  }
}

// SEO Hook for React components
export const useSEO = (seoData: SEOData) => {
  React.useEffect(() => {
    SEOManager.updatePageSEO(seoData);
  }, [seoData]);
};

// Generate meta tags for SSR/Static generation
export const generateMetaTags = (seoData: SEOData): string => {
  return `
    <title>${seoData.title}</title>
    <meta name="description" content="${seoData.description}" />
    <meta name="keywords" content="${seoData.keywords || ''}" />
    <meta name="author" content="${seoData.author || 'Dare XAI Team'}" />
    <meta name="robots" content="${seoData.robots || 'index, follow'}" />
    
    <!-- Open Graph -->
    <meta property="og:title" content="${seoData.ogTitle || seoData.title}" />
    <meta property="og:description" content="${seoData.ogDescription || seoData.description}" />
    <meta property="og:image" content="${seoData.ogImage || 'https://darexai.com/image.png'}" />
    <meta property="og:type" content="${seoData.ogType || 'website'}" />
    <meta property="og:site_name" content="Dare XAI" />
    <meta property="og:url" content="${seoData.canonical || ''}" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="${seoData.twitterCard || 'summary_large_image'}" />
    <meta name="twitter:site" content="@dare_xai" />
    <meta name="twitter:creator" content="@dare_xai" />
    <meta name="twitter:title" content="${seoData.twitterTitle || seoData.title}" />
    <meta name="twitter:description" content="${seoData.twitterDescription || seoData.description}" />
    <meta name="twitter:image" content="${seoData.twitterImage || seoData.ogImage || 'https://darexai.com/image.png'}" />
    
    <!-- Canonical -->
    <link rel="canonical" href="${seoData.canonical || ''}" />
  `;
};