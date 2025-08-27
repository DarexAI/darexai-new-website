import React, { useState, useCallback, useMemo } from 'react';
import { useSEO, useBreadcrumbs } from '../hooks/useSEO';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  Bot, 
  Send,
  FileSpreadsheet,
  Globe,
  CheckCircle,
  ArrowRight,
  Zap
} from 'lucide-react';
import BookingModal from '../components/shared/BookingModal';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  details: string[];
}

const HowItWorksPage: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Memoized handlers for better performance
  const handleOpenBooking = useCallback(() => {
    setIsBookingOpen(true);
  }, []);

  const handleCloseBooking = useCallback(() => {
    setIsBookingOpen(false);
  }, []);

  // SEO optimization
  useSEO({
    title: 'How AI Automation Works | 3-Step Implementation Process | Dare XAI',
    description: 'Learn how Dare XAI implements AI automation in just 3 steps: Lead capturing, AI response, and data integration. Voice calling and WhatsApp automation in 5-7 days.',
    keywords: 'how AI automation works, AI implementation process, automation deployment, voice calling setup, WhatsApp bot implementation, business process automation',
    canonical: 'https://darexai.com/how-it-works'
  });

  // Breadcrumb navigation
  useBreadcrumbs([
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '/how-it-works' }
  ]);

  // Memoized data arrays for better performance
  const steps: Step[] = useMemo(() => [
    {
      id: 1,
      title: 'Lead Enters',
      description: 'From ad, form, or missed call',
      icon: UserPlus,
      color: 'from-blue-500 to-indigo-600',
      details: [
        'Facebook/Google ads',
        'Website contact forms', 
        'Missed phone calls',
        'WhatsApp inquiries',
        'Walk-in registrations'
      ]
    },
    {
      id: 2,
      title: 'AI Agent Responds Instantly',
      description: 'Voice or WhatsApp replies with smart conversation',
      icon: Bot,
      color: 'from-purple-500 to-violet-600',
      details: [
        'Responds in 2-3 seconds',
        'Speaks Hindi, Tamil, Marathi',
        'Understands context and intent',
        'Asks qualifying questions',
        'Handles objections naturally'
      ]
    },
    {
      id: 3,
      title: 'Follow-up, Bookings, or Info Sent',
      description: 'Based on logic or intent',
      icon: Send,
      color: 'from-emerald-500 to-teal-600',
      details: [
        'Books appointments automatically',
        'Sends product catalogs',
        'Schedules demo calls',
        'Collects requirements',
        'Handles price negotiations'
      ]
    }
  ], []);

  // Features data
  const features = useMemo(() => [
    { icon: FileSpreadsheet, text: 'Works with Google Sheets' },
    { icon: Globe, text: 'Speaks Hindi, Tamil, Marathi' },
    { icon: Zap, text: 'No tech skills needed' }
  ], []);

  // Validate that we have the required data
  if (!steps || steps.length === 0) {
    return (
      <div className="pt-24 pb-12 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Loading...</h1>
          <p className="text-gray-400">Please wait while we load the content.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-12">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden" aria-labelledby="hero-heading">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-ai-blue/10 via-transparent to-ai-purple/10"></div>
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
              <Zap className="w-4 h-4 text-ai-teal mr-2" aria-hidden="true" />
              <span className="text-sm font-medium text-ai-teal">How It Works</span>
            </motion.div>

            <h1 id="hero-heading" className="text-4xl lg:text-6xl font-heading font-bold mb-6">
              From Lead to Sale: <span className="text-gradient">How Dare XAI Works</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              A simple 3-step process that turns your missed calls and delayed responses 
              into automated, intelligent conversations that convert leads 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-20" aria-labelledby="how-it-works-heading">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Process Overview */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 id="how-it-works-heading" className="text-3xl lg:text-4xl font-bold text-white mb-8">
              The <span className="text-gradient">3-Step Process</span>
            </h2>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Desktop Timeline */}
            <div className="hidden lg:block">
              <div className="relative" role="img" aria-label="3-step process timeline">
                {/* Timeline Line */}
                <div 
                  className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-emerald-500 to-orange-500 rounded-full transform -translate-y-1/2"
                  aria-hidden="true"
                ></div>
                
                {/* Steps */}
                <div className="grid grid-cols-3 gap-8 relative z-20" role="list">
                  {steps.slice(0, 3).map((step, index) => (
                    <motion.div
                      key={step.id}
                      className="text-center"
                      role="listitem"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      {/* Step Icon */}
                      <motion.div
                        className={`relative mx-auto w-20 h-20 glass-card rounded-full flex items-center justify-center mb-6 hover-lift`}
                        whileHover={{ scale: 1.1 }}
                        aria-label={`Step ${step.id}: ${step.title}`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-20 rounded-full blur-lg`} aria-hidden="true"></div>
                        <step.icon className="w-8 h-8 text-white relative z-10" aria-hidden="true" />
                        <div 
                          className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-primary text-white text-xs font-bold rounded-full flex items-center justify-center"
                          aria-label={`Step number ${step.id}`}
                        >
                          {step.id}
                        </div>
                      </motion.div>

                      {/* Content */}
                      <div className="glass-card p-6 rounded-xl hover-lift">
                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">{step.description}</p>
                        
                        {/* Business Benefits */}
                        <div className="text-center mt-4 p-3 bg-ai-blue/10 rounded-lg">
                          <p className="text-ai-blue text-xs font-medium">
                            {step.id === 1 && "We map your current lead flow and identify bottlenecks"}
                            {step.id === 2 && "Custom AI trained on your business language and processes"}
                            {step.id === 3 && "Live agents start converting leads into bookings immediately"}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-center space-x-2 text-xs">
                              <CheckCircle className="w-3 h-3 text-ai-teal flex-shrink-0" />
                              <span className="text-gray-400">{detail}</span>
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
            <div className="lg:hidden space-y-8" role="list" aria-label="3-step process for mobile">
              {steps.slice(0, 3).map((step, index) => (
                <motion.div
                  key={step.id}
                  className="relative"
                  role="listitem"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Connector Line */}
                  {index < 2 && (
                    <div 
                      className="absolute left-10 top-20 w-0.5 h-16 bg-gradient-to-b from-ai-blue to-ai-purple opacity-30"
                      aria-hidden="true"
                    ></div>
                  )}

                  <div className="flex items-start space-x-6">
                    {/* Step Icon */}
                    <motion.div
                      className="relative w-20 h-20 glass-card rounded-full flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-20 rounded-full blur-lg`}></div>
                      <step.icon className="w-8 h-8 text-white relative z-10" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {step.id}
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 glass-card p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">{step.description}</p>
                      
                      {/* Business Benefits */}
                      <div className="mb-4 p-3 bg-ai-blue/10 rounded-lg">
                        <p className="text-ai-blue text-xs font-medium">
                          {step.id === 1 && "We map your current lead flow and identify bottlenecks"}
                          {step.id === 2 && "Custom AI trained on your business language and processes"}
                          {step.id === 3 && "Live agents start converting leads into bookings immediately"}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center space-x-2 text-xs">
                            <CheckCircle className="w-3 h-3 text-ai-teal flex-shrink-0" />
                            <span className="text-gray-400">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-ai-blue/5 to-ai-purple/5" aria-labelledby="features-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 id="features-heading" className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Why Businesses <span className="text-gradient">Choose Dare XAI</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto" role="list">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 rounded-xl text-center hover-lift"
                role="listitem"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{feature.text}</h3>
                <div className="w-12 h-1 bg-gradient-primary rounded-full mx-auto"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="glass-card p-12 rounded-3xl text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 id="cta-heading" className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to See This in <span className="text-gradient">Action?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Book a free 30-minute demo where we'll show you exactly how this works 
              for your specific business and industry.
            </p>
            <motion.button
              className="px-10 py-5 bg-gradient-primary text-white rounded-xl font-bold text-lg hover:shadow-glow-blue transition-all duration-300 flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenBooking}
              aria-label="Book a free demo to see Dare XAI in action"
            >
              Book Free Demo to See It in Action
              <ArrowRight className="ml-3 w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={handleCloseBooking} 
      />
    </main>
  );
};

export default HowItWorksPage;