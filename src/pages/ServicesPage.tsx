import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Workflow, 
  Wrench, 
  Target, 
  X,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Clock,
  DollarSign,
  Zap,
  MessageSquare,
  BarChart3,
  Settings,
  Mail
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  features: string[];
  useCases: string[];
  pricing: string;
  testimonial: {
    quote: string;
    author: string;
    company: string;
    avatar: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
}

const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const services: Service[] = [
    {
      id: 'ai-assistants',
      title: 'AI Assistants',
      description: 'Intelligent virtual assistants that handle customer inquiries, internal support, and complex decision-making processes with human-like understanding.',
      icon: Bot,
      color: 'neon-cyan',
      features: [
        'Natural Language Processing',
        'Multi-language Support',
        'Context-aware Responses',
        'Integration with CRM/ERP',
        '24/7 Availability',
        'Sentiment Analysis',
        'Escalation Management',
        'Custom Knowledge Base'
      ],
      useCases: [
        'Customer Support Automation',
        'Internal IT Helpdesk',
        'Sales Lead Qualification',
        'HR Employee Assistance',
        'Technical Documentation Q&A',
        'Appointment Scheduling'
      ],
      pricing: 'Starting at $299/month',
      testimonial: {
        quote: "Our AI assistant handles 85% of customer inquiries automatically, reducing response time from hours to seconds.",
        author: "Sarah Johnson",
        company: "TechFlow Inc.",
        avatar: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
      },
      stats: [
        { label: 'Response Time', value: '< 2 sec' },
        { label: 'Accuracy Rate', value: '94%' },
        { label: 'Cost Reduction', value: '70%' }
      ]
    },
    {
      id: 'workflow-automation',
      title: 'Workflow Automation',
      description: 'End-to-end process automation that connects your tools, eliminates manual tasks, and ensures consistent execution across your organization.',
      icon: Workflow,
      color: 'neon-magenta',
      features: [
        'Visual Workflow Builder',
        'API Integrations',
        'Conditional Logic',
        'Error Handling',
        'Real-time Monitoring',
        'Approval Workflows',
        'Data Transformation',
        'Scheduled Execution'
      ],
      useCases: [
        'Invoice Processing',
        'Employee Onboarding',
        'Lead Nurturing Campaigns',
        'Inventory Management',
        'Report Generation',
        'Data Synchronization'
      ],
      pricing: 'Starting at $499/month',
      testimonial: {
        quote: "Workflow automation saved us 40 hours per week on manual processes and eliminated human errors completely.",
        author: "Marcus Rodriguez",
        company: "GrowthLabs",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
      },
      stats: [
        { label: 'Time Saved', value: '40h/week' },
        { label: 'Error Reduction', value: '99%' },
        { label: 'ROI', value: '340%' }
      ]
    },
    {
      id: 'custom-projects',
      title: 'Custom Projects',
      description: 'Bespoke AI solutions tailored to your unique business challenges, from proof-of-concept to full-scale enterprise deployment.',
      icon: Wrench,
      color: 'electric-blue',
      features: [
        'Custom AI Model Development',
        'Legacy System Integration',
        'Scalable Architecture',
        'Security & Compliance',
        'Training & Support',
        'Performance Optimization',
        'Ongoing Maintenance',
        'White-label Solutions'
      ],
      useCases: [
        'Predictive Analytics',
        'Computer Vision Systems',
        'Fraud Detection',
        'Supply Chain Optimization',
        'Risk Assessment',
        'Personalization Engines'
      ],
      pricing: 'Custom pricing',
      testimonial: {
        quote: "The custom AI solution transformed our supply chain, reducing costs by $2M annually while improving delivery times.",
        author: "Emily Watson",
        company: "InnovateNow",
        avatar: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
      },
      stats: [
        { label: 'Cost Savings', value: '$2M/year' },
        { label: 'Delivery Time', value: '50% faster' },
        { label: 'Accuracy', value: '98%' }
      ]
    },
    {
      id: 'lead-generation',
      title: 'Lead Generation',
      description: 'AI-powered lead identification, qualification, and nurturing that turns prospects into customers with personalized, data-driven approaches.',
      icon: Target,
      color: 'success-green',
      features: [
        'Prospect Identification',
        'Lead Scoring',
        'Automated Outreach',
        'Personalization Engine',
        'Multi-channel Campaigns',
        'Performance Analytics',
        'CRM Integration',
        'A/B Testing'
      ],
      useCases: [
        'B2B Sales Prospecting',
        'Email Marketing Automation',
        'Social Media Lead Gen',
        'Content Marketing',
        'Event Follow-up',
        'Referral Programs'
      ],
      pricing: 'Starting at $399/month',
      testimonial: {
        quote: "Our lead generation increased by 300% while reducing cost per lead by 60%. The ROI was immediate.",
        author: "David Kim",
        company: "SalesForce Pro",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
      },
      stats: [
        { label: 'Lead Increase', value: '300%' },
        { label: 'Cost Reduction', value: '60%' },
        { label: 'Conversion Rate', value: '25%' }
      ]
    }
  ];

  const ServiceModal: React.FC<{ service: Service; onClose: () => void }> = ({ service, onClose }) => (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className={`p-4 glass rounded-xl text-${service.color}`}>
                <service.icon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-heading font-bold text-white mb-2">
                  {service.title}
                </h2>
                <p className="text-gray-300 text-lg">{service.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 glass rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Key Features */}
              <div>
                <h3 className="text-xl font-heading font-bold text-white mb-4">Key Features</h3>
                <div className="grid grid-cols-1 gap-3">
                  {service.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <CheckCircle className={`w-5 h-5 text-${service.color} flex-shrink-0`} />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div>
                <h3 className="text-xl font-heading font-bold text-white mb-4">Use Cases</h3>
                <div className="grid grid-cols-1 gap-3">
                  {service.useCases.map((useCase, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <ArrowRight className={`w-4 h-4 text-${service.color} flex-shrink-0`} />
                      <span className="text-gray-300">{useCase}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Stats */}
              <div>
                <h3 className="text-xl font-heading font-bold text-white mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 gap-4">
                  {service.stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="glass p-4 rounded-xl text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className={`text-2xl font-bold text-${service.color} mb-1`}>
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div>
                <h3 className="text-xl font-heading font-bold text-white mb-4">Client Success Story</h3>
                <div className="glass p-6 rounded-xl">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={service.testimonial.avatar}
                      alt={service.testimonial.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-white font-medium">{service.testimonial.author}</div>
                      <div className={`text-${service.color} text-sm`}>{service.testimonial.company}</div>
                    </div>
                  </div>
                  <blockquote className="text-gray-300 italic leading-relaxed">
                    "{service.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="glass p-6 rounded-xl text-center">
                <div className={`text-2xl font-bold text-${service.color} mb-2`}>
                  {service.pricing}
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Includes setup, training, and 30-day support
                </p>
                <motion.button
                  className="w-full px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow-cyan transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started Today
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="pt-24 pb-12">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-magenta/10"></div>
          {/* Particle Effects */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center glass px-6 py-3 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Settings className="w-4 h-4 text-neon-cyan mr-2" />
              <span className="text-sm font-medium text-neon-cyan">Our Services</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6">
              Enterprise AI <span className="text-gradient animate-glow">Solutions</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Transform your business with our comprehensive suite of AI-powered automation services. 
              From intelligent assistants to custom solutions, we deliver measurable results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                onClick={() => setSelectedService(service)}
              >
                {/* Hexagonal Container */}
                <motion.div
                  className="hexagon glass-card p-12 aspect-square flex flex-col items-center justify-center text-center relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {/* Background Glow */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br from-${service.color}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    initial={false}
                  />

                  {/* Particle Effects on Hover */}
                  <AnimatePresence>
                    {hoveredService === service.id && (
                      <>
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-2 h-2 bg-${service.color} rounded-full`}
                            style={{
                              left: `${20 + Math.random() * 60}%`,
                              top: `${20 + Math.random() * 60}%`,
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ 
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                              y: [0, -20, -40],
                            }}
                            transition={{
                              duration: 2,
                              delay: i * 0.1,
                              repeat: Infinity,
                            }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>

                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`w-20 h-20 mx-auto mb-6 glass rounded-xl flex items-center justify-center text-${service.color} group-hover:shadow-glow-${service.color.split('-')[1]} transition-all duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <service.icon className="w-10 h-10" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Pricing */}
                    <div className={`text-lg font-bold text-${service.color} mb-4`}>
                      {service.pricing}
                    </div>

                    {/* CTA */}
                    <motion.div
                      className="flex items-center justify-center space-x-2 text-gray-400 group-hover:text-white transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm font-medium">Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Why Choose <span className="text-gradient">Dare XAI</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We don't just deliver solutions—we partner with you for long-term success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: 'Rapid Deployment',
                description: 'Get up and running in days, not months',
                color: 'neon-cyan'
              },
              {
                icon: Users,
                title: 'Expert Support',
                description: '24/7 support from AI specialists',
                color: 'neon-magenta'
              },
              {
                icon: DollarSign,
                title: 'Proven ROI',
                description: 'Average 300% return on investment',
                color: 'electric-blue'
              },
              {
                icon: Zap,
                title: 'Cutting-edge AI',
                description: 'Latest models and technologies',
                color: 'success-green'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-xl text-center hover-lift"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 glass rounded-xl flex items-center justify-center text-${benefit.color}`}>
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="glass-card p-12 rounded-3xl text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Ready to Transform Your <span className="text-gradient">Business?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Schedule a free consultation to discuss your specific needs and see how our AI solutions can drive your success.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                className="px-10 py-5 bg-gradient-primary text-white rounded-xl font-bold text-lg hover:shadow-glow-cyan transition-all duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Free Consultation
                <ArrowRight className="ml-3 w-5 h-5" />
              </motion.button>
              <motion.button
                className="px-10 py-5 glass text-white rounded-xl font-bold text-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="mr-3 w-5 h-5" />
                Live Chat with Expert
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesPage;