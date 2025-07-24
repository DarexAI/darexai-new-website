import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSEO } from '../../hooks/useSEO';
import { Building2, Stethoscope, GraduationCap, ShoppingBag, Truck, CreditCard, ArrowRight, Users, Quote, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingModal from '../shared/BookingModal';

// Import existing components
import Hero from '../Hero';

// How It Works Component
const HowItWorksSection: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const steps = [
    {
      id: 1,
      title: 'Understand Your Sales Process',
      description: 'We analyze your current workflow, lead sources, and customer journey to identify automation opportunities.',
      icon: Users,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      title: 'Train Your Custom AI Agent',
      description: 'We create and train AI agents specifically for your business, using your tone, processes, and knowledge base.',
      icon: Quote,
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 3,
      title: 'Deploy & Watch It Convert',
      description: 'Your AI agents go live, handling calls and messages 24/7 while you track results and revenue growth.',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="how-it-works">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How <span className="text-gradient">It Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From setup to conversion in 3 simple steps
          </p>
        </motion.div>

        {/* 3-Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="glass-card p-8 rounded-2xl text-center hover-lift relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-primary text-white text-sm font-bold rounded-full flex items-center justify-center">
                {step.id}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Industries Preview Component
const IndustriesPreview: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const industries = [
    { 
      name: 'Real Estate', 
      icon: Building2, 
      description: 'Book more site visits via voice bots',
      details: 'AI agents call leads within 60 seconds, qualify prospects, and book site visits automatically.',
      color: 'from-blue-500 to-indigo-600' 
    },
    { 
      name: 'Healthcare', 
      icon: Stethoscope, 
      description: 'Never miss a patient call again',
      details: 'Handle appointment bookings, prescription refills, and patient inquiries 24/7.',
      color: 'from-emerald-500 to-teal-600' 
    },
    { 
      name: 'EdTech / Coaching', 
      icon: GraduationCap, 
      description: 'Convert more demos, faster',
      details: 'Automatically follow up with course inquiries and book demo sessions.',
      color: 'from-purple-500 to-violet-600' 
    },
    { 
      name: 'D2C Brands', 
      icon: ShoppingBag, 
      description: 'Scale customer support without hiring',
      details: 'WhatsApp bots handle order tracking, product queries, and customer support.',
      color: 'from-pink-500 to-rose-600' 
    },
    { 
      name: 'Logistics / Delivery', 
      icon: Truck, 
      description: 'Automate delivery updates',
      details: 'Voice agents handle delivery confirmations and customer queries 24/7.',
      color: 'from-cyan-500 to-blue-600' 
    },
    { 
      name: 'Finance / Loans', 
      icon: CreditCard, 
      description: 'Qualify leads while you sleep',
      details: 'AI agents collect documents, qualify leads, and schedule loan consultations.',
      color: 'from-green-500 to-emerald-600' 
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-r from-ai-blue/5 to-ai-purple/5">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Industries We <span className="text-gradient">Help Grow</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our AI agents are already working 24x7 for businesses like yours:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              className="glass-card p-8 rounded-2xl text-center hover-lift"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${industry.color} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                <industry.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{industry.name}</h3>
              <p className="text-gray-300 mb-2">{industry.description}</p>
              <p className="text-gray-400 text-sm mb-6">{industry.details}</p>
              <Link to="/how-it-works#how-it-works">
                <motion.button
                  className="px-6 py-3 glass text-white rounded-xl font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-300 flex items-center mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  How It Works
                  <ArrowRight className="ml-2 w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/industries">
            <motion.button
              className="px-8 py-4 glass text-white rounded-xl font-bold text-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Industries
            </motion.button>
          </Link>
        </div>

        {/* Booking Modal */}
        <BookingModal 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
        />
      </div>
    </section>
  );
};

// Testimonial Component
const TestimonialSection: React.FC = () => {
  const testimonials = [
    {
      quote: "We were losing leads daily. With Dare XAI, our 24x7 voice agent booked 3x more site visits in 2 weeks.",
      author: "Rajesh Kumar",
      position: "Prime Properties",
      metric: "3x more bookings in 2 weeks",
      avatar: "RK"
    },
    {
      quote: "Dare XAI reduced our clinic's missed calls by 80%. Patients now get instant replies even after 8pm.",
      author: "Dr. Mehta",
      position: "HealthPlus",
      metric: "80% reduction in missed calls",
      avatar: "DM"
    },
    {
      quote: "Our conversion rate doubled after implementing Dare XAI's WhatsApp automation. Students get instant responses.",
      author: "Priya Sharma",
      position: "EduTech Academy",
      metric: "2x conversion rate increase",
      avatar: "PS"
    },
    {
      quote: "24/7 customer support without hiring more staff. Our D2C brand now handles 5x more orders seamlessly.",
      author: "Amit Patel",
      position: "StyleCraft",
      metric: "5x order handling capacity",
      avatar: "AP"
    },
    {
      quote: "AI voice agents transformed our loan processing. We now qualify 3x more leads and close faster than ever.",
      author: "Neha Singh",
      position: "QuickLoans Pro",
      metric: "3x lead qualification rate",
      avatar: "NS"
    },
    {
      quote: "Setup was incredibly smooth. Within a week, our WhatsApp agent was handling 90% of delivery queries automatically.",
      author: "Rohit Gupta",
      position: "FastTrack Logistics",
      metric: "90% query automation",
      avatar: "RG"
    }
  ];

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            🟢 <span className="text-gradient">Real Results</span>
          </h2>
          <p className="text-lg text-gray-300">
            See how businesses like yours are growing with AI automation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="glass-card p-8 rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Quote className="w-8 h-8 text-ai-blue mb-4" />
              <blockquote className="text-xl text-gray-300 mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-white font-bold">– {testimonial.author}</div>
                    <div className="text-gray-400">{testimonial.position}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-ai-teal font-bold text-sm">{testimonial.metric}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.button
            className="px-8 py-4 bg-gradient-primary text-white rounded-xl font-bold text-lg hover:shadow-glow-blue transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsBookingOpen(true)}
          >
            Want results like this? → Book a Demo
          </motion.button>
        </div>
      </div>
    </section>
  );
};

