import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  Zap,
  ArrowRight,
  BarChart3,
  Target
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  status: 'completed' | 'running' | 'pending';
  time: string;
  type: 'email' | 'lead' | 'analysis' | 'support';
}

interface Metric {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
}

const LiveDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setActiveTaskIndex(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const tasks: Task[] = [
    { id: '1', title: 'Email campaign sent to 2,500 leads', status: 'completed', time: '2 min ago', type: 'support' },
     { id: '1', title: 'AI Voice Calling Agent called 10 people', status: 'completed', time: '5 min ago', type: 'email' },
    { id: '2', title: 'Lead qualification completed', status: 'completed', time: '10 min ago', type: 'lead' },
    { id: '3', title: 'AI powered Market analysis report generated', status: 'running', time: '3hr ago', type: 'analysis' },
    { id: '5', title: 'Social media posts scheduled', status: 'pending', time: 'Queued', type: 'email' },
  ];

  const metrics: Metric[] = [
    { label: 'Tasks Completed', value: '1,247', change: '+12%', icon: CheckCircle, color: 'text-green-neon' },
    { label: 'Active Automations', value: '89', change: '+5%', icon: Activity, color: 'text-cyan-electric' },
    { label: 'Time Saved', value: '156h', change: '+23%', icon: Clock, color: 'text-purple-primary' },
    { label: 'Revenue Impact', value: '$45K', change: '+18%', icon: TrendingUp, color: 'text-green-neon' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-neon" />;
      case 'running': return <Activity className="w-4 h-4 text-cyan-electric animate-pulse" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      default: return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-purple-primary/20 text-purple-primary';
      case 'lead': return 'bg-cyan-electric/20 text-cyan-electric';
      case 'analysis': return 'bg-green-neon/20 text-green-neon';
      case 'support': return 'bg-yellow-400/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-primary/5 via-transparent to-cyan-electric/5"></div>
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-purple-primary rounded-full opacity-10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
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
            <Activity className="w-4 h-4 text-green-neon mr-2" />
            <span className="text-sm font-medium text-green-neon">Live Dashboard</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            See Your <span className="text-gradient">AI in Action</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Watch as your AI automation platform works around the clock, completing tasks, 
            generating insights, and driving results in real-time.
          </p>
        </motion.div>

        {/* Dashboard Container */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-8 rounded-3xl">
            {/* Dashboard Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Automation Command Center</h3>
                <p className="text-gray-400">
                  Last updated: {currentTime.toLocaleTimeString()}
                </p>
              </div>
              <motion.button
                className="mt-4 lg:mt-0 px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-glow-purple transition-all duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Live Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  className="glass p-6 rounded-xl text-center hover-lift"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-center mb-3">
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
                  <div className="text-xs text-green-neon">{metric.change}</div>
                </motion.div>
              ))}
            </div>

            {/* Live Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tasks Timeline */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Activity className="w-5 h-5 text-cyan-electric mr-2" />
                  Recent Activity
                </h4>
                <div className="space-y-4">
                  {tasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      className={`glass p-4 rounded-lg transition-all duration-300 ${
                        index === activeTaskIndex ? 'glow-purple' : ''
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            {getStatusIcon(task.status)}
                            <span className="text-white text-sm font-medium">
                              {task.title}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(task.type)}`}>
                              {task.type}
                            </span>
                            <span className="text-gray-400 text-xs">{task.time}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Performance Chart */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 text-purple-primary mr-2" />
                  Performance Overview
                </h4>
                <div className="glass p-6 rounded-lg">
                  {/* Mock Chart */}
                  <div className="space-y-4">
                    {[
                      { label: 'AI Voice Calling', value: 98, color: 'bg-yellow-400' },
                      { label: 'AI Email Automation', value: 95, color: 'bg-yellow-400' },
                      { label: 'AI Lead Generation', value: 92, color: 'bg-yellow-400' },
                      { label: 'AI-Powered Market Analysis', value: 87, color: 'bg-yellow-400' },
                      { label: 'Whatsapp Customer Support RAG AI Agent', value: 96, color: 'bg-yellow-400' },
                      { label: 'Advance AI Custom Solutions for your enterprise', value: 88, color: 'bg-yellow-400' },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">{item.label}</span>
                          <span className="text-white font-semibold">{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${item.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.value}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-neon mb-1">99.9%</div>
                  <div className="text-gray-400 text-sm">System Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-electric mb-1">2.3s</div>
                  <div className="text-gray-400 text-sm">Avg Response Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-primary mb-1">156</div>
                  <div className="text-gray-400 text-sm">Active Workflows</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveDashboard;