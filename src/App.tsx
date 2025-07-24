import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
// Import pages
import EnhancedHomePage from './components/enhanced/EnhancedHomePage';
import AboutPage from './pages/AboutPage';
import IndustriesPage from './pages/IndustriesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CookiePolicyPage from './pages/CookiesPolicyPage';
// Import components
import Header from './components/Header';
import Footer from './components/Footer';
import { AnalyticsProvider } from './components/AnalyticsProvider';
import { GamificationProvider } from './components/gamification/GamificationSystem';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simple loading simulation
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-ai-blue border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <AnalyticsProvider>
      <GamificationProvider>
        <Router>
          <div className="min-h-screen bg-dark text-white">
            <Header
              onSearch={(query) => console.log('Search:', query)}
            />
            
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={<EnhancedHomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/industries" element={<IndustriesPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
                <Route path="/cookies" element={<CookiePolicyPage />} />
              </Routes>
            </motion.main>

            <Footer />
          </div>
        </Router>
      </GamificationProvider>
    </AnalyticsProvider>
  );
}

export default App;