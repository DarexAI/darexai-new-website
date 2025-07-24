import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Users, 
  Calendar, 
  BarChart3, 
  Target, 
  Zap,
  TrendingUp,
  MessageSquare,
  Share2,
  Eye,
  ArrowRight
} from 'lucide-react';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  features: string[];
  metrics: { label: string; value: string; trend: string }[];
}

const MarketingTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState('lead-gen');

  const tools: { [key: string]: Tool } = {
    'lead-gen': {
      id: 'lead-gen',
      title: 'Lead Generation Workflow',
      description: 'Intelligent lead capture and qualification system that identifies high-value prospects automatically.',
      icon: Target,
      color: 'text-purple-primary',
      features: ['Smart lead scoring', 'Automated qualification', 'CRM integration', 'Real-time notifications'],
      metrics: [
        { label: 'Leads Generated', value: '2,847', trend: '+23%' },
        { label: 'Qualification Rate', value: '67%', trend: '+12%' },
        { label: 'Conversion Rate', value: '18%', trend: '+8%' }
      ]
    },
    'email-automation': {
      id: 'email-automation',
      title: 'Email Automation System',
      description: 'Personalized email campaigns with dynamic content and optimal send-time optimization.',
      icon: Mail,
      color: 'text-cyan-electric',
      features: ['Dynamic personalization', 'A/B testing', 'Send-time optimization', 'Behavioral triggers'],
      metrics: [
        { label: 'Open Rate', value: '34%', trend: '+15%' },
        { label: 'Click Rate', value: '8.2%', trend: '+22%' },
        { label: 'Revenue Generated', value: '$127K', trend: '+31%' }
      ]
    },
    'social-scheduler': {
      id: 'social-scheduler',
      title: 'Social Media Scheduler',
      description: 'AI-powered content creation and scheduling across all major social media platforms.',
      icon: Share2,
      color: 'text-green-neon',
      features: ['Content generation', 'Optimal timing', 'Multi-platform posting', 'Engagement tracking'],
      metrics: [
        { label: 'Posts Scheduled', value: '156', trend: '+45%' },
        { label: 'Engagement Rate', value: '12.4%', trend: '+28%' },
        { label: 'Reach Growth', value: '89%', trend: '+67%' }
      ]
    },
    'analytics': {
      id: 'analytics',
      title: 'Analytics Dashboard',
      description: 'Comprehensive marketing analytics with predictive insights and automated reporting.',
      icon: BarChart3,
      color: 'text-yellow-400',
      features: ['Predictive analytics', 'Custom reports', 'ROI tracking', 'Performance alerts'],
      metrics: [
        { label: 'Data Points', value: '1.2M', trend: '+156%' },
        { label: 'Accuracy Rate', value: '94%', trend: '+7%' },
        { label: 'Time Saved', value: '78h', trend: '+34%' }
      ]
    }
  };

  const tabs = [
    { id: 'lead-gen', label: 'Lead Generation', icon: Target },
    { id: 'email-automation', label: 'Email Automation', icon: Mail },
    { id: 'social-scheduler', label: 'Social Media', icon: Share2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const activeTool = tools[activeTab];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-neon/5 via-transparent to-purple-primary/5"></div>
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-green-neon rounded-full opacity-10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center glass px-6 py-3 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-4 h-4 text-green-neon mr-2" />
            <span className="text-sm font-medium text-green-neon">Marketing Automation</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Complete <span className="text-gradient">Marketing Suite</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From lead generation to conversion tracking, our AI-powered marketing tools 
            work together to maximize your ROI and accelerate growth.
          </p>
        </motion.div>

        {/* Tool Tabs */}
        <motion.div
          className="flex flex-wrap justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="glass p-2 rounded-xl">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-primary text-white shadow-glow-purple' 
                    : 'text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Active Tool Display */}
        <motion.div
          key={activeTab}
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Tool Info */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className={`p-4 glass rounded-xl ${activeTool.color}`}>
                  <activeTool.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{activeTool.title}</h3>
                  <p className="text-gray-300">{activeTool.description}</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
                <div className="grid grid-cols-2 gap-3">
                  {activeTool.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className={`w-2 h-2 rounded-full ${activeTool.color.replace('text-', 'bg-')}`}></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.button
                className="px-8 py-4 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-glow-purple transition-all duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try This Tool
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
            </div>

            {/* Visual Representation */}
            <div className="glass-card p-8 rounded-2xl">
              {/* Mock Interface */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-white">{activeTool.title}</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-neon rounded-full animate-pulse"></div>
                    <span className="text-green-neon text-xs">Live</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {activeTool.metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      className="glass p-4 rounded-lg text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className={`text-xl font-bold ${activeTool.color} mb-1`}>
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
                      <div className="text-xs text-green-neon">{metric.trend}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Mini Visualization */}
                <div className="space-y-3">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-purple-primary' :
                        index === 1 ? 'bg-cyan-electric' :
                        index === 2 ? 'bg-green-neon' :
                        'bg-yellow-400'
                      }`}></div>
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${
                            index === 0 ? 'bg-purple-primary' :
                            index === 1 ? 'bg-cyan-electric' :
                            index === 2 ? 'bg-green-neon' :
                            'bg-yellow-400'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.random() * 80 + 20}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                      <span className="text-gray-400 text-xs w-12">
                        {Math.floor(Math.random() * 80 + 20)}%
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 py-2 glass rounded-lg text-gray-300 text-sm hover:bg-white hover:bg-opacity-10 transition-all duration-300">
                    View Details
                  </button>
                  <button className="flex-1 py-2 bg-gradient-primary text-white rounded-lg text-sm hover:shadow-glow-purple transition-all duration-300">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketingTools;