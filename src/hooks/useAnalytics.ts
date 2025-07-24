import { useEffect, useCallback, useRef } from 'react';

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

interface VisitorData {
  sessionId: string;
  userId?: string;
  timestamp: number;
  userAgent: string;
  referrer: string;
  language: string;
  timezone: string;
  screenResolution: string;
  viewportSize: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  location?: {
    country?: string;
    region?: string;
    city?: string;
  };
}

interface PageViewData extends VisitorData {
  page: string;
  title: string;
  loadTime?: number;
}

interface EventData extends VisitorData {
  event: AnalyticsEvent;
}

class AnalyticsService {
  private sessionId: string;
  private startTime: number;
  private lastActivity: number;
  private pageStartTime: number;
  private isFirstVisit: boolean;
  private clickHeatmap: Array<{ x: number; y: number; timestamp: number }> = [];

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.lastActivity = Date.now();
    this.pageStartTime = Date.now();
    this.isFirstVisit = !localStorage.getItem('analytics_visited');
    
    if (this.isFirstVisit) {
      localStorage.setItem('analytics_visited', 'true');
    }

    this.initializeTracking();
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeTracking() {
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackEvent('engagement', 'page_hidden', window.location.pathname);
      } else {
        this.trackEvent('engagement', 'page_visible', window.location.pathname);
        this.lastActivity = Date.now();
      }
    });

    // Track scroll depth
    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        // Track milestone scroll depths
        if ([25, 50, 75, 90].includes(scrollPercent)) {
          this.trackEvent('engagement', 'scroll_depth', `${scrollPercent}%`);
        }
      }
    };

    window.addEventListener('scroll', trackScrollDepth, { passive: true });

    // Track click heatmap
    document.addEventListener('click', (e) => {
      this.clickHeatmap.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      });

      // Limit heatmap data to last 100 clicks
      if (this.clickHeatmap.length > 100) {
        this.clickHeatmap = this.clickHeatmap.slice(-100);
      }

      this.lastActivity = Date.now();
    });

    // Track mouse movement for engagement
    let mouseMoveCount = 0;
    document.addEventListener('mousemove', () => {
      mouseMoveCount++;
      if (mouseMoveCount % 50 === 0) { // Track every 50th movement
        this.lastActivity = Date.now();
      }
    }, { passive: true });

    // Track keyboard activity
    document.addEventListener('keydown', () => {
      this.lastActivity = Date.now();
    });

    // Track page unload
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Date.now() - this.pageStartTime;
      this.trackEvent('engagement', 'page_exit', window.location.pathname, timeOnPage);
      this.sendHeatmapData();
    });

    // Send periodic heartbeat
    setInterval(() => {
      const timeSinceActivity = Date.now() - this.lastActivity;
      if (timeSinceActivity < 30000) { // Active within last 30 seconds
        this.trackEvent('engagement', 'heartbeat', window.location.pathname);
      }
    }, 60000); // Every minute
  }

  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private async getLocationData(): Promise<VisitorData['location']> {
    try {
      // In a real implementation, you'd use a geolocation service
      // For demo purposes, we'll simulate this
      return {
        country: 'US',
        region: 'California',
        city: 'San Francisco'
      };
    } catch (error) {
      console.warn('Could not get location data:', error);
      return undefined;
    }
  }

  private getBaseVisitorData(): Omit<VisitorData, 'timestamp'> {
    return {
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      deviceType: this.getDeviceType(),
    };
  }

  async trackPageView(page: string): Promise<void> {
    this.pageStartTime = Date.now();
    
    const pageViewData: PageViewData = {
      ...this.getBaseVisitorData(),
      timestamp: Date.now(),
      page,
      title: document.title,
      loadTime: performance.now(),
      location: await this.getLocationData(),
    };

    await this.sendData('/api/analytics/pageview', pageViewData);
  }

  async trackEvent(category: string, action: string, label?: string, value?: number): Promise<void> {
    const eventData: EventData = {
      ...this.getBaseVisitorData(),
      timestamp: Date.now(),
      event: { category, action, label, value },
      location: await this.getLocationData(),
    };

    await this.sendData('/api/analytics/event', eventData);
  }

  private async sendHeatmapData(): Promise<void> {
    if (this.clickHeatmap.length === 0) return;

    const heatmapData = {
      sessionId: this.sessionId,
      page: window.location.pathname,
      clicks: this.clickHeatmap,
      timestamp: Date.now(),
    };

    await this.sendData('/api/analytics/heatmap', heatmapData);
    this.clickHeatmap = [];
  }

  private async sendData(endpoint: string, data: any): Promise<void> {
    try {
      // In a real implementation, this would send to your analytics backend
      // For demo purposes, we'll store in localStorage and log to console
      
      const existingData = JSON.parse(localStorage.getItem('analytics_data') || '[]');
      existingData.push({ endpoint, data, timestamp: Date.now() });
      
      // Keep only last 1000 entries
      if (existingData.length > 1000) {
        existingData.splice(0, existingData.length - 1000);
      }
      
      localStorage.setItem('analytics_data', JSON.stringify(existingData));
      
      // Also send to console for debugging
      console.log(`Analytics ${endpoint}:`, data);

      // In production, you would send to your backend:
      /*
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      */
    } catch (error) {
      console.error('Failed to send analytics data:', error);
    }
  }

  // Public method to get analytics summary
  getAnalyticsSummary() {
    const data = JSON.parse(localStorage.getItem('analytics_data') || '[]');
    const pageViews = data.filter((item: any) => item.endpoint === '/api/analytics/pageview');
    const events = data.filter((item: any) => item.endpoint === '/api/analytics/event');
    
    return {
      totalPageViews: pageViews.length,
      totalEvents: events.length,
      sessionDuration: Date.now() - this.startTime,
      isFirstVisit: this.isFirstVisit,
      deviceType: this.getDeviceType(),
      clickHeatmapPoints: this.clickHeatmap.length,
    };
  }
}

// Singleton instance
let analyticsInstance: AnalyticsService | null = null;

export const useAnalytics = () => {
  const instanceRef = useRef<AnalyticsService | null>(null);

  useEffect(() => {
    if (!instanceRef.current && typeof window !== 'undefined') {
      instanceRef.current = new AnalyticsService();
      analyticsInstance = instanceRef.current;
    }
  }, []);

  const trackPageView = useCallback((page: string) => {
    instanceRef.current?.trackPageView(page);
  }, []);

  const trackEvent = useCallback((category: string, action: string, label?: string, value?: number) => {
    instanceRef.current?.trackEvent(category, action, label, value);
  }, []);

  const getAnalyticsSummary = useCallback(() => {
    return instanceRef.current?.getAnalyticsSummary() || null;
  }, []);

  return {
    trackPageView,
    trackEvent,
    getAnalyticsSummary,
  };
};

// Export the analytics instance for use in other parts of the app
export const getAnalyticsInstance = () => analyticsInstance;