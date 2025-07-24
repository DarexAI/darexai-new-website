import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface StatItem {
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
  color: string;
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

const Stats: React.FC = () => {
  const stats: StatItem[] = [
    {
      value: '500',
      suffix: '+',
      label: 'Enterprise Clients',
      color: 'text-purple-primary'
    },
    {
      value: '10',
      suffix: 'M+',
      label: 'Tasks Automated Daily',
      color: 'text-cyan-electric'
    },
    {
      value: '99.9',
      suffix: '%',
      label: 'Uptime Guarantee',
      color: 'text-green-neon'
    },
    {
      value: '40',
      suffix: '%',
      label: 'Average Cost Savings',
      color: 'text-purple-primary'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-primary/5 via-transparent to-cyan-electric/5"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of companies already transforming their operations with Dare XAI
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="glass-card p-8 rounded-2xl hover-lift"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-4 group-hover:glow-purple transition-all duration-300`}>
                  <AnimatedCounter 
                    value={parseInt(stat.value)} 
                    duration={2}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </div>
                <div className="text-gray-300 text-sm lg:text-base font-medium">
                  {stat.label}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos Placeholder */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-8">Powering automation for leading companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-50">
            {['TechCorp', 'InnovateLabs', 'FutureScale', 'DataDriven', 'AIFirst', 'CloudMax'].map((company, index) => (
              <motion.div
                key={index}
                className="text-2xl font-bold text-gray-500"
                whileHover={{ scale: 1.1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;