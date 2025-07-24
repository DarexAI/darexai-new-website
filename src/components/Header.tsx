import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Cpu,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';
import BookingModal from './shared/BookingModal';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface HeaderProps {
  user?: User;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const location = useLocation();
  const { trackEvent, trackPageView } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track page views when route changes
  useEffect(() => {
    trackPageView(location.pathname);
    setIsMobileMenuOpen(false);
  }, [location, trackPageView]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Industries', href: '/industries' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleNavClick = (itemName: string, href: string) => {
    trackEvent('navigation', 'nav_click', itemName);
  };

  const handleGetStartedClick = () => {
    setIsBookingOpen(true);
    trackEvent('conversion', 'get_started_click', 'header');
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 h-20 ${
          isScrolled 
            ? 'glass backdrop-blur-xl py-2 shadow-lg border-b border-white/10' 
            : 'bg-transparent py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex-shrink-0 z-50"
              onClick={() => handleNavClick('Logo', '/')}
            >
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative">
                  <Cpu className="w-8 h-8 text-ai-blue" />
                  <motion.div 
                    className="absolute inset-0 bg-ai-blue opacity-20 rounded-full blur-lg"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <span className="text-2xl font-heading font-bold text-gradient">
                  Dare XAI
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-8 h-full">
              <div className="flex items-center space-x-6 xl:space-x-8">
                {navItems.map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.href}
                    onClick={() => handleNavClick(item.name, item.href)}
                  >
                    <motion.div
                      className={`transition-colors duration-300 relative group font-medium text-base ${
                        location.pathname === item.href 
                          ? 'text-white' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {item.name}
                      <motion.span 
                        className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-primary transition-all duration-300 ${
                          location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                        layoutId="activeNavItem"
                      />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              {/* Get Started Button - Desktop */}
              <motion.button
                onClick={handleGetStartedClick}
                className="hidden lg:block px-6 py-2.5 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden text-white p-2 z-50 relative"
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  trackEvent('user_interaction', 'mobile_menu', isMobileMenuOpen ? 'close' : 'open');
                }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="lg:hidden absolute top-full left-0 right-0 glass rounded-b-xl overflow-hidden border-t border-white/10 mx-4 mt-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 space-y-4">
                  {/* Mobile Navigation */}
                  <nav className="space-y-3">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block px-4 py-3 rounded-lg transition-colors duration-300 text-center font-medium text-base ${
                          location.pathname === item.href 
                            ? 'text-white bg-white/10' 
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                        onClick={() => {
                          handleNavClick(item.name, item.href);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Get Started Button */}
                  <div className="pt-4 border-t border-white/10">
                    <motion.button
                      onClick={() => {
                        handleGetStartedClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </>
  );
};

export default Header;