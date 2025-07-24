import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import { useParallaxScroll } from '../../hooks/useScrollAnimation';

interface StatItem {
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
  color: string;
  description: string;
}

const AnimatedCounter: React.FC<{ 
  value: number; 
  duration: number; 
  suffix?: string; 
  prefix?: string;
}> = ({ value, duration, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};

const EnhancedStats: React.FC = () => {
  const parallaxOffset = useParallaxScroll(0.2);

  const stats: StatItem[] = [
    {
      value: '500',
      suffix: '+',
      label: 'Enterprise Clients',
      color: 'text-purple-primary',
      description: 'Fortune 500 companies trust our platform'
    },
    {
      value: '10',
      suffix: 'M+',
      label: 'Tasks Automated Daily',
      color: 'text-cyan-electric',
      description: 'Processes running 24/7 across all clients'
    },
    {
      value: '99.9',
      suffix: '%',
      label: 'Uptime Guarantee',
      color: 'text-green-neon',
      description: 'Enterprise-grade reliability and performance'
    },
    {
      value: '40',
      suffix: '%',
      label: 'Average Cost Savings',
      color: 'text-purple-primary',
      description: 'Typical operational cost reduction'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-primary/5 via-transparent to-cyan-electric/5"
          style={{ y: parallaxOffset }}
        />
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
              y: -parallaxOffset
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of companies already transforming their operations with Dare XAI
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal 
              key={index} 
              direction="up" 
              delay={index * 0.1}
              className="text-center group"
            >
              <motion.div
                className="glass-card p-8 rounded-2xl hover-lift relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {/* Animated background glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br from-${stat.color.split('-')[1]}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <motion.div
                    className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-4 group-hover:glow-purple transition-all duration-300`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <AnimatedCounter 
                      value={parseInt(stat.value)} 
                      duration={2}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </motion.div>
                  
                  <div className="text-gray-300 text-sm lg:text-base font-medium mb-2">
                    {stat.label}
                  </div>
                  
                  <motion.div 
                    className="text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {stat.description}
                  </motion.div>
                </div>

                {/* Particle effects on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-${stat.color.split('-')[1]} rounded-full`}
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        y: [0, -20, -40],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Enhanced Client Logos */}
        <ScrollReveal direction="up" delay={0.5} className="mt-20 text-center">
          <p className="text-gray-400 mb-8">Powering automation for leading companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {['TechCorp', 'InnovateLabs', 'FutureScale', 'DataDriven', 'AIFirst', 'CloudMax'].map((company, index) => (
              <motion.div
                key={index}
                className="text-2xl font-bold text-gray-500 hover:text-white transition-colors duration-300 cursor-pointer"
                whileHover={{ 
                  scale: 1.1, 
                  textShadow: '0 0 10px rgba(255,255,255,0.5)' 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {company}
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default EnhancedStats;