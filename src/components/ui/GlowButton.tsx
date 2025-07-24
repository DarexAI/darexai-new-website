import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  glowIntensity?: 'low' | 'medium' | 'high';
  children: React.ReactNode;
}

const GlowButton: React.FC<GlowButtonProps> = ({
  variant = 'primary',
  size = 'md',
  glowIntensity = 'medium',
  children,
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: 'bg-gradient-primary text-white',
    secondary: 'glass text-white border border-glass-border',
    accent: 'bg-gradient-to-r from-cyan-electric to-purple-primary text-white'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const glowIntensities = {
    low: '0 0 10px',
    medium: '0 0 20px',
    high: '0 0 30px'
  };

  return (
    <motion.button
      className={`
        relative font-semibold rounded-xl transition-all duration-300 overflow-hidden
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        boxShadow: isHovered 
          ? `${glowIntensities[glowIntensity]} rgba(160, 32, 240, 0.5)`
          : 'none'
      }}
      {...props}
    >
      {/* Ripple effect container */}
      <span className="relative z-10">{children}</span>
      
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        animate={{
          x: isHovered ? ['0%', '100%'] : '0%',
          opacity: isHovered ? [0, 0.3, 0] : 0
        }}
        transition={{ duration: 0.8 }}
      />
    </motion.button>
  );
};

export default GlowButton;