import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Github, Twitter, Linkedin, Mail, Send, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
 const [error, setError] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Pages',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Industries', href: '/industries' },
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Contact', href: '/contact' },
        { name: 'Book Demo', href: '/contact' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'WhatsApp', href: 'https://wa.me/919119267828', external: true },
        { name: 'Email Support', href: 'mailto:hello@darexai.com', external: true },
        { name: 'Support', href: 'mailto:support@darexai.com', external: true }
      ]
    }
  ];

  const socialLinks = [
    { 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/company/dare-xai/', 
      label: 'LinkedIn',
      color: 'hover:text-blue-400'
    },
    { 
      icon: Twitter, 
      href: 'https://x.com/dare_xai', 
      label: 'Twitter',
      color: 'hover:text-cyan-400'
    },
    { 
      icon: Github, 
      href: 'https://github.com/DarexAI-AI-Startup', 
      label: 'GitHub',
      color: 'hover:text-gray-300'
    },
    { 
      icon: Mail, 
      href: 'mailto:darexai06@gmail.com', 
      label: 'Email',
      color: 'hover:text-green-400'
    }
  ];

const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Insert email into Supabase table
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email: email.trim().toLowerCase() }]);

    setIsSubmitting(false);

    if (error) {
      if (error.code === '23505') {
        // 23505 is unique violation error (email already subscribed)
        setError('This email is already subscribed.');
      } else {
        setError('Failed to subscribe. Please try again later.');
      }
      return;
    }

    setIsSubscribed(true);
    setEmail('');

    // Clear success message after 5 seconds
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0D1117] to-[#161B22] border-t border-gray-800">
      {/* Cyber Glow Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-10"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0, 255, 255, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="md:col-span-2 lg:col-span-1 text-center md:text-left">
              <Link to="/" className="inline-block">
                <motion.div 
                  className="flex items-center justify-center md:justify-start space-x-2 sm:space-x-3 mb-4 sm:mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="relative">
                    <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-ai-blue" />
                    <motion.div 
                      className="absolute inset-0 bg-ai-blue opacity-20 rounded-full blur-lg"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <span className="text-2xl sm:text-3xl font-heading font-bold text-gradient">Dare XAI</span>
                </motion.div>
              </Link>
              
              <p className="text-[#E6EDF3] text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed max-w-md mx-auto md:mx-0">
                Transforming enterprises with intelligent automation. 
                Experience the future of business operations today.
              </p>

              <div className="flex justify-center md:justify-start space-x-3 sm:space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 sm:p-3 glass rounded-lg text-gray-400 ${social.color} transition-all duration-300 group`}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -2,
                      boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <motion.div
                      className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-20 rounded-lg blur-sm"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="text-center md:text-left">
                <h3 className="text-white font-heading font-semibold text-lg mb-6">
                  {section.title}
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <motion.li 
                      key={linkIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                    >
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#E6EDF3] opacity-70 hover:opacity-100 hover:text-cyan-400 transition-all duration-300 relative group inline-block text-sm sm:text-base"
                        >
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="relative z-10"
                          >
                            {link.name}
                          </motion.span>
                          <motion.span 
                            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"
                            initial={{ width: 0 }}
                            whileHover={{ width: '100%' }}
                          />
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-[#E6EDF3] opacity-70 hover:opacity-100 hover:text-cyan-400 transition-all duration-300 relative group inline-block text-sm sm:text-base"
                        >
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="relative z-10"
                          >
                            {link.name}
                          </motion.span>
                          <motion.span 
                            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"
                            initial={{ width: 0 }}
                            whileHover={{ width: '100%' }}
                          />
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter Section */}
            <div className="text-center md:text-left">
              <h3 className="text-white font-heading font-semibold text-lg mb-6">
                Stay Updated
              </h3>
              
              <p className="text-[#E6EDF3] mb-4 sm:mb-6 leading-relaxed text-sm">
                Get the latest AI insights and automation trends delivered to your inbox.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-3 sm:space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-3 py-2 sm:py-3 bg-dark-card border border-ai-slate rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-ai-blue focus:ring-2 focus:ring-ai-blue focus:ring-opacity-20 transition-all duration-300 text-sm"
                    disabled={isSubmitting}
                  />
                  <motion.div
                    className="absolute inset-0 bg-cyan-400 opacity-0 rounded-lg blur-sm -z-10"
                    animate={{ opacity: email ? 0.05 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="w-full px-4 py-2 sm:py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-ai-blue/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center relative overflow-hidden text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    // Ripple effect
                    const button = e.currentTarget;
                    const rect = button.getBoundingClientRect();
                    const ripple = document.createElement('span');
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.classList.add('ripple');
                    
                    button.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <Send className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ 
                  opacity: isSubscribed ? 1 : 0, 
                  y: isSubscribed ? 0 : 10,
                  height: isSubscribed ? 'auto' : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                  <span className="text-green-400 text-sm font-medium">
                    Successfully subscribed! Check your inbox.
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="py-4 sm:py-6 lg:py-8 border-t border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-3 md:space-y-0 text-center">
            <div className="text-[#E6EDF3] opacity-70 text-xs sm:text-sm">
              © {currentYear} Dare XAI. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center justify-center space-x-3 sm:space-x-4 lg:space-x-6 text-xs">
              <Link 
                to="/privacy" 
                className="text-[#E6EDF3] opacity-70 hover:opacity-100 hover:text-cyan-400 transition-all duration-300"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-[#E6EDF3] opacity-70 hover:opacity-100 hover:text-cyan-400 transition-all duration-300"
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies" 
                className="text-[#E6EDF3] opacity-70 hover:opacity-100 hover:text-cyan-400 transition-all duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CSS for Ripple Effect */}
      <style jsx>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          animation: ripple-animation 0.6s linear;
          pointer-events: none;
        }

        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;