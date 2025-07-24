import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  DollarSign, 
  Clock, 
  BarChart3, 
  Users, 
  Settings,
  Shield,
  TrendingUp,
  Target,
  Sparkles
} from 'lucide-react';

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  stat: string;
  statLabel: string;
  color: string;
  features: string[];
}

const BenefitsGrid: React.FC = () => {
  const benefits: Benefit[] = [
    {
      id: 'productivity',
      title: 'Productivity Gains',
      description: 'Automate repetitive tasks and free your team to focus on high-value strategic work.',
      icon: Zap,
      stat: '300%',
      statLabel: 'Productivity Increase',
      color: 'purple-primary',
      features: ['Task automation', 'Workflow optimization', 'Time tracking', 'Performance analytics']
    },
    {
      id: 'cost-savings',
      title: 'Cost Savings',
      description: 'Reduce operational costs through intelligent automation and resource optimization.',
      icon: DollarSign,
      stat: '65%',
      statLabel: 'Cost Reduction',
      color: 'green-neon',
      features: ['Reduced labor costs', 'Operational efficiency', 'Resource optimization', 'ROI tracking']
    },
    {
      id: 'operations',
      title: '24/7 Operations',
      description: 'Your AI workforce never sleeps, ensuring continuous operations and instant responses.',
      icon: Clock,
      stat: '24/7',
      statLabel: 'Uptime Guarantee',
      color: 'cyan-electric',
      features: ['Continuous monitoring', 'Instant responses', 'Global availability', 'Automated scaling']
    },
    {
      id: 'insights',
      title: 'Data Insights',
      description: 'Transform raw data into actionable insights with advanced AI analytics and reporting.',
      icon: BarChart3,
      stat: '10x',
      statLabel: 'Faster Insights',
      color: 'yellow-400',
      features: ['Predictive analytics', 'Real-time dashboards', 'Custom reports', 'Trend analysis']
    },
    {
      id: 'collaboration',
      title: 'Team Collaboration',
      description: 'Enhance team productivity with intelligent collaboration tools and automated workflows.',
      icon: Users,
      stat: '85%',
      statLabel: 'Team Efficiency',
      color: 'purple-primary',
      features: ['Smart notifications', 'Task delegation', 'Progress tracking', 'Team analytics']
    },
    {
      id: 'customization',
      title: 'Custom Automation',
      description: 'Tailor every automation to your specific business needs and industry requirements.',
      icon: Settings,
      stat: '100%',
      statLabel: 'Customizable',
      color: 'cyan-electric',
      features: ['Custom workflows', 'API integrations', 'Business rules', 'Flexible deployment']
    },
    {
      id: 'security',
      title: 'Enterprise Security',
      description: 'Bank-level security with compliance standards and data protection protocols.',
      icon: Shield,
      stat: '99.9%',
      statLabel: 'Security Rating',
      color: 'green-neon',
      features: ['End-to-end encryption', 'Compliance ready', 'Access controls', 'Audit trails']
    },
    {
      id: 'scalability',
      title: 'Infinite Scalability',
      description: 'Scale your automation from startup to enterprise without infrastructure limitations.',
      icon: TrendingUp,
      stat: '∞',
      statLabel: 'Scale Potential',
      color: 'yellow-400',
      features: ['Auto-scaling', 'Load balancing', 'Global deployment', 'Performance optimization']
    }
  ];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-primary/5 via-transparent to-green-neon/5"></div>
        <motion.div
          className="absolute top-20 right-20 w-80 h-80 bg-purple-primary rounded-full opacity-10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-electric rounded-full opacity-10 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity }}
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
            <Sparkles className="w-4 h-4 text-green-neon mr-2" />
            <span className="text-sm font-medium text-green-neon">Business Benefits</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Why Choose <span className="text-gradient">Dare XAI</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience measurable improvements across every aspect of your business with 
            our comprehensive AI automation platform.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              className="glass-card p-6 rounded-2xl hover-lift group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Icon & Stat */}
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 glass rounded-xl text-${benefit.color} group-hover:glow-${benefit.color.split('-')[0]} transition-all duration-300`}>
                  <benefit.icon className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold text-${benefit.color}`}>
                    {benefit.stat}
                  </div>
                  <div className="text-xs text-gray-400">
                    {benefit.statLabel}
                  </div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
                {benefit.title}
              </h3>
              
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                {benefit.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {benefit.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ transitionDelay: `${featureIndex * 100}ms` }}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full bg-${benefit.color}`}></div>
                    <span className="text-gray-400 text-xs">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${benefit.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl pointer-events-none`}></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-8 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Experience These <span className="text-gradient">Benefits?</span>
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Join thousands of companies already transforming their operations with Dare XAI. 
              Start your free trial today and see results within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                className="px-10 py-5 bg-gradient-primary text-white rounded-xl font-bold text-lg hover:shadow-glow-purple transition-all duration-300 pulse-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
              </motion.button>
              <motion.button
                className="px-10 py-5 glass text-white rounded-xl font-bold text-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Calculate ROI
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsGrid;