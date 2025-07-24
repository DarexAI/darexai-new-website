import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  MessageSquare, 
  Settings, 
  Users, 
  Zap, 
  Brain, 
  Shield, 
  TrendingUp,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  glowColor: string;
  stats: string;
  features: string[];
}

const Features: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const featureCards: FeatureCard[] = [
    {
      id: 'sales',
      title: 'Sales Automation',
      description: 'Transform your sales pipeline with AI-powered lead qualification, automated follow-ups, and intelligent deal scoring.',
      icon: BarChart3,
      color: 'text-purple-primary',
      glowColor: 'glow-purple',
      stats: '300% ROI Increase',
      features: ['Lead Qualification', 'Pipeline Management', 'Revenue Forecasting', 'Deal Intelligence']
    },
    {
      id: 'marketing',
      title: 'Marketing Intelligence',
      description: 'Personalize customer journeys at scale with dynamic content generation and predictive campaign optimization.',
      icon: TrendingUp,
      color: 'text-cyan-electric',
      glowColor: 'glow-cyan',
      stats: '85% Higher Conversion',
      features: ['Campaign Optimization', 'Content Generation', 'Customer Segmentation', 'Performance Analytics']
    },
    {
      id: 'operations',
      title: 'Operations Engine',
      description: 'Streamline complex workflows with intelligent process automation and real-time operational insights.',
      icon: Settings,
      color: 'text-green-neon',
      glowColor: 'glow-green',
      stats: '70% Time Savings',
      features: ['Workflow Automation', 'Resource Optimization', 'Quality Control', 'Compliance Monitoring']
    },
    {
      id: 'support',
      title: 'Support Excellence',
      description: 'Deliver exceptional customer experiences with AI-powered support agents and intelligent issue resolution.',
      icon: MessageSquare,
      color: 'text-purple-primary',
      glowColor: 'glow-purple',
      stats: '24/7 Availability',
      features: ['Intelligent Routing', 'Automated Responses', 'Sentiment Analysis', 'Knowledge Management']
    }
  ];

  const additionalFeatures = [
    { icon: Brain, title: 'Advanced AI', description: 'Enterprise-grade machine learning' },
    { icon: Shield, title: 'Security First', description: 'Bank-level encryption & compliance' },
    { icon: Users, title: 'Team Collaboration', description: 'Seamless multi-user workflows' },
    { icon: Zap, title: 'Lightning Fast', description: 'Real-time processing & insights' }
  ];

  return (
    <section id="platform" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-electric rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center glass px-6 py-3 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Brain className="w-4 h-4 text-cyan-electric mr-2" />
            <span className="text-sm font-medium text-cyan-electric">AI-Powered Solutions</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Automation That <span className="text-gradient">Actually Works</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our enterprise AI platform doesn't just automate tasks—it intelligently adapts, learns, and optimizes 
            your entire business ecosystem for maximum efficiency and growth.
          </p>
        </motion.div>

        {/* Main Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {featureCards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`glass-card p-8 rounded-2xl hover-lift cursor-pointer transition-all duration-500 ${
                hoveredCard === card.id ? card.glowColor : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 glass rounded-xl ${card.color}`}>
                  <card.icon className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${card.color}`}>{card.stats}</div>
                  <div className="text-sm text-gray-400">Average Impact</div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">{card.description}</p>

              {/* Feature List */}
              <motion.div 
                className={`space-y-3 mb-6 transition-all duration-300 ${
                  hoveredCard === card.id ? 'opacity-100 max-h-96' : 'opacity-70 max-h-32 overflow-hidden'
                }`}
              >
                {card.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: featureIndex * 0.1 }}
                  >
                    <CheckCircle className={`w-4 h-4 ${card.color} flex-shrink-0`} />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                className={`group flex items-center text-sm font-semibold ${card.color} hover:text-white transition-colors duration-300`}
                whileHover={{ x: 5 }}
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="glass p-6 rounded-xl text-center hover-lift group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 glass rounded-lg mb-4 group-hover:glow-purple transition-all duration-300">
                <feature.icon className="w-6 h-6 text-purple-primary" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-primary text-white rounded-lg font-semibold text-lg hover:shadow-glow-purple transition-all duration-300 pulse-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;