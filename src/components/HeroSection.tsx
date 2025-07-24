import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
   <section
  id="hero"
  className="
    relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden
    pt-20 sm:pt-24
  "
  style={{ scrollMarginTop: '80px' }}
>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-primary/20 via-dark/80 to-cyan-electric/20"></div>
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '50px 50px',
            }}
          ></div>
        </div>

        {/* Floating Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-purple-primary rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-electric rounded-lg opacity-20 blur-3xl rotate-45"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [45, 225, 45],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Heading */}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="block text-white text-center">AI-Powered</span>
            <span className="block text-gradient text-center">Business Automation</span>
          </motion.h1>

          {/* Subheading - NO top margin on md+ to keep consistent, requires padding top above */}
          <motion.h2 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-300 mb-8 px-4 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Automate Smarter. Scale Faster.
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-sm sm:text-base lg:text-lg text-gray-400 mb-8 sm:mb-12 max-w-xl mx-auto leading-relaxed px-4 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Transform your business operations with intelligent AI automation that works 24/7. 
            From lead generation to customer support, streamline every process and unlock unprecedented growth.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 mb-12 sm:mb-16 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              className="group w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-primary text-white rounded-xl font-bold text-base sm:text-lg hover:shadow-glow-purple transition-all duration-300 flex items-center justify-center relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </motion.button>

            <motion.button
              onClick={() => setIsVideoPlaying(true)}
              className="group w-full sm:w-auto flex items-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 glass text-white rounded-xl font-bold text-base sm:text-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300 justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
            >
              <Play className="mr-3 w-5 h-5" />
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {[
              { title: '10x Faster', subtitle: 'Processing Speed', color: 'text-purple-primary' },
              { title: '95% Reduction', subtitle: 'In Manual Tasks', color: 'text-cyan-electric' },
              { title: '24/7 Operation', subtitle: 'Continuous Automation', color: 'text-green-neon' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="glass-card p-4 sm:p-6 rounded-xl hover-lift text-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10, duration: 0.6, delay: 1.4 + idx * 0.1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                
              >
                <div className={`text-2xl sm:text-3xl font-bold mb-2 ${item.color}`}>
                  {item.title}
                </div>
                <div className="text-gray-300 text-xs sm:text-sm">{item.subtitle}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          animate={{
            borderColor: [
              'rgba(138, 43, 226, 0.5)',
              'rgba(0, 255, 255, 0.5)',
              'rgba(57, 255, 20, 0.5)',
              'rgba(138, 43, 226, 0.5)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;