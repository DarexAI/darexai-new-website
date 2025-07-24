import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Bot,
  MessageSquare,
  Linkedin,
  Twitter,
  Github,
  ChevronDown,
} from 'lucide-react';

import { supabase} from '../utils/supabase';
interface FormData {
  name: string;
  email: string;
  company: string;
  serviceType: string;
  projectScope: string;
  budget: string;
  contactMethod: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    serviceType: '',
    projectScope: '',
    budget: '',
    contactMethod: 'email',
    message: '',
    preferredDate: '',
    preferredTime: ''
  });

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m here to help you get started with Dare XAI. What can I assist you with today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const serviceTypes = [
    { value: 'ai-assistants', label: 'AI Assistants' },
    { value: 'workflow-automation', label: 'Workflow Automation' },
    { value: 'custom-projects', label: 'Custom Projects' },
    { value: 'lead-generation', label: 'Lead Generation' },
    { value: 'consultation', label: 'General Consultation' }
  ];

  // const budgetRanges = [
  //   { value: 'under-10k', label: 'Under $10,000' },
  //   { value: '10k-50k', label: '$10,000 - $50,000' },
  //   { value: '50k-100k', label: '$50,000 - $100,000' },
  //   { value: '100k-500k', label: '$100,000 - $500,000' },
  //   { value: 'over-500k', label: 'Over $500,000' },
  //   { value: 'discuss', label: 'Let\'s discuss' }
  // ];

  // const contactMethods = [
  //   { value: 'email', label: 'Email', icon: Mail },
  //   { value: 'phone', label: 'Phone Call', icon: Phone },
  //   { value: 'video', label: 'Video Call', icon: MessageSquare },
  //   { value: 'in-person', label: 'In-Person Meeting', icon: User }
  // ];

  const quickResponses = [
    'Tell me about your AI assistants',
    'What\'s the pricing for workflow automation?',
    'I need a custom AI solution',
    'How quickly can you get started?',
    'Do you offer free trials?',
    'What industries do you serve?'
  ];

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.company.trim()) errors.company = 'Company is required';
    if (!formData.serviceType) errors.serviceType = 'Please select a service type';
    if (!formData.message.trim()) errors.message = 'Message is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsSubmitting(true);
  setFormErrors({}); // clear previous errors

  // Prepare data to insert - match your Supabase table columns
  const insertData = {
    name: formData.name,
    email: formData.email,
    company: formData.company,
    service_type: formData.serviceType,
    // projectScope is optional (you can send null if empty)
    project_scope: formData.projectScope || null,
    budget: formData.budget || null,
    contact_method: formData.contactMethod || null,
    preferred_date: formData.preferredDate || null,
    preferred_time: formData.preferredTime || null,
    message: formData.message,
    // created_at will be managed by Supabase if you set default to now()
  };

  const { data, error } = await supabase.from('contacts').insert([insertData]);

  setIsSubmitting(false);

  if (error) {
    console.error('Submission error:', error);
    setFormErrors({ message: 'Failed to submit form. Please try again later.' });
  } else {
    setIsSubmitted(true);

    // Optional: reset form data if you want to clear after submission
    setFormData({
      name: '',
      email: '',
      company: '',
      serviceType: '',
      projectScope: '',
      budget: '',
      contactMethod: 'email',
      message: '',
      preferredDate: '',
      preferredTime: ''
    });
  }
};

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: chatInput,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(chatInput),
        sender: 'ai',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (input: string): string => {
    const responses = [
      'That\'s a great question! Our AI assistants can handle up to 85% of customer inquiries automatically. Would you like to schedule a demo?',
      'Our workflow automation typically shows ROI within 3 months. I can connect you with our solutions specialist to discuss your specific needs.',
      'We offer custom AI solutions tailored to your industry. What specific challenges are you looking to solve?',
      'We can typically get you started within 2 weeks. Our rapid deployment process includes setup, training, and go-live support.',
      'Yes! We offer a 30-day free trial for most of our services. Would you like me to set that up for you?',
      'We serve various industries including healthcare, finance, retail, manufacturing, and technology. What industry are you in?'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  if (isSubmitted) {
    return (
      <div className="pt-24 pb-12 min-h-screen flex items-center justify-center">
        <motion.div
          className="glass-card p-12 rounded-3xl text-center max-w-2xl mx-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 bg-success-green rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-heading font-bold text-white mb-4">
            Thank You for <span className="text-gradient">Reaching Out!</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            We've received your message and will get back to you within 24 hours. 
            Our team is excited to help transform your business with AI automation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              onClick={() => setIsSubmitted(false)}
              className="px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow-cyan transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Another Message
            </motion.button>
            <motion.button
              onClick={() => setIsChatOpen(true)}
              className="px-8 py-4 glass text-white rounded-xl font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="mr-2 w-5 h-5" />
              Chat with AI Assistant
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-magenta/10"></div>
          <motion.div
            className="absolute top-20 left-20 w-64 h-64 bg-neon-cyan rounded-full opacity-20 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center glass px-6 py-3 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <MessageSquare className="w-4 h-4 text-neon-cyan mr-2" />
              <span className="text-sm font-medium text-neon-cyan">Get In Touch</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6">
              Let's Build the <span className="text-gradient animate-glow">Future Together</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Ready to transform your business with AI automation? Our experts are here to help you 
              design the perfect solution for your unique needs.
              <br /><br />
              Want to learn more about who we are and what drives us? <a href="/about" className="text-ai-blue hover:text-ai-teal transition-colors duration-300 underline">Read About Us</a>
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              className="glass-card p-8 rounded-3xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-heading font-bold text-white mb-8">
                Tell Us About Your <span className="text-gradient">Project</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        formErrors.name ? 'focus:ring-error-red border-error-red' : 'focus:ring-neon-cyan'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {formErrors.name && (
                      <p className="text-error-red text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        formErrors.email ? 'focus:ring-error-red border-error-red' : 'focus:ring-neon-cyan'
                      }`}
                      placeholder="your.email@company.com"
                    />
                    {formErrors.email && (
                      <p className="text-error-red text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className={`w-full px-4 py-3 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      formErrors.company ? 'focus:ring-error-red border-error-red' : 'focus:ring-neon-cyan'
                    }`}
                    placeholder="Your company name"
                  />
                  {formErrors.company && (
                    <p className="text-error-red text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {formErrors.company}
                    </p>
                  )}
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Service Type *
                  </label>
                  <div className="relative">
                    <select
                      value={formData.serviceType}
                      onChange={(e) => handleInputChange('serviceType', e.target.value)}
                      className={`w-full px-4 py-3 glass rounded-xl text-white focus:outline-none focus:ring-2 transition-all duration-300 appearance-none ${
                        formErrors.serviceType ? 'focus:ring-error-red border-error-red' : 'focus:ring-neon-cyan'
                      }`}
                    >
                      <option value="">Select a service</option>
                      {serviceTypes.map(service => (
                        <option key={service.value} value={service.value} className="bg-dark text-white">
                          {service.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                  {formErrors.serviceType && (
                    <p className="text-error-red text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {formErrors.serviceType}
                    </p>
                  )}
                </div>

                {/* Project Details */}
              

                {/* Contact Preference */}
             

                {/* Calendar Integration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Preferred Time
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                      className="w-full px-4 py-3 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-all duration-300 appearance-none"
                    >
                      <option value="">Select time</option>
                      <option value="morning" className="bg-dark text-white">Morning (9 AM - 12 PM)</option>
                      <option value="afternoon" className="bg-dark text-white">Afternoon (12 PM - 5 PM)</option>
                      <option value="evening" className="bg-dark text-white">Evening (5 PM - 8 PM)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Project Details *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className={`w-full px-4 py-3 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                      formErrors.message ? 'focus:ring-error-red border-error-red' : 'focus:ring-neon-cyan'
                    }`}
                    placeholder="Tell us about your project, challenges you're facing, and what you hope to achieve with AI automation..."
                  />
                  {formErrors.message && (
                    <p className="text-error-red text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-primary text-white rounded-xl font-bold text-lg hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-3 w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Contact Information & AI Chat */}
          <div className="space-y-8">
            {/* Contact Info */}
            <motion.div
              className="glass-card p-8 rounded-3xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-heading font-bold text-white mb-6">
                Get In <span className="text-gradient">Touch</span>
              </h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-neon-cyan bg-opacity-20 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <div className="text-gray-400">hello@darexai.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-neon-magenta bg-opacity-20 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-neon-magenta" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Phone</div>
                    <div className="text-gray-400">+91 9119267828</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-electric-blue bg-opacity-20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-electric-blue" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Office</div>
                    <div className="text-gray-400">India</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-success-green bg-opacity-20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-success-green" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Business Hours</div>
                    <div className="text-gray-400">Mon-Sat 9AM-6PM IST</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-glass-border">
                <div className="text-white font-medium mb-4">Follow Us</div>
                <div className="flex space-x-3">
                  {[
                    { icon: Linkedin, href: 'https://www.linkedin.com/company/dare-xai/', color: 'text-neon-cyan' },
                    { icon: Twitter, href: 'https://x.com/dare_xai', color: 'text-neon-magenta' },
                    { icon: Github, href: 'https://github.com/orgs/DarexAI-AI-Startup/dashboard', color: 'text-electric-blue' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={`p-3 glass rounded-lg ${social.color} hover:bg-white hover:bg-opacity-10 transition-all duration-300`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* AI Chat Assistant */}
            <motion.div
              className="glass-card p-6 rounded-3xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">AI Assistant</div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success-green rounded-full animate-pulse"></div>
                      <span className="text-success-green text-sm">Available 24/7</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className="px-4 py-2 glass rounded-lg text-neon-cyan hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isChatOpen ? 'Minimize' : 'Chat Now'}
                </motion.button>
              </div>

              <AnimatePresence>
                {isChatOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Chat Messages */}
                    <div className="h-64 overflow-y-auto mb-4 space-y-3">
                      {chatMessages.map(message => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs p-3 rounded-lg ${
                              message.sender === 'user'
                                ? 'bg-gradient-primary text-white'
                                : 'glass text-gray-100'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Responses */}
                    <div className="mb-4">
                      <div className="text-gray-400 text-xs mb-2">Quick questions:</div>
                      <div className="flex flex-wrap gap-2">
                        {quickResponses.slice(0, 3).map((response, index) => (
                          <motion.button
                            key={index}
                            onClick={() => {
                              setChatInput(response);
                              sendChatMessage();
                            }}
                            className="px-3 py-1 glass rounded-full text-xs text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {response}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Chat Input */}
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                        placeholder="Ask me anything..."
                        className="flex-1 px-3 py-2 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan text-sm"
                      />
                      <motion.button
                        onClick={sendChatMessage}
                        disabled={!chatInput.trim()}
                        className="px-3 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;