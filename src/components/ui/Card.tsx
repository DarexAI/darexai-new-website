import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  loading?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  image?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  gradient = false,
  loading = false,
  onClick,
  icon,
  title,
  subtitle,
  image,
}) => {
  const baseClasses = 'glass-card p-6 transition-all duration-300';
  const hoverClasses = hover ? 'hover-lift cursor-pointer' : '';
  const gradientClasses = gradient ? 'border-gradient' : '';
  
  const classes = `
    ${baseClasses}
    ${hoverClasses}
    ${gradientClasses}
    ${className}
  `.trim();

  const cardContent = (
    <>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark bg-opacity-50 rounded-glass">
          <Loader2 className="w-8 h-8 text-electric-blue animate-spin" />
        </div>
      )}
      
      {image && (
        <div className="mb-4 -mx-6 -mt-6">
          <img
            src={image}
            alt={title || 'Card image'}
            className="w-full h-48 object-cover rounded-t-glass"
          />
        </div>
      )}

      {(icon || title || subtitle) && (
        <div className="flex items-start space-x-4 mb-4">
          {icon && (
            <div className="flex-shrink-0 p-3 glass rounded-glass">
              {icon}
            </div>
          )}
          {(title || subtitle) && (
            <div className="flex-1">
              {title && (
                <h3 className="text-lg font-heading font-semibold text-white mb-1">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-gray-400 text-sm">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="relative">
        {children}
      </div>
    </>
  );

  if (onClick) {
    return (
      <motion.div
        className={`${classes} relative overflow-hidden`}
        onClick={onClick}
        whileHover={{ scale: hover ? 1.02 : 1 }}
        whileTap={{ scale: hover ? 0.98 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`${classes} relative overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {cardContent}
    </motion.div>
  );
};

// Card Skeleton Component
export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`glass-card p-6 ${className}`}>
    <div className="animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gray-600 rounded-glass"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-gray-700 rounded"></div>
        <div className="h-3 bg-gray-700 rounded w-5/6"></div>
        <div className="h-3 bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>
  </div>
);

export default Card;