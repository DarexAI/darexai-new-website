import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle, User, Lock, Mail } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="pt-24 pb-12 bg-dark min-h-screen text-white">
      <section className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <motion.div
          className="glass-card p-12 rounded-3xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6 text-gradient">Privacy Policy</h1>
          <p className="text-gray-300 mb-8 leading-relaxed text-lg">
            Effective Date: July 17, 2025
          </p>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Dare XAI ("we", "our", or "us") respects your privacy. This Privacy Policy outlines how we collect, use, and protect your personal data when you visit our website or use our services.
          </p>

          {/* Information We Collect */}
          <div className="flex items-start space-x-4 mb-8">
            <User className="w-6 h-6 text-ai-blue mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We may collect personal data such as:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Name, email address, phone number</li>
                <li>Company and job title</li>
                <li>Lead form inputs, WhatsApp interactions, and demo requests</li>
                <li>Site usage data (for analytics and optimization)</li>
              </ul>
            </div>
          </div>

          {/* How We Use Your Data */}
          <div className="flex items-start space-x-4 mb-8">
            <ShieldCheck className="w-6 h-6 text-ai-teal mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Data</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We use your information to:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4 mb-4">
                <li>Contact you regarding services and proposals</li>
                <li>Deliver and improve our AI automation solutions</li>
                <li>Customize your experience and communication</li>
                <li>Conduct research and reporting internally</li>
              </ul>
              <p className="text-gray-400 leading-relaxed">
                We never sell your data. Your information is only shared with trusted tools or vendors required to deliver our services (e.g., CRM systems, analytics, cloud infra).
              </p>
            </div>
          </div>

          {/* Data Hosting & Security */}
          <div className="flex items-start space-x-4 mb-8">
            <Lock className="w-6 h-6 text-ai-emerald mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">3. Data Hosting & Security</h2>
              <p className="text-gray-400 leading-relaxed">
                All data is stored on secure cloud platforms (e.g., Supabase, AWS, Firebase) with encryption and access control. Your data is protected and never publicly exposed.
              </p>
            </div>
          </div>

          {/* WhatsApp, Voice & API Integrations */}
          <div className="flex items-start space-x-4 mb-8">
            <AlertCircle className="w-6 h-6 text-ai-purple mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">4. WhatsApp, Voice & API Integrations</h2>
              <p className="text-gray-400 leading-relaxed">
                When you opt in for AI-based services, some integrations will use your WhatsApp Business API, telephony APIs, or CRMs. In such cases, your data will flow through those external services — please refer to their policies as well.
              </p>
            </div>
          </div>

          {/* User Rights */}
          <div className="flex items-start space-x-4 mb-8">
            <User className="w-6 h-6 text-ai-indigo mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">5. User Rights</h2>
              <p className="text-gray-400 leading-relaxed">
                You may request access, correction, or deletion of your data anytime by emailing us at <a href="mailto:support@darexai.com" className="text-ai-blue underline">support@darexai.com</a>.
              </p>
            </div>
          </div>

          {/* Changes to This Policy */}
          <div className="flex items-start space-x-4">
            <Mail className="w-6 h-6 text-ai-blue mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
              <p className="text-gray-400 leading-relaxed">
                We may update this Privacy Policy based on operational, legal, or regulatory reasons. The updated version will always be published on this page.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;