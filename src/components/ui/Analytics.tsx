import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users, 
  DollarSign,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import Card from './Card';

interface MetricData {
  id: string;
  title: string;
  value: number;
  previousValue: number;
  format: 'number' | 'currency' | 'percentage';
  icon: React.ElementType;
  color: string;
}

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

interface AnalyticsProps {
  metrics?: MetricData[];
  chartData?: ChartData[];
  timeRange?: '7d' | '30d' | '90d' | '1y';
  onTimeRangeChange?: (range: '7d' | '30d' | '90d' | '1y') => void;
  className?: string;
}

const AnimatedCounter: React.FC<{ 
  value: number; 
  format: 'number' | 'currency' | 'percentage';
  duration?: number;
}> = ({ value, format, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case 'percentage':
        return `${val}%`;
      case 'number':
      default:
        return new Intl.NumberFormat('en-US').format(val);
    }
  };

  return <span>{formatValue(count)}</span>;
};

const MiniChart: React.FC<{ data: ChartData[]; type: 'line' | 'bar' | 'area' }> = ({ 
  data, 
  type 
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const width = 200;
  const height = 60;
  const padding = 10;

  const getPath = () => {
    if (data.length < 2) return '';
    
    const points = data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((d.value / maxValue) * (height - 2 * padding));
      return `${x},${y}`;
    });

    if (type === 'area') {
      const pathData = `M ${points[0]} L ${points.join(' L ')} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`;
      return pathData;
    } else {
      return `M ${points.join(' L ')}`;
    }
  };

  return (
    <div className="w-full h-16 flex items-center justify-center">
      <svg width={width} height={height} className="overflow-visible">
        {type === 'bar' ? (
          data.map((d, i) => {
            const barWidth = (width - 2 * padding) / data.length - 2;
            const barHeight = (d.value / maxValue) * (height - 2 * padding);
            const x = padding + (i * (width - 2 * padding)) / data.length;
            const y = height - padding - barHeight;
            
            return (
              <motion.rect
                key={i}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="url(#gradient)"
                initial={{ height: 0, y: height - padding }}
                animate={{ height: barHeight, y }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            );
          })
        ) : (
          <motion.path
            d={getPath()}
            fill={type === 'area' ? 'url(#areaGradient)' : 'none'}
            stroke="url(#gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        )}
        
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="50%" stopColor="#A020F0" />
            <stop offset="100%" stopColor="#00D26A" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A020F0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#A020F0" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const Analytics: React.FC<AnalyticsProps> = ({
  metrics = [],
  chartData = [],
  timeRange = '30d',
  onTimeRangeChange,
  className = ''
}) => {
  const defaultMetrics: MetricData[] = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: 125000,
      previousValue: 98000,
      format: 'currency',
      icon: DollarSign,
      color: 'text-success-green'
    },
    {
      id: 'users',
      title: 'Active Users',
      value: 2847,
      previousValue: 2156,
      format: 'number',
      icon: Users,
      color: 'text-electric-blue'
    },
    {
      id: 'conversion',
      title: 'Conversion Rate',
      value: 24,
      previousValue: 18,
      format: 'percentage',
      icon: TrendingUp,
      color: 'text-neon-purple'
    },
    {
      id: 'activity',
      title: 'Daily Activity',
      value: 89,
      previousValue: 76,
      format: 'percentage',
      icon: Activity,
      color: 'text-warning-orange'
    }
  ];

  const defaultChartData: ChartData[] = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
    { name: 'Jul', value: 7000 },
  ];

  const displayMetrics = metrics.length > 0 ? metrics : defaultMetrics;
  const displayChartData = chartData.length > 0 ? chartData : defaultChartData;

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const timeRangeOptions = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-bold text-white">Analytics Dashboard</h2>
        <div className="glass p-1 rounded-glass">
          {timeRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onTimeRangeChange?.(option.value as any)}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-all duration-300 ${
                timeRange === option.value
                  ? 'bg-gradient-primary text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayMetrics.map((metric, index) => {
          const change = calculateChange(metric.value, metric.previousValue);
          const isPositive = change > 0;
          const MetricIcon = metric.icon;

          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-glow-blue transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 glass rounded-glass ${metric.color}`}>
                    <MetricIcon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    isPositive ? 'text-success-green' : 'text-error-red'
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{Math.abs(change).toFixed(1)}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-gray-400 text-sm font-medium">{metric.title}</h3>
                  <div className={`text-3xl font-bold ${metric.color}`}>
                    <AnimatedCounter value={metric.value} format={metric.format} />
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="mt-4">
                  <MiniChart 
                    data={displayChartData.slice(-7)} 
                    type="line" 
                  />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Main Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-heading font-semibold text-white flex items-center">
              <LineChart className="w-5 h-5 mr-2 text-electric-blue" />
              Revenue Trend
            </h3>
          </div>
          <MiniChart data={displayChartData} type="area" />
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-heading font-semibold text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-neon-purple" />
              Performance Metrics
            </h3>
          </div>
          <MiniChart data={displayChartData} type="bar" />
        </Card>
      </div>

      {/* Real-time Updates Indicator */}
      <motion.div
        className="flex items-center justify-center space-x-2 text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="w-2 h-2 bg-success-green rounded-full animate-pulse"></div>
        <span>Live data • Updated {new Date().toLocaleTimeString()}</span>
      </motion.div>
    </div>
  );
};

export default Analytics;