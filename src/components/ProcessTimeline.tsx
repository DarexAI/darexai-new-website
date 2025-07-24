import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Code, 
  Puzzle, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  Shield
} from 'lucide-react';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  duration: string;
  features: string[];
  color: string;
}

const ProcessTimeline: React.FC = () => {
  const steps: ProcessStep[] = [
    {
      id: 1,
      title: 'Analysis & Planning',
      description: 'We analyze your current processes and identify automation opportunities with maximum ROI potential.',
      icon: Search,
      duration: '1-2 weeks',
      features: ['Process audit', 'ROI analysis', 'Custom roadmap', 'Stakeholder interviews'],
      color: 'purple-primary'
    },
    {
      id: 2,
      title: 'Custom Development',
      description: 'Our AI engineers build tailored automation solutions that integrate seamlessly with your existing systems.',
      icon: Code,
      duration: '2-4 weeks',
      features: ['Custom AI models', 'API integrations', 'Workflow design', 'Testing & validation'],
      color: 'cyan-electric'
    },
    {
      id: 3,
      title: 'System Integration',
      description: 'Seamless deployment and integration with your current tech stack, ensuring zero disruption to operations.',
      icon: Puzzle,
      duration: '1-2 weeks',
      features: ['Zero-downtime deployment', 'Data migration', 'Security setup', 'Team training'],
      color: 'green-neon'
    },
    {
      id: 4,
      title: 'Optimization & Support',
      description: 'Continuous monitoring, optimization, and 24/7 support to ensure peak performance and maximum value.',
      icon: TrendingUp,
      duration: 'Ongoing',
      features: ['Performance monitoring', '24/7 support', 'Regular updates', 'Scaling assistance'],
      color: 'yellow-400'
    }
  ];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-primary/5 via-transparent to-cyan-electric/5"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center glass px-6 py-3 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Clock className="w-4 h-4 text-purple-primary mr-2" />
            <span className="text-sm font-medium text-purple-primary">Implementation Process</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            From Concept to <span className="text-gradient">Automation</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our proven 4-step process ensures successful AI automation implementation 
            with measurable results and minimal disruption to your operations.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-primary via-cyan-electric via-green-neon to-yellow-400 rounded-full transform -translate-y-1/2"></div>
              
              {/* Progress Indicator */}
              <motion.div
                className="absolute top-1/2 left-0 h-1 bg-white rounded-full transform -translate-y-1/2 z-10"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 2, delay: 0.5 }}
                viewport={{ once: true }}
              />

              {/* Steps */}
              <div className="grid grid-cols-4 gap-8 relative z-20">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {/* Step Number & Icon */}
                    <motion.div
                      className={`relative mx-auto w-20 h-20 glass-card rounded-full flex items-center justify-center mb-6 hover-lift`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className={`absolute inset-0 bg-${step.color} opacity-20 rounded-full blur-lg`}></div>
                      <step.icon className={`w-8 h-8 text-${step.color} relative z-10`} />
                      <div className={`absolute -top-2 -right-2 w-6 h-6 bg-${step.color} text-dark text-xs font-bold rounded-full flex items-center justify-center`}>
                        {step.id}
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="glass-card p-6 rounded-xl hover-lift">
                      <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">{step.description}</p>
                      
                      <div className={`inline-flex items-center px-3 py-1 bg-${step.color}/20 text-${step.color} rounded-full text-xs font-medium mb-4`}>
                        <Clock className="w-3 h-3 mr-1" />
                        {step.duration}
                      </div>

                      <div className="space-y-2">
                        {step.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2 text-xs">
                            <CheckCircle className={`w-3 h-3 text-${step.color} flex-shrink-0`} />
                            <span className="text-gray-400">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className={`absolute left-10 top-20 w-0.5 h-16 bg-${step.color} opacity-30`}></div>
                )}

                <div className="flex items-start space-x-6">
                  {/* Step Icon */}
                  <motion.div
                    className={`relative w-20 h-20 glass-card rounded-full flex items-center justify-center flex-shrink-0`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className={`absolute inset-0 bg-${step.color} opacity-20 rounded-full blur-lg`}></div>
                    <step.icon className={`w-8 h-8 text-${step.color} relative z-10`} />
                    <div className={`absolute -top-2 -right-2 w-6 h-6 bg-${step.color} text-dark text-xs font-bold rounded-full flex items-center justify-center`}>
                      {step.id}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 glass-card p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">{step.description}</p>
                    
                    <div className={`inline-flex items-center px-3 py-1 bg-${step.color}/20 text-${step.color} rounded-full text-xs font-medium mb-4`}>
                      <Clock className="w-3 h-3 mr-1" />
                      {step.duration}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2 text-xs">
                          <CheckCircle className={`w-3 h-3 text-${step.color} flex-shrink-0`} />
                          <span className="text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Your <span className="text-gradient">Automation Journey?</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Schedule a free consultation to discuss your specific needs and get a custom implementation plan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                className="px-8 py-4 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-glow-purple transition-all duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Consultation
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
              <motion.button
                className="px-8 py-4 glass text-white rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Case Studies
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessTimeline;