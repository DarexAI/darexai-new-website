import React from 'react';
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
import ScrollReveal from '../ui/ScrollReveal';
import AnimatedIcon from '../ui/AnimatedIcon';
import GlowButton from '../ui/GlowButton';
import { useParallaxScroll } from '../../hooks/useScrollAnimation';

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

const EnhancedFeatures: React.FC = () => {
  const parallaxOffset = useParallaxScroll(0.3);

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
    { icon: Brain, title: 'Advanced AI', description: 'Enterprise-grade machine learning', animation: 'glow' as const },
    { icon: Shield, title: 'Security First', description: 'Bank-level encryption & compliance', animation: 'pulse' as const },
    { icon: Users, title: 'Team Collaboration', description: 'Seamless multi-user workflows', animation: 'float' as const },
    { icon: Zap, title: 'Lightning Fast', description: 'Real-time processing & insights', animation: 'bounce' as const }
  ];

  return (
    <section id="platform" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-primary rounded-full blur-3xl opacity-20"
          style={{ y: parallaxOffset }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-electric rounded-full blur-3xl opacity-20"
          style={{ y: -parallaxOffset }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <ScrollReveal direction="up" className="text-center mb-16 lg:mb-20">
          <motion.div
            className="inline-flex items-center glass px-6 py-3 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <AnimatedIcon Icon={Brain} animation="glow" size="sm" className="mr-2" />
            <span className="text-sm font-medium text-cyan-electric">AI-Powered Solutions</span>
          </motion.div>

          <motion.h2 
            className="text-4xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Automation That <span className="text-gradient">Actually Works</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our enterprise AI platform doesn't just automate tasks—it intelligently adapts, learns, and optimizes 
            your entire business ecosystem for maximum efficiency and growth.
          </motion.p>
        </ScrollReveal>

        {/* Enhanced Main Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {featureCards.map((card, index) => (
            <ScrollReveal 
              key={card.id} 
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 0.1}
            >
              <motion.div
                className="glass-card p-8 rounded-2xl hover-lift cursor-pointer group relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {/* Animated background glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br from-${card.color.split('-')[1]}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <motion.div 
                      className={`p-4 glass rounded-xl ${card.color} group-hover:${card.glowColor} transition-all duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <card.icon className="w-8 h-8" />
                    </motion.div>
                    <div className="text-right">
                      <motion.div 
                        className={`text-2xl font-bold ${card.color}`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        {card.stats}
                      </motion.div>
                      <div className="text-sm text-gray-400">Average Impact</div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{card.description}</p>

                  {/* Enhanced Feature List */}
                  <div className="space-y-3 mb-6">
                    {card.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        style={{ transitionDelay: `${featureIndex * 100}ms` }}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className={`w-4 h-4 ${card.color} flex-shrink-0`} />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    className={`group/btn flex items-center text-sm font-semibold ${card.color} hover:text-white transition-colors duration-300`}
                    whileHover={{ x: 5 }}
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Enhanced Additional Features Grid */}
        <ScrollReveal direction="up" className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="glass p-6 rounded-xl text-center hover-lift group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 10, duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 glass rounded-lg mb-4 group-hover:glow-purple transition-all duration-300">
                  <AnimatedIcon 
                    Icon={feature.icon} 
                    animation={feature.animation}
                    color="text-purple-primary"
                  />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Enhanced Bottom CTA */}
        <ScrollReveal direction="up" className="text-center">
          <GlowButton
            variant="primary"
            size="lg"
            glowIntensity="high"
            className="pulse-glow"
          >
            Explore All Features
          </GlowButton>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default EnhancedFeatures;