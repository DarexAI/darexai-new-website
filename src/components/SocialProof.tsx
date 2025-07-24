import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Quote,
  Award,
  TrendingUp,
  Users,
  Building
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  results: { metric: string; value: string }[];
}

interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  metrics: { label: string; value: string; improvement: string }[];
}

const SocialProof: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'VP of Operations',
      company: 'TechFlow Inc.',
      content: 'Dare XAI transformed our entire sales process. We went from manual lead qualification to fully automated workflows that work 24/7. The ROI was evident within the first month.',
      rating: 5,
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      results: [
        { metric: 'Lead Conversion', value: '+340%' },
        { metric: 'Time Saved', value: '120h/week' },
        { metric: 'Revenue Growth', value: '+85%' }
      ]
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      role: 'Chief Marketing Officer',
      company: 'GrowthLabs',
      content: 'The AI-powered marketing automation has revolutionized our campaigns. Personalization at scale, predictive analytics, and automated optimization - it\'s like having a team of experts working around the clock.',
      rating: 5,
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      results: [
        { metric: 'Campaign ROI', value: '+250%' },
        { metric: 'Engagement Rate', value: '+180%' },
        { metric: 'Cost per Lead', value: '-60%' }
      ]
    },
    {
      id: '3',
      name: 'Emily Watson',
      role: 'CEO',
      company: 'InnovateNow',
      content: 'Implementing Dare XAI was the best decision we made this year. The platform not only automated our processes but also provided insights we never had before. Our team can now focus on strategy instead of repetitive tasks.',
      rating: 5,
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      results: [
        { metric: 'Operational Efficiency', value: '+400%' },
        { metric: 'Error Reduction', value: '-95%' },
        { metric: 'Team Productivity', value: '+220%' }
      ]
    }
  ];

  const caseStudies: CaseStudy[] = [
    {
      id: '1',
      title: 'E-commerce Giant Automates Customer Support',
      company: 'RetailMax',
      industry: 'E-commerce',
      challenge: 'Handling 10,000+ daily customer inquiries with limited support staff',
      solution: 'AI-powered chatbots with intelligent routing and automated resolution',
      results: 'Reduced response time by 90% and increased customer satisfaction by 45%',
      metrics: [
        { label: 'Response Time', value: '< 30 sec', improvement: '90% faster' },
        { label: 'Resolution Rate', value: '87%', improvement: '65% increase' },
        { label: 'Cost Savings', value: '$2.4M', improvement: 'annually' }
      ]
    },
    {
      id: '2',
      title: 'Manufacturing Leader Optimizes Supply Chain',
      company: 'IndustrialPro',
      industry: 'Manufacturing',
      challenge: 'Complex supply chain management with multiple vendors and variables',
      solution: 'Predictive analytics and automated procurement workflows',
      results: 'Improved efficiency by 60% and reduced costs by $5M annually',
      metrics: [
        { label: 'Efficiency Gain', value: '60%', improvement: 'improvement' },
        { label: 'Cost Reduction', value: '$5M', improvement: 'annually' },
        { label: 'Delivery Time', value: '40%', improvement: 'faster' }
      ]
    }
  ];

  const companyLogos = [
    'TechFlow', 'GrowthLabs', 'InnovateNow', 'RetailMax', 'IndustrialPro', 'DataCorp'
  ];

  const industryBadges = [
    { name: 'SOC 2 Certified', icon: Award },
    { name: 'GDPR Compliant', icon: Award },
    { name: 'ISO 27001', icon: Award },
    { name: 'Enterprise Ready', icon: Building }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-primary/5 via-transparent to-cyan-electric/5"></div>
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-green-neon rounded-full opacity-10 blur-3xl"
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
            <Users className="w-4 h-4 text-green-neon mr-2" />
            <span className="text-sm font-medium text-green-neon">Trusted by Industry Leaders</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient">Success Stories</span> from Our Clients
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            See how leading companies are transforming their operations and achieving 
            unprecedented growth with Dare XAI automation.
          </p>
        </motion.div>

        {/* Customer Logos */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-center text-gray-400 mb-8">Powering automation for industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-60">
            {companyLogos.map((company, index) => (
              <motion.div
                key={index}
                className="text-2xl font-bold text-gray-500 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 lg:p-12 rounded-3xl relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  {/* Quote Icon */}
                  <Quote className="w-12 h-12 text-purple-primary mx-auto mb-6 opacity-50" />
                  
                  {/* Testimonial Content */}
                  <blockquote className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
                    "{testimonials[activeTestimonial].content}"
                  </blockquote>

                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center justify-center space-x-4 mb-8">
                    <img
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <div className="text-white font-semibold text-lg">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-gray-400">
                        {testimonials[activeTestimonial].role}
                      </div>
                      <div className="text-purple-primary font-medium">
                        {testimonials[activeTestimonial].company}
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-6">
                    {testimonials[activeTestimonial].results.map((result, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-green-neon mb-1">
                          {result.value}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {result.metric}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8">
                <motion.button
                  onClick={prevTestimonial}
                  className="p-3 glass rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </motion.button>

                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeTestimonial ? 'bg-purple-primary' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextTestimonial}
                  className="p-3 glass rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Case Studies */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Featured <span className="text-gradient">Case Studies</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                className="glass-card p-8 rounded-2xl hover-lift"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Building className="w-6 h-6 text-cyan-electric" />
                  <span className="text-cyan-electric font-medium">{study.industry}</span>
                </div>

                <h4 className="text-xl font-bold text-white mb-4">{study.title}</h4>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-gray-400 text-sm">Challenge: </span>
                    <span className="text-gray-300 text-sm">{study.challenge}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Solution: </span>
                    <span className="text-gray-300 text-sm">{study.solution}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Results: </span>
                    <span className="text-green-neon text-sm font-medium">{study.results}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                  {study.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="text-lg font-bold text-purple-primary mb-1">
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-400 mb-1">
                        {metric.label}
                      </div>
                      <div className="text-xs text-green-neon">
                        {metric.improvement}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industry Badges */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-8">
            Enterprise-Grade <span className="text-gradient">Security & Compliance</span>
          </h3>

          <div className="flex flex-wrap justify-center items-center gap-6">
            {industryBadges.map((badge, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 glass px-6 py-3 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <badge.icon className="w-5 h-5 text-green-neon" />
                <span className="text-gray-300 font-medium">{badge.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;