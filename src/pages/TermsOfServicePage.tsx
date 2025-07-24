import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, FileText, UserCheck, Globe, Settings, Mail } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="pt-24 pb-12 bg-dark min-h-screen text-white">
      <section className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <motion.div
          className="glass-card p-12 rounded-3xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6 text-gradient">Terms of Service</h1>
          <p className="text-gray-300 mb-8 leading-relaxed text-lg">
            Effective Date: July 17, 2025
          </p>
          <p className="text-gray-300 mb-8 leading-relaxed">
            These Terms of Service ("Terms") govern the use of services provided by Dare XAI ("we", "our", "us"). By engaging with our website or services, you ("Client", "You") agree to the terms below.
          </p>

          {/* Scope of Service */}
          <div className="flex items-start space-x-4 mb-8">
            <FileText className="w-6 h-6 text-ai-blue mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. Scope of Service</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Dare XAI provides AI-powered automation tools, agents, and integrations tailored for sales, marketing, and operations.</li>
                <li>Each project is customized and may involve tools like WhatsApp APIs, voice bots, Google Sheets integrations, or CRM plugins.</li>
              </ul>
            </div>
          </div>

          {/* Project Implementation */}
          <div className="flex items-start space-x-4 mb-8">
            <Settings className="w-6 h-6 text-ai-teal mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">2. Project Implementation</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4 mb-4">
                <li>All deliverables, timelines, and feature sets are scoped uniquely per client.</li>
                <li className="flex items-center"><span className="text-ai-emerald mr-2">🟢</span> Implementation flow, AI prompts, automations, and workflows may vary based on the business needs and available tools.</li>
              </ul>
              <p className="text-gray-400 leading-relaxed">
                Dare XAI handles the initial development and setup. Once deployed and accepted, the infrastructure runs using client-owned APIs, platforms, and integrations.
              </p>
            </div>
          </div>

          {/* Pricing, Add-ons & Maintenance */}
          <div className="flex items-start space-x-4 mb-8">
            <UserCheck className="w-6 h-6 text-ai-purple mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">3. Pricing, Add-ons & Maintenance</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Service fees vary by project size, automation complexity, and tools involved.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                Additional charges apply for:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4 mb-4">
                <li>WhatsApp Business API setup & costs (paid directly by the client to BSP like Gupshup, Twilio, etc.)</li>
                <li>CRM integrations, multilingual voice bot scripting, or sheet automation</li>
                <li>Ongoing changes, prompt tuning, or major redesigns post-deployment</li>
              </ul>
              <p className="text-gray-400 leading-relaxed">
                <span className="text-red-400 mr-2">🚫</span> There are no hidden charges. All fees and expected scope are shared during onboarding or project kickoff.
              </p>
            </div>
          </div>

          {/* Ownership & Access */}
          <div className="flex items-start space-x-4 mb-8">
            <ShieldCheck className="w-6 h-6 text-ai-emerald mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">4. Ownership & Access</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Clients retain full access to their tools, APIs, WhatsApp numbers, CRMs, and lead databases.</li>
                <li>Dare XAI provides automation logic, integration support, and AI design — but does not claim ownership of client systems.</li>
              </ul>
            </div>
          </div>

          {/* Service Limits */}
          <div className="flex items-start space-x-4 mb-8">
            <AlertTriangle className="w-6 h-6 text-amber-500 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">5. Service Limits</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Our AI agents automate tasks based on predefined logic.</li>
                <li>They are not legally liable for incorrect information, missed leads, or miscommunication due to unpredictable user input, external API errors, or network downtime.</li>
              </ul>
            </div>
          </div>

          {/* Termination */}
          <div className="flex items-start space-x-4 mb-8">
            <Globe className="w-6 h-6 text-ai-indigo mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Both parties may terminate the engagement with written notice.</li>
                <li>Post-termination, Dare XAI will revoke access to automation agents, dashboards, and workflows unless otherwise agreed.</li>
              </ul>
            </div>
          </div>

          {/* Liability */}
          <div className="flex items-start space-x-4 mb-8">
            <ShieldCheck className="w-6 h-6 text-ai-blue mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">7. Liability</h2>
              <p className="text-gray-400 leading-relaxed">
                We aim for 99% uptime and smooth operations. However, Dare XAI is not liable for API service outages, platform limits, or client-side integration issues after deployment.
              </p>
            </div>
          </div>

          {/* Dispute Resolution */}
          <div className="flex items-start space-x-4 mb-8">
            <FileText className="w-6 h-6 text-ai-teal mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">8. Dispute Resolution</h2>
              <p className="text-gray-400 leading-relaxed">
                In case of any disputes, we aim to resolve matters amicably. If unresolved, they will be subject to jurisdiction under [your local city/state law].
              </p>
            </div>
          </div>

          {/* Contact Us */}
          <div className="flex items-start space-x-4">
            <Mail className="w-6 h-6 text-ai-purple mt-1" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
              <p className="text-gray-400 leading-relaxed">
                For questions or requests, please email: <a href="mailto:support@darexai.com" className="text-ai-blue underline">support@darexai.com</a>
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default TermsOfServicePage;