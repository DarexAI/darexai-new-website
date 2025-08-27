import React, { useState } from 'react';
import { useSEO, useBreadcrumbs } from '../hooks/useSEO';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Stethoscope, 
  GraduationCap, 
  ShoppingBag, 
  Scissors, 
  Truck, 
  CreditCard,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import BookingModal from '../components/shared/BookingModal';

interface Industry {
  id: string;
  name: string;
  icon: React.ElementType;
  headline: string;
  painPoint: string;
  solution: string;
  results: string[];
  color: string;
}

const IndustriesPage: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // SEO optimization
  useSEO({
    title: 'AI Automation Solutions by Industry | Real Estate, Healthcare, Education | Dare XAI',
    description: 'Discover how Dare XAI\'s AI automation transforms real estate, healthcare, education, e-commerce, logistics, and financial services. Industry-specific voice calling and WhatsApp automation.',
    keywords: 'AI automation by industry, real estate automation, healthcare AI, education technology, e-commerce automation, logistics AI, financial services automation, voice calling by industry, WhatsApp automation solutions',
    canonical: 'https://darexai.com/industries'
  });

  // Breadcrumb navigation
  useBreadcrumbs([
    { name: 'Home', href: '/' },
    { name: 'Industries', href: '/industries' }
  ]);

  const industries: Industry[] = [
    {
      id: 'real-estate',
      name: 'Real Estate',
      icon: Building2,
      headline: 'Turn Site Visits into Sales',
      painPoint: 'Most leads go cold before you can call back.',
      solution: 'Voice + WhatsApp agent replies instantly, 24x7, in regional language.',
      results: ['+210% qualified leads', '-50% missed calls', '3x more site visits'],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: Stethoscope,
      headline: 'Never Miss Another Appointment',
      painPoint: 'Patients call after hours and book elsewhere.',
      solution: 'AI handles appointment booking, reminders, and basic queries 24/7.',
      results: ['+85% appointment bookings', '-60% no-shows', '100% after-hours coverage'],
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'edtech',
      name: 'EdTech / Coaching',
      icon: GraduationCap,
      headline: 'Convert More Demo Requests',
      painPoint: 'Students inquire but don\'t show up for demos.',
      solution: 'Instant follow-up with course details and demo scheduling in their language.',
      results: ['+70% demo signups', '+45% course enrollments', '24/7 student support'],
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 'd2c-brands',
      name: 'D2C Brands',
      icon: ShoppingBag,
      headline: 'Scale Customer Support Without Hiring',
      painPoint: 'WhatsApp queries pile up, customers wait hours for responses.',
      solution: 'AI handles order tracking, product queries, and support in multiple languages.',
      results: ['-90% response time', '+150% customer satisfaction', '80% queries automated'],
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 'local-services',
      name: 'Local Services',
      icon: Scissors,
      headline: 'Book More Appointments Automatically',
      painPoint: 'Customers call when you\'re busy with clients.',
      solution: 'AI books appointments, sends reminders, and handles rescheduling.',
      results: ['+120% bookings', '-40% cancellations', '100% availability'],
      color: 'from-orange-500 to-amber-600'
    },
    {
      id: 'logistics',
      name: 'Logistics / Delivery',
      icon: Truck,
      headline: 'Automate Delivery Updates',
      painPoint: 'Customers constantly call asking "Where\'s my order?"',
      solution: 'Automated delivery updates via WhatsApp and voice calls.',
      results: ['-70% support calls', '+95% delivery satisfaction', 'Real-time tracking'],
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'financial-services',
      name: 'Financial Services',
      icon: CreditCard,
      headline: 'Qualify Leads While You Sleep',
      painPoint: 'Loan and insurance leads need immediate attention.',
      solution: 'AI qualifies leads, collects documents, and schedules meetings.',
      results: ['+180% lead qualification', '+65% conversion rate', '24/7 lead capture'],
      color: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <div className="pt-24 pb-12">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
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
              <Building2 className="w-4 h-4 text-ai-teal mr-2" />
              <span className="text-sm font-medium text-ai-teal">Industries We Help</span>
            </motion.div>

            <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
              If Your Business Depends on <span className="text-gradient">Calls, WhatsApp, and Follow-Ups</span> — You're in the Right Place
            </h1>
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              See how businesses like yours are automating customer interactions and growing revenue 
              without hiring more staff or changing their existing systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.id}
                className="glass-card rounded-2xl overflow-hidden hover-lift group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Header */}
                <div className={`p-6 bg-gradient-to-r ${industry.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <industry.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{industry.name}</h3>
                      <p className="text-white/80 text-sm">Automation Solutions</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="text-lg font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
                    {industry.headline}
                  </h4>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        <span className="font-medium text-red-400">Problem:</span> {industry.painPoint}
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        <span className="font-medium text-green-400">Solution:</span> {industry.solution}
                      </p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="space-y-2 mb-6">
                    <h5 className="text-white font-medium text-sm mb-3">Real Results:</h5>
                    {industry.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-ai-teal flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{result}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.button
                    className="w-full px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow-blue transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsBookingOpen(true)}
                  >
                    See How It Works
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="glass-card p-12 rounded-3xl text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Don't See Your Industry? <span className="text-gradient">We Can Help Anyway</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              If your business gets calls, WhatsApp messages, or needs follow-ups, 
              our AI can automate it. Let's discuss your specific needs.
            </p>
            <motion.button
              className="px-10 py-5 bg-gradient-primary text-white rounded-xl font-bold text-lg hover:shadow-glow-blue transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookingOpen(true)}
            >
              Book Free Strategy Demo
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </div>
  );
};

export default IndustriesPage;