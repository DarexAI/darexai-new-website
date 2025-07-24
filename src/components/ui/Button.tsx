import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-glass transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gradient-primary text-white hover:shadow-glow-purple focus:ring-neon-purple',
    secondary: 'glass text-white border border-glass-border hover:bg-white hover:bg-opacity-10 focus:ring-electric-blue',
    ghost: 'text-white hover:bg-white hover:bg-opacity-10 focus:ring-electric-blue'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();

  const iconElement = loading ? (
    <Loader2 className={`${iconSizeClasses[size]} animate-spin`} />
  ) : icon ? (
    <span className={iconSizeClasses[size]}>{icon}</span>
  ) : null;

  return (
    <motion.button
      className={classes}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {iconElement && iconPosition === 'left' && (
        <span className={children ? 'mr-2' : ''}>{iconElement}</span>
      )}
      {children}
      {iconElement && iconPosition === 'right' && (
        <span className={children ? 'ml-2' : ''}>{iconElement}</span>
      )}
    </motion.button>
  );
};

export default Button;