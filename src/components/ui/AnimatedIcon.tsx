import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  Icon: LucideIcon;
  animation?: 'pulse' | 'bounce' | 'spin' | 'float' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  Icon,
  animation = 'pulse',
  size = 'md',
  color = 'text-purple-primary',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const animations = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: { duration: 2, repeat: Infinity }
    },
    bounce: {
      y: [0, -10, 0],
      transition: { duration: 1.5, repeat: Infinity }
    },
    spin: {
      rotate: 360,
      transition: { duration: 2, repeat: Infinity, ease: "linear" }
    },
    float: {
      y: [0, -15, 0],
      x: [0, 5, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    glow: {
      filter: [
        'drop-shadow(0 0 5px currentColor)',
        'drop-shadow(0 0 15px currentColor)',
        'drop-shadow(0 0 5px currentColor)'
      ],
      transition: { duration: 2, repeat: Infinity }
    }
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={animations[animation]}
    >
      <Icon className={`${sizeClasses[size]} ${color}`} />
    </motion.div>
  );
};

export default AnimatedIcon;