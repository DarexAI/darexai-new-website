import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';
import BookingModal from './shared/BookingModal';

const CTA: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const benefits = [
    { icon: Sparkles, text: 'Setup in under 5 minutes' },
    { icon: Shield, text: 'Enterprise-grade security' },
    { icon: Clock, text: '30-day free trial' }
  ];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-primary/10 via-transparent to-cyan-electric/10"></div>
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-purple-primary rounded-full opacity-20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-electric rounded-full opacity-20 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="glass-card p-12 lg:p-16 rounded-3xl text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center glass px-6 py-3 rounded-full mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-green-neon mr-2" />
            <span className="text-sm font-medium text-green-neon">Limited Time Offer</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Can Someone Call My Leads for Me? <span className="text-gradient">Yes. That's What We Do.</span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop losing leads to competitors. Our AI agents work 24/7 to call, follow up, 
            and book appointments so you can focus on closing deals.
          </p>

          {/* Benefits */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <benefit.icon className="w-5 h-5 text-green-neon" />
                <span className="text-gray-300">{benefit.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              className="group px-10 py-5 bg-gradient-primary text-white rounded-xl font-bold text-lg hover:shadow-glow-purple transition-all duration-300 pulse-glow flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookingOpen(true)}
            >
              Book Free Strategy Demo
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>

            <motion.button
              className="px-10 py-5 glass text-white rounded-xl font-bold text-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See Case Studies
            </motion.button>
          </div>

          <p className="text-sm text-gray-400 mt-8">
            No setup fees • 5-7 days implementation • Results in 2 weeks
          </p>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </section>
  );
};

export default CTA;