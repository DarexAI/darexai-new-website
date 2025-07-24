import React from 'react';
import HeroSection from '../components/HeroSection';
import EnhancedFeatures from '../components/enhanced/EnhancedFeatures';
import LiveDashboard from '../components/LiveDashboard';
import InteractiveDemo from '../components/InteractiveDemo';
import MarketingTools from '../components/MarketingTools';
import ProcessTimeline from '../components/ProcessTimeline';
import BenefitsGrid from '../components/BenefitsGrid';
import EnhancedStats from '../components/enhanced/EnhancedStats';
import SocialProof from '../components/SocialProof';
import Newsletter from '../components/Newsletter';
import CTA from '../components/CTA';

const HomePage: React.FC = () => {
  return (
    <div className="overflow-x-hidden smooth-scroll">
      <HeroSection />
      <EnhancedFeatures />
      <LiveDashboard />
      <InteractiveDemo />
      <MarketingTools />
      <ProcessTimeline />
      <BenefitsGrid />
      <EnhancedStats />
      <SocialProof />
      <Newsletter />
      <CTA />
    </div>
  );
};

export default HomePage;