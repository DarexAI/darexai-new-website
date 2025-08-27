import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Eye, 
  Clock, 
  TrendingUp, 
  Download,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  MousePointer,
  Activity
} from 'lucide-react';

interface AnalyticsData {
  uniqueVisitors: number;
  pageViews: number;
  avgTimeOnSite: number;
  bounceRate: number;
  topPages: Array<{ page: string; views: number; avgTime: number }>;
  trafficSources: Array<{ source: string; visitors: number; percentage: number }>;
  deviceBreakdown: Array<{ device: string; percentage: number; count: number }>;
  userDemographics: Array<{ country: string; visitors: number; percentage: number }>;
  conversionRates: Array<{ action: string; rate: number; count: number }>;
  realTimeUsers: number;
  clickHeatmap: Array<{ x: number; y: number; intensity: number }>;
}

const AdminDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [dateRange, setDateRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalyticsData = async () => {
      setIsLoading(true);
      
      // In a real implementation, this would fetch from your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - in production, this would come from your analytics backend
      const mockData: AnalyticsData = {
        uniqueVisitors: 12847,
        pageViews: 45632,
        avgTimeOnSite: 245, // seconds
        bounceRate: 32.5,
        topPages: [
          { page: '/', views: 15234, avgTime: 180 },
          { page: '/about', views: 8765, avgTime: 220 },
          { page: '/services', views: 6543, avgTime: 195 },
          { page: '/contact', views: 4321, avgTime: 160 },
          { page: '/blog', views: 3210, avgTime: 280 },
        ],
        trafficSources: [
          { source: 'Direct', visitors: 5234, percentage: 40.7 },
          { source: 'Google Search', visitors: 3456, percentage: 26.9 },
          { source: 'Social Media', visitors: 2345, percentage: 18.3 },
          { source: 'Referrals', visitors: 1234, percentage: 9.6 },
          { source: 'Email', visitors: 578, percentage: 4.5 },
        ],
        deviceBreakdown: [
          { device: 'Desktop', percentage: 52.3, count: 6720 },
          { device: 'Mobile', percentage: 38.7, count: 4970 },
          { device: 'Tablet', percentage: 9.0, count: 1157 },
        ],
        userDemographics: [
          { country: 'United States', visitors: 5139, percentage: 40.0 },
          { country: 'Canada', visitors: 1927, percentage: 15.0 },
          { country: 'United Kingdom', visitors: 1284, percentage: 10.0 },
          { country: 'Germany', visitors: 1027, percentage: 8.0 },
          { country: 'Australia', visitors: 770, percentage: 6.0 },
          { country: 'Others', visitors: 2700, percentage: 21.0 },
        ],
        conversionRates: [
          { action: 'Demo Booking', rate: 3.2, count: 412 },
          { action: 'Newsletter Signup', rate: 8.7, count: 1119 },
          { action: 'Contact Form', rate: 2.1, count: 270 },
          { action: 'Service Inquiry', rate: 1.8, count: 231 },
        ],
        realTimeUsers: 47,
        clickHeatmap: Array.from({ length: 50 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          intensity: Math.random()
        })),
      };
      
      setAnalyticsData(mockData);
      setIsLoading(false);
    };

    loadAnalyticsData();
  }, [dateRange]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const exportData = () => {
    if (!analyticsData) return;
    
    const dataToExport = {
      exportDate: new Date().toISOString(),
      dateRange,
      ...analyticsData,
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${dateRange}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-purple-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <div className="min-h-screen bg-dark text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Real-time visitor analytics and insights</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {/* Date Range Selector */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-primary"
            >
              <option value="1d">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            
            {/* Export Button */}
            <motion.button
              onClick={exportData}
              className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-glow-purple transition-all duration-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </motion.button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Unique Visitors',
              value: analyticsData.uniqueVisitors.toLocaleString(),
              icon: Users,
              color: 'text-purple-primary',
              change: '+12.5%'
            },
            {
              title: 'Page Views',
              value: analyticsData.pageViews.toLocaleString(),
              icon: Eye,
              color: 'text-cyan-electric',
              change: '+8.3%'
            },
            {
              title: 'Avg. Time on Site',
              value: formatTime(analyticsData.avgTimeOnSite),
              icon: Clock,
              color: 'text-green-neon',
              change: '+15.2%'
            },
            {
              title: 'Bounce Rate',
              value: `${analyticsData.bounceRate}%`,
              icon: TrendingUp,
              color: 'text-yellow-400',
              change: '-5.1%'
            },
          ].map((metric, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 rounded-xl hover-lift"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
                <span className="text-green-neon text-sm font-medium">{metric.change}</span>
              </div>
              <div className={`text-3xl font-bold ${metric.color} mb-2`}>
                {metric.value}
              </div>
              <div className="text-gray-400 text-sm">{metric.title}</div>
            </motion.div>
          ))}
        </div>

        {/* Real-time Users */}
        <motion.div
          className="glass-card p-6 rounded-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="w-6 h-6 text-green-neon" />
              <h3 className="text-xl font-bold text-white">Real-time Users</h3>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-neon rounded-full animate-pulse"></div>
              <span className="text-2xl font-bold text-green-neon">
                {analyticsData.realTimeUsers}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Pages */}
          <motion.div
            className="glass-card p-6 rounded-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-purple-primary" />
              Top Pages
            </h3>
            <div className="space-y-4">
              {analyticsData.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-white font-medium">{page.page}</div>
                    <div className="text-gray-400 text-sm">
                      {page.views.toLocaleString()} views • {formatTime(page.avgTime)} avg
                    </div>
                  </div>
                  <div className="w-24 bg-gray-700 rounded-full h-2 ml-4">
                    <div
                      className="bg-purple-primary h-2 rounded-full"
                      style={{ width: `${(page.views / analyticsData.topPages[0].views) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Traffic Sources */}
          <motion.div
            className="glass-card p-6 rounded-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-cyan-electric" />
              Traffic Sources
            </h3>
            <div className="space-y-4">
              {analyticsData.trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-white font-medium">{source.source}</div>
                    <div className="text-gray-400 text-sm">
                      {source.visitors.toLocaleString()} visitors
                    </div>
                  </div>
                  <div className="text-cyan-electric font-bold">
                    {source.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Device Breakdown */}
          <motion.div
            className="glass-card p-6 rounded-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Device Breakdown</h3>
            <div className="space-y-4">
              {analyticsData.deviceBreakdown.map((device, index) => {
                const Icon = device.device === 'Desktop' ? Monitor : 
                           device.device === 'Mobile' ? Smartphone : Tablet;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-green-neon" />
                      <div>
                        <div className="text-white font-medium">{device.device}</div>
                        <div className="text-gray-400 text-sm">
                          {device.count.toLocaleString()} users
                        </div>
                      </div>
                    </div>
                    <div className="text-green-neon font-bold">
                      {device.percentage}%
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Conversion Rates */}
          <motion.div
            className="glass-card p-6 rounded-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-yellow-400" />
              Conversion Rates
            </h3>
            <div className="space-y-4">
              {analyticsData.conversionRates.map((conversion, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-white font-medium">{conversion.action}</div>
                    <div className="text-gray-400 text-sm">
                      {conversion.count} conversions
                    </div>
                  </div>
                  <div className="text-yellow-400 font-bold">
                    {conversion.rate}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* User Demographics */}
        <motion.div
          className="glass-card p-6 rounded-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-purple-primary" />
            User Demographics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analyticsData.userDemographics.map((demo, index) => (
              <div key={index} className="flex items-center justify-between p-4 glass rounded-lg">
                <div>
                  <div className="text-white font-medium">{demo.country}</div>
                  <div className="text-gray-400 text-sm">
                    {demo.visitors.toLocaleString()} visitors
                  </div>
                </div>
                <div className="text-purple-primary font-bold">
                  {demo.percentage}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Click Heatmap */}
        <motion.div
          className="glass-card p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <MousePointer className="w-5 h-5 mr-2 text-cyan-electric" />
            Click Heatmap
          </h3>
          <div className="relative bg-gray-800 rounded-lg h-64 overflow-hidden">
            {analyticsData.clickHeatmap.map((click, index) => (
              <div
                key={index}
                className="absolute w-4 h-4 bg-red-500 rounded-full opacity-60 animate-pulse"
                style={{
                  left: `${click.x}%`,
                  top: `${click.y}%`,
                  opacity: click.intensity,
                }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              Simulated click data visualization
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;