// Conversion Section Component
const ConversionSection: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="glass-card p-12 rounded-3xl text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            You Run Ads. <span className="text-gradient">We Convert The Leads.</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Voice & WhatsApp AI agents that follow up instantly — even after hours.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              'Setup in 5 minutes',
              'No extra hiring',
              'Scales with your business'
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-ai-emerald rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <p className="text-gray-300 text-left">{feature}</p>
              </div>
            ))}
          </div>

          <motion.button
            className="px-10 py-5 bg-gradient-primary text-white rounded-xl font-bold text-lg hover:shadow-glow-blue transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsBookingOpen(true)}
          >
            Start Your Free Strategy Demo
          </motion.button>

          {/* Booking Modal */}
          <BookingModal 
            isOpen={isBookingOpen} 
            onClose={() => setIsBookingOpen(false)} 
          />
        </motion.div>
      </div>
    </section>
  );
};

const EnhancedHomePage: React.FC = () => {
  // SEO optimization for home page
  useSEO({
    title: 'Dare XAI - AI-Powered Business Automation Platform | Automate Smarter, Scale Faster',
    description: 'Transform your business with Dare XAI\'s enterprise AI automation platform. Voice calling, WhatsApp bots, and workflow automation that works 24/7. Book your free demo today.',
    keywords: 'AI automation, business automation, artificial intelligence, voice calling automation, WhatsApp bots, workflow automation, sales automation, lead generation, customer support automation, enterprise AI solutions',
    canonical: 'https://darexai.com/',
    ogTitle: 'Dare XAI - Revolutionary AI Business Automation Platform',
    ogDescription: 'Join 500+ enterprises automating their business processes with AI. Voice calling, WhatsApp automation, and intelligent workflows. Increase productivity by 300%.',
    twitterTitle: 'Dare XAI - AI Business Automation That Actually Works',
    twitterDescription: 'Transform your business with 24/7 AI voice calling and WhatsApp automation. Setup in 5-7 days. Book your free strategy demo.',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Dare XAI",
      "url": "https://darexai.com",
      "description": "AI-powered business automation platform",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://darexai.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "mainEntity": {
        "@type": "Organization",
        "@id": "https://darexai.com/#organization"
      }
    }
  });

  return (
    <div className="overflow-x-hidden">
      {/* Main Content */}
      <Hero />
      <HowItWorksSection />
      <IndustriesPreview />
      <TestimonialSection />
      <ConversionSection />
    </div>
  );
};

export default EnhancedHomePage;