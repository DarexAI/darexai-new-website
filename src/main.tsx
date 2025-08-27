import './polyfills';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializePerformanceOptimizations } from './utils/performanceSEO';
import { initializeAnalyticsSEO } from './utils/analytics-seo';

// Initialize performance optimizations
initializePerformanceOptimizations();

// Initialize analytics and SEO tracking
initializeAnalyticsSEO();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
