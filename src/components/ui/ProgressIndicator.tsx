import React from 'react';
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  showPercentage?: boolean;
  animated?: boolean;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  size = 'md',
  color = 'bg-purple-primary',
  showPercentage = false,
  animated = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-gray-700 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          className={`h-full ${color} rounded-full relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ 
            duration: animated ? 1 : 0,
            ease: "easeOut"
          }}
        >
          {animated && (
            <motion.div
              className="absolute inset-0 bg-white opacity-30"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      </div>
      {showPercentage && (
        <motion.div
          className="text-right text-sm text-gray-400 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Math.round(clampedProgress)}%
        </motion.div>
      )}
    </div>
  );
};

export default ProgressIndicator;