import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className = '',
  children
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab || tabs[0]?.id);
  
  const currentActiveTab = activeTab || internalActiveTab;

  const handleTabClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };

  const getTabClasses = (tab: Tab, isActive: boolean) => {
    const baseClasses = 'relative flex items-center justify-center space-x-2 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-offset-2 focus:ring-offset-dark';
    
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    const variantClasses = {
      default: isActive 
        ? 'glass text-white border border-glass-border' 
        : 'text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-5',
      pills: isActive 
        ? 'bg-gradient-primary text-white' 
        : 'text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-10',
      underline: isActive 
        ? 'text-white border-b-2 border-electric-blue' 
        : 'text-gray-400 hover:text-white border-b-2 border-transparent'
    };

    const disabledClasses = tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
    const widthClasses = fullWidth ? 'flex-1' : '';

    return `
      ${baseClasses}
      ${sizeClasses[size]}
      ${variantClasses[variant]}
      ${disabledClasses}
      ${widthClasses}
      ${variant === 'default' ? 'rounded-glass' : ''}
      ${variant === 'pills' ? 'rounded-full' : ''}
    `.trim();
  };

  return (
    <div className={className}>
      {/* Tab Navigation */}
      <div className={`flex ${variant === 'underline' ? 'border-b border-glass-border' : ''} ${
        variant === 'default' ? 'glass p-1 rounded-glass' : 'space-x-1'
      }`}>
        {tabs.map((tab) => {
          const isActive = currentActiveTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              className={getTabClasses(tab, isActive)}
              onClick={() => !tab.disabled && handleTabClick(tab.id)}
              disabled={tab.disabled}
              whileHover={{ scale: tab.disabled ? 1 : 1.02 }}
              whileTap={{ scale: tab.disabled ? 1 : 0.98 }}
            >
              {/* Icon */}
              {tab.icon && (
                <span className="flex-shrink-0">
                  {tab.icon}
                </span>
              )}
              
              {/* Label */}
              <span>{tab.label}</span>
              
              {/* Badge */}
              {tab.badge && (
                <span className="ml-2 px-2 py-0.5 bg-electric-blue text-white text-xs rounded-full">
                  {tab.badge}
                </span>
              )}

              {/* Active Indicator for Pills */}
              {variant === 'pills' && isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-primary rounded-full -z-10"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      {children && (
        <motion.div
          key={currentActiveTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default Tabs;