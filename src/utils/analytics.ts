// Analytics utility functions for data processing and reporting

export interface AnalyticsReport {
  period: string;
  uniqueVisitors: number;
  pageViews: number;
  sessions: number;
  avgSessionDuration: number;
  bounceRate: number;
  conversionRate: number;
  topPages: Array<{ page: string; views: number }>;
  trafficSources: Array<{ source: string; percentage: number }>;
  deviceBreakdown: Array<{ device: string; percentage: number }>;
  userFlow: Array<{ from: string; to: string; count: number }>;
}

export class AnalyticsProcessor {
  static generateReport(rawData: any[], period: string): AnalyticsReport {
    const pageViews = rawData.filter(item => item.endpoint === '/api/analytics/pageview');
    const events = rawData.filter(item => item.endpoint === '/api/analytics/event');
    
    // Calculate unique visitors
    const uniqueVisitors = new Set(pageViews.map(pv => pv.data.sessionId)).size;
    
    // Calculate sessions (group by sessionId and time gaps)
    const sessions = this.calculateSessions(pageViews);
    
    // Calculate average session duration
    const avgSessionDuration = this.calculateAvgSessionDuration(pageViews);
    
    // Calculate bounce rate
    const bounceRate = this.calculateBounceRate(pageViews);
    
    // Calculate conversion rate
    const conversionRate = this.calculateConversionRate(events, uniqueVisitors);
    
    // Get top pages
    const topPages = this.getTopPages(pageViews);
    
    // Get traffic sources
    const trafficSources = this.getTrafficSources(pageViews);
    
    // Get device breakdown
    const deviceBreakdown = this.getDeviceBreakdown(pageViews);
    
    // Get user flow
    const userFlow = this.getUserFlow(pageViews);
    
    return {
      period,
      uniqueVisitors,
      pageViews: pageViews.length,
      sessions: sessions.length,
      avgSessionDuration,
      bounceRate,
      conversionRate,
      topPages,
      trafficSources,
      deviceBreakdown,
      userFlow,
    };
  }

  private static calculateSessions(pageViews: any[]): any[] {
    const sessionMap = new Map();
    
    pageViews.forEach(pv => {
      const sessionId = pv.data.sessionId;
      if (!sessionMap.has(sessionId)) {
        sessionMap.set(sessionId, []);
      }
      sessionMap.get(sessionId).push(pv);
    });
    
    return Array.from(sessionMap.values());
  }

  private static calculateAvgSessionDuration(pageViews: any[]): number {
    const sessions = this.calculateSessions(pageViews);
    let totalDuration = 0;
    let validSessions = 0;
    
    sessions.forEach(session => {
      if (session.length > 1) {
        const sortedViews = session.sort((a: any, b: any) => a.data.timestamp - b.data.timestamp);
        const duration = sortedViews[sortedViews.length - 1].data.timestamp - sortedViews[0].data.timestamp;
        totalDuration += duration;
        validSessions++;
      }
    });
    
    return validSessions > 0 ? Math.round(totalDuration / validSessions / 1000) : 0;
  }

  private static calculateBounceRate(pageViews: any[]): number {
    const sessions = this.calculateSessions(pageViews);
    const bouncedSessions = sessions.filter(session => session.length === 1).length;
    return sessions.length > 0 ? Math.round((bouncedSessions / sessions.length) * 100 * 10) / 10 : 0;
  }

  private static calculateConversionRate(events: any[], uniqueVisitors: number): number {
    const conversionEvents = events.filter(event => 
      event.data.event.category === 'conversion' || 
      event.data.event.action.includes('demo') ||
      event.data.event.action.includes('signup')
    );
    
    return uniqueVisitors > 0 ? Math.round((conversionEvents.length / uniqueVisitors) * 100 * 10) / 10 : 0;
  }

  private static getTopPages(pageViews: any[]): Array<{ page: string; views: number }> {
    const pageCount = new Map();
    
    pageViews.forEach(pv => {
      const page = pv.data.page;
      pageCount.set(page, (pageCount.get(page) || 0) + 1);
    });
    
    return Array.from(pageCount.entries())
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);
  }

  private static getTrafficSources(pageViews: any[]): Array<{ source: string; percentage: number }> {
    const sourceCount = new Map();
    
    pageViews.forEach(pv => {
      const referrer = pv.data.referrer;
      let source = 'Direct';
      
      if (referrer) {
        if (referrer.includes('google')) source = 'Google';
        else if (referrer.includes('facebook') || referrer.includes('twitter') || referrer.includes('linkedin')) source = 'Social Media';
        else source = 'Referral';
      }
      
      sourceCount.set(source, (sourceCount.get(source) || 0) + 1);
    });
    
    const total = pageViews.length;
    return Array.from(sourceCount.entries())
      .map(([source, count]) => ({ 
        source, 
        percentage: Math.round((count / total) * 100 * 10) / 10 
      }))
      .sort((a, b) => b.percentage - a.percentage);
  }

  private static getDeviceBreakdown(pageViews: any[]): Array<{ device: string; percentage: number }> {
    const deviceCount = new Map();
    
    pageViews.forEach(pv => {
      const device = pv.data.deviceType;
      deviceCount.set(device, (deviceCount.get(device) || 0) + 1);
    });
    
    const total = pageViews.length;
    return Array.from(deviceCount.entries())
      .map(([device, count]) => ({ 
        device: device.charAt(0).toUpperCase() + device.slice(1), 
        percentage: Math.round((count / total) * 100 * 10) / 10 
      }))
      .sort((a, b) => b.percentage - a.percentage);
  }

  private static getUserFlow(pageViews: any[]): Array<{ from: string; to: string; count: number }> {
    const sessions = this.calculateSessions(pageViews);
    const flowMap = new Map();
    
    sessions.forEach(session => {
      const sortedViews = session.sort((a: any, b: any) => a.data.timestamp - b.data.timestamp);
      
      for (let i = 0; i < sortedViews.length - 1; i++) {
        const from = sortedViews[i].data.page;
        const to = sortedViews[i + 1].data.page;
        const key = `${from} -> ${to}`;
        
        flowMap.set(key, (flowMap.get(key) || 0) + 1);
      }
    });
    
    return Array.from(flowMap.entries())
      .map(([flow, count]) => {
        const [from, to] = flow.split(' -> ');
        return { from, to, count };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  static exportToCSV(report: AnalyticsReport): string {
    const csvData = [
      ['Metric', 'Value'],
      ['Period', report.period],
      ['Unique Visitors', report.uniqueVisitors.toString()],
      ['Page Views', report.pageViews.toString()],
      ['Sessions', report.sessions.toString()],
      ['Avg Session Duration (seconds)', report.avgSessionDuration.toString()],
      ['Bounce Rate (%)', report.bounceRate.toString()],
      ['Conversion Rate (%)', report.conversionRate.toString()],
      [''],
      ['Top Pages', ''],
      ...report.topPages.map(page => [page.page, page.views.toString()]),
      [''],
      ['Traffic Sources', ''],
      ...report.trafficSources.map(source => [source.source, `${source.percentage}%`]),
      [''],
      ['Device Breakdown', ''],
      ...report.deviceBreakdown.map(device => [device.device, `${device.percentage}%`]),
    ];
    
    return csvData.map(row => row.join(',')).join('\n');
  }

  static scheduleAutomatedReports(email: string, frequency: 'daily' | 'weekly' | 'monthly'): void {
    // In a real implementation, this would set up automated email reports
    console.log(`Scheduled ${frequency} reports for ${email}`);
    
    // Store the preference
    localStorage.setItem('automated_reports', JSON.stringify({
      email,
      frequency,
      enabled: true,
      lastSent: null,
    }));
  }

  static getDataRetentionPolicy(): { period: number; unit: string } {
    // GDPR compliance: data retention policy
    return {
      period: 26,
      unit: 'months'
    };
  }

  static cleanupOldData(): void {
    const retentionPolicy = this.getDataRetentionPolicy();
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - retentionPolicy.period);
    
    const analyticsData = JSON.parse(localStorage.getItem('analytics_data') || '[]');
    const filteredData = analyticsData.filter((item: any) => 
      new Date(item.timestamp) > cutoffDate
    );
    
    localStorage.setItem('analytics_data', JSON.stringify(filteredData));
    console.log(`Cleaned up analytics data older than ${retentionPolicy.period} ${retentionPolicy.unit}`);
  }
}

// Auto-cleanup old data on module load
if (typeof window !== 'undefined') {
  AnalyticsProcessor.cleanupOldData();
}