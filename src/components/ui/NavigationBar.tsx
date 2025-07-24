import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Search, 
  Sun, 
  Moon, 
  User, 
  Settings, 
  LogOut,
  ChevronDown,
  Cpu
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import logoImage from '../../assets/small.jpg'; // Adjust the path based on your logo location

interface NavigationBarProps {
  darkMode?: boolean;
  onThemeToggle?: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onSearch?: (query: string) => void;
}

const NAVBAR_HEIGHT = 64; // px - fixed height

const NavigationBar: React.FC<NavigationBarProps> = ({
  darkMode = true,
  onThemeToggle,
  user,
  onSearch
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 h-[${NAVBAR_HEIGHT}px] transition-all duration-300 flex items-center ${
        isScrolled ? 'glass backdrop-blur-glass py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        height: NAVBAR_HEIGHT,
        // ensure fixed height with padding inside
        paddingTop: isScrolled ? '8px' : '16px',
        paddingBottom: isScrolled ? '8px' : '16px',
      }}
    >
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center h-full">
        {/* Logo */}
        <Link to="/">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img 
              src={logoImage} 
              alt="DareXAI Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-2xl font-heading font-bold text-gradient">Dare XAI</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link key={item.name} to={item.href}>
              <motion.div
                className={`text-gray-300 hover:text-white transition-colors duration-300 relative group ${
                  location.pathname === item.href ? 'text-white' : ''
                }`}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-primary transition-all duration-300 ${
                  location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <div className="hidden md:block flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search or type a command..."
              className="w-full pl-10 pr-4 py-2 glass rounded-glass text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-all duration-300"
            />
          </form>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          {onThemeToggle && (
            <motion.button
              onClick={onThemeToggle}
              className="p-2 glass rounded-glass hover:bg-white hover:bg-opacity-10 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-400" />
              )}
            </motion.button>
          )}

          {/* User Profile */}
          {user && (
            <div className="relative">
              <motion.button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 glass rounded-glass hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-gray-300" />
                )}
                <span className="hidden md:block text-gray-300">{user.name}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </motion.button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 glass rounded-glass shadow-glass overflow-hidden"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-3 border-b border-glass-border">
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-gray-400 text-sm">{user.email}</div>
                    </div>
                    <div className="py-1">
                      <a
                        href="#profile"
                        className="flex items-center px-3 py-2 text-gray-300 hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </a>
                      <a
                        href="#settings"
                        className="flex items-center px-3 py-2 text-gray-300 hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </a>
                      <button
                        className="flex items-center w-full px-3 py-2 text-gray-300 hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/contact">
              <Button variant="primary" size="md">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden mt-4 glass rounded-glass overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search or type a command..."
                  className="w-full pl-10 pr-4 py-2 glass rounded-glass text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                />
              </form>

              {/* Mobile Navigation */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block text-gray-300 hover:text-white transition-colors duration-300 ${
                    location.pathname === item.href ? 'text-white' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4">
                <Link to="/contact">
                  <Button variant="primary" fullWidth onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavigationBar;
