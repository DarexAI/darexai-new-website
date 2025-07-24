import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'text-purple-primary',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} ${color} relative`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 border-2 border-current border-t-transparent rounded-full"></div>
        <motion.div
          className="absolute inset-1 border-2 border-current border-b-transparent rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;