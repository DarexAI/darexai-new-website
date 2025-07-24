import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, Zap, Bot, TrendingUp, Sparkles, X, Calendar, Clock, User, Mail, Building, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import BookingModal from './shared/BookingModal';
import { useNavigate } from 'react-router-dom';

const GeometricShape: React.FC<{ delay: number; duration: number; className: string }> = ({ delay, duration, className }) => (
  <motion.div
    className={`absolute opacity-20 ${className}`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.1, 0.3, 0.1],
      scale: [0.8, 1.2, 0.8],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

const FloatingIcon: React.FC<{ Icon: React.ElementType; delay: number; className: string }> = ({ Icon, delay, className }) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ y: 0, x: 0 }}
    animate={{ 
      y: [-10, -30, -10],
      x: [-5, 5, -5],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <div className="glass p-3 rounded-full glow-purple">
      <Icon className="w-6 h-6 text-ai-blue" />
    </div>
  </motion.div>
);

const Hero: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-primary/20 via-dark/80 to-cyan-electric/20"></div>

        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Geometric Shapes */}
          <GeometricShape delay={0} duration={8} className="w-32 h-32 bg-ai-blue rounded-full top-20 left-10" />
          <GeometricShape delay={1} duration={12} className="w-24 h-24 bg-ai-teal top-40 right-20" />
          <GeometricShape delay={2} duration={10} className="w-40 h-40 bg-ai-emerald rounded-lg bottom-32 left-20 rotate-45" />
          <GeometricShape delay={3} duration={15} className="w-28 h-28 bg-ai-purple bottom-20 right-32" />
          
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        {/* Floating Icons */}
        <FloatingIcon Icon={Bot} delay={0} className="top-32 left-1/4 hidden lg:block" />
        <FloatingIcon Icon={Zap} delay={2} className="top-48 right-1/4 hidden lg:block" />
        <FloatingIcon Icon={TrendingUp} delay={4} className="bottom-48 left-1/3 hidden lg:block" />

        {/* Custom Cursor */}
        <div 
          ref={cursorRef}
          className="fixed w-8 h-8 pointer-events-none z-50 hidden lg:block"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div className="w-full h-full bg-purple-primary rounded-full opacity-30 animate-ping"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-6xl mx-auto flex flex-col items-center justify-center"
          >
            <span className="block text-white text-center">Let AI Handle Your Sales Ops —</span>
            <span className="block text-gradient text-center">So You Can Focus on Closing</span>
           

            {/* Main Headline - H1 */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-center w-full"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif', fontWeight: 'bold' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="block text-white text-center">Automate Smarter.</span>
              <span className="block text-gradient text-center">Scale Faster.</span>
            </motion.h1>

            {/* Supporting Subheadline */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-5xl mx-auto leading-relaxed text-center px-4 w-full"
              style={{ fontFamily: 'Satoshi, system-ui, sans-serif', fontWeight: 'normal' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Let AI handle your calls, WhatsApp replies, and follow-ups — so you can grow faster without growing your team.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                onClick={() => setIsBookingOpen(true)}
                className="group relative w-full sm:w-auto max-w-xs sm:max-w-none px-8 lg:px-10 py-4 lg:py-5 text-white rounded-xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                  animation: 'pulse-border 2s infinite'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10"> Book Free Demo Call</span>
                <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                
                {/* Pulsing border animation */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
                    filter: 'blur(4px)',
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.button>

             <motion.button
      onClick={() => navigate('/industries')}
      className="group relative w-full sm:w-auto max-w-xs sm:max-w-none px-8 lg:px-10 py-4 lg:py-5 text-white rounded-xl font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
        animation: 'pulse-border 2s infinite',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
    >
      <span>🔍 Explore Industries</span>
    </motion.button>
            </motion.div>

            {/* 3D Visualization Preview */}
            <motion.div
              className="relative max-w-5xl mx-auto mb-12 sm:mb-16 w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl relative overflow-hidden mx-4">
                <div className="absolute inset-0 bg-gradient-to-br from-ai-purple/10 via-transparent to-ai-teal/10"></div>
                
                {/* Mock 3D Visualization */}
                <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center">
                  <motion.div 
                    className="text-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ai-blue mb-3">
                      10x
                    </div>
                    <div className="text-gray-300 text-sm sm:text-base">Faster Responses</div>
                  </motion.div>

                  <motion.div 
                    className="text-center"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ai-teal mb-3">
                      95%
                    </div>
                    <div className="text-gray-300 text-sm sm:text-base">Cost Reduction</div>
                  </motion.div>

                  <motion.div 
                    className="text-center"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  >
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ai-emerald mb-3">
                      24/7
                    </div>
                    <div className="text-gray-300 text-sm sm:text-base">Availability</div>
                  </motion.div>

                  <motion.div 
                    className="text-center"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 3 }}
                  >
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ai-purple mb-3">
                      7
                    </div>
                    <div className="text-gray-300 text-sm sm:text-base">Days Setup</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Custom CSS for pulsing border */}
      {/* <style jsx>{`
        @keyframes pulse-border {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
          }
        }
      `}</style> */}
    </>
  );
};

export default Hero;