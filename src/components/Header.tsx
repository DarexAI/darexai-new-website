import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';
import BookingModal from './shared/BookingModal';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface NavItem {
  name: string;
  href: string;
  external?: boolean;
}

interface HeaderProps {
  user?: User;
}

const Header: React.FC<HeaderProps> = () => {
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

  const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Industries', href: '/industries' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Lead gen Agent', href: 'https://leadgen.darexai.com/', external: true },
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 h-16 sm:h-20 ${
          isScrolled 
            ? 'glass backdrop-blur-xl py-2 shadow-lg border-b border-white/10' 
            : 'bg-transparent py-3 sm:py-4'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-10 sm:h-12">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex-shrink-0 z-50"
              onClick={() => handleNavClick('Logo', '/')}
            >
              <motion.div 
                className="flex items-center space-x-2 sm:space-x-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {/* Logo Image */}
                <div className="relative flex-shrink-0">
                  <img 
                    src="/image.png" 
                    alt="Dare xAI Logo" 
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                    loading="eager"
                    decoding="async"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-ai-blue opacity-20 rounded-full blur-lg"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                {/* Logo Text */}
                <span className="text-xl sm:text-2xl font-heading font-bold text-gradient whitespace-nowrap">
                  Dare xAI
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-8 h-full">
              <div className="flex items-center space-x-6 xl:space-x-8">
                {navItems.map((item) => (
                  item.external ? (
                    <a 
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleNavClick(item.name, item.href)}
                    >
                      <motion.div
                        className="transition-colors duration-300 relative group font-medium text-base text-gray-300 hover:text-white"
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {item.name}
                        <motion.span 
                          className="absolute -bottom-1 left-0 h-0.5 bg-gradient-primary transition-all duration-300 w-0 group-hover:w-full"
                        />
                      </motion.div>
                    </a>
                  ) : (
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
                  )
                ))}
              </div>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
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
                className="lg:hidden absolute top-full left-0 right-0 glass rounded-b-xl overflow-hidden border-t border-white/10 mx-2 sm:mx-4 mt-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {/* Mobile Navigation */}
                  <nav className="space-y-2 sm:space-y-3">
                    {navItems.map((item) => (
                      item.external ? (
                        <a
                          key={item.name}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors duration-300 text-center font-medium text-sm sm:text-base text-gray-300 hover:text-white hover:bg-white/5"
                          onClick={() => {
                            handleNavClick(item.name, item.href);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`block px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors duration-300 text-center font-medium text-sm sm:text-base ${
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
                      )
                    ))}
                  </nav>

                  {/* Mobile Get Started Button */}
                  <div className="pt-3 sm:pt-4 border-t border-white/10">
                    <motion.button
                      onClick={() => {
                        handleGetStartedClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 text-sm sm:text-base"
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