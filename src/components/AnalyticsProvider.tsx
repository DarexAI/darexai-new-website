import React, { createContext, useContext, useEffect, useState } from 'react';

interface AnalyticsContextType {
  isGDPRCompliant: boolean;
  hasConsent: boolean;
  requestConsent: () => void;
  revokeConsent: () => void;
  trackingEnabled: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const [hasConsent, setHasConsent] = useState(false);
  const [showConsentBanner, setShowConsentBanner] = useState(false);

  useEffect(() => {
    // Check for existing consent
    const consent = localStorage.getItem('analytics_consent');
    const consentDate = localStorage.getItem('analytics_consent_date');
    
    if (consent === 'granted' && consentDate) {
      const consentAge = Date.now() - parseInt(consentDate);
      const oneYear = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
      
      if (consentAge < oneYear) {
        setHasConsent(true);
      } else {
        // Consent expired, request again
        setShowConsentBanner(true);
      }
    } else if (consent === null) {
      // First visit, show consent banner
      setShowConsentBanner(true);
    }
  }, []);

  const requestConsent = () => {
    setHasConsent(true);
    setShowConsentBanner(false);
    localStorage.setItem('analytics_consent', 'granted');
    localStorage.setItem('analytics_consent_date', Date.now().toString());
  };

  const revokeConsent = () => {
    setHasConsent(false);
    localStorage.setItem('analytics_consent', 'denied');
    localStorage.removeItem('analytics_consent_date');
    
    // Clear existing analytics data
    localStorage.removeItem('analytics_data');
    localStorage.removeItem('analytics_visited');
  };

  const value: AnalyticsContextType = {
    isGDPRCompliant: true,
    hasConsent,
    requestConsent,
    revokeConsent,
    trackingEnabled: hasConsent,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
      
      {/* GDPR Consent Banner */}
      {showConsentBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-dark-card border-t border-glass-border">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex-1 text-gray-300 text-sm">
              <p>
                We use cookies and analytics to improve your experience and understand how you use our site. 
                Your data is processed in accordance with our{' '}
                <a href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</a> and{' '}
                <a href="/cookies" className="text-cyan-400 hover:underline">Cookie Policy</a>.
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConsentBanner(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                Decline
              </button>
              <button
                onClick={requestConsent}
                className="px-6 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-glow-purple transition-all duration-300"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </AnalyticsContext.Provider>
  );
};

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  return context;
};