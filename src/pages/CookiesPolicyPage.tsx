import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Info, ShieldCheck, Globe, Mail } from 'lucide-react';

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="pt-24 pb-12 bg-dark min-h-screen text-white">
      <section className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <motion.div
          className="glass-card p-12 rounded-3xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6 text-gradient">Cookie Policy</h1>
          <p className="text-gray-300 mb-8 leading-relaxed text-lg">
            Last updated: July 17, 2025
          </p>

          {/* What are Cookies */}
          <div className="flex items-start space-x-4 mb-8">
            <Cookie className="w-6 h-6 text-ai-blue mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">What Are Cookies?</h2>
              <p className="text-gray-400 leading-relaxed">
                Cookies are small text files stored on your device by websites to enhance user experience and ensure proper functionality.
              </p>
            </div>
          </div>

          {/* Our Use of Cookies */}
          <div className="flex items-start space-x-4 mb-8">
            <Info className="w-6 h-6 text-ai-teal mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">How DareXAI Uses Cookies</h2>
              <p className="text-gray-400 leading-relaxed">
                DareXAI uses only essential cookies that help our website and booking platform operate correctly and securely. We do not use cookies to track personal activity across other websites or for marketing purposes.
              </p>
            </div>
          </div>

          {/* Security */}
          <div className="flex items-start space-x-4 mb-8">
            <ShieldCheck className="w-6 h-6 text-ai-emerald mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
              <p className="text-gray-400 leading-relaxed">
                All information collected via cookies is stored and transmitted securely. We do not sell or share any cookie data with third parties.
              </p>
            </div>
          </div>

          {/* Managing Cookies */}
          <div className="flex items-start space-x-4 mb-8">
            <Globe className="w-6 h-6 text-ai-indigo mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Managing Cookies</h2>
              <p className="text-gray-400 leading-relaxed">
                Most web browsers allow you to manage your cookie preferences. You can usually modify your settings to refuse cookies or delete them from your device at any time. Please note that disabling cookies may affect your experience on our website.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-start space-x-4">
            <Mail className="w-6 h-6 text-ai-purple mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Contact</h2>
              <p className="text-gray-400 leading-relaxed">
                For any questions regarding cookies or this policy, please contact us at <a href="mailto:support@darexai.com" className="text-ai-blue underline">support@darexai.com</a>.
              </p>
            </div>
          </div>

          <p className="mt-12 text-gray-500 text-sm">
            Last updated: July 17, 2025
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default CookiePolicyPage;