import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle,
  AlertCircle,
  Bot,
  MessageSquare,
  Linkedin,
  Twitter,
  Github,
  User,
  Building
} from 'lucide-react';
import { DemoRequestService } from '../utils/supabase';
import { EmailService } from '../utils/emailService';
import { GoogleCalendarService } from '../utils/googleCalendar';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
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
    message: ''
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
    if (!formData.message.trim()) errors.message = 'Message is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // 1. Save to Supabase
      const demoRequest = await DemoRequestService.createDemoRequest({
        full_name: formData.name,
        email: formData.email,
        company_name: formData.company,
        description: formData.message,
        status: 'pending'
      });
      
      // 2. Create calendar event
      const startTime = new Date();
      startTime.setDate(startTime.getDate() + 3); // Schedule 3 days from now
      startTime.setHours(14, 0, 0, 0); // 2 PM
      
      const endTime = new Date(startTime);
      endTime.setMinutes(startTime.getMinutes() + 30); // 30 minute meeting
      
      const calendarEvent = await GoogleCalendarService.createEvent({
        summary: `Demo: ${formData.company} - ${formData.name}`,
        description: `Demo request from ${formData.name} at ${formData.company}.\n\nRequirements: ${formData.message}`,
        start: startTime,
        end: endTime,
        attendees: [formData.email, 'sales@darexai.com'],
        location: 'Google Meet'
      });
      
      // 3. Update demo request with calendar event ID
      await DemoRequestService.updateDemoRequest(demoRequest.id!, {
        calendar_event_id: calendarEvent.id,
        status: 'scheduled'
      });
      
      // 4. Send confirmation email
      await EmailService.sendConfirmationEmail({
        to: formData.email,
        name: formData.name,
        date: startTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        time: startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        meetingLink: calendarEvent.meetLink,
        companyName: formData.company,
        description: formData.message
      });
      
      // 5. Send admin notification
      await EmailService.sendAdminNotification({
        customerName: formData.name,
        company: formData.company,
        email: formData.email,
        scheduledDate: `${startTime.toLocaleDateString()} at ${startTime.toLocaleTimeString()}`,
        description: formData.message
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error processing your request. Please try again.');
    } finally {
      setIsSubmitting(false);
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
                    <div className="text-gray-400">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-electric-blue bg-opacity-20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-electric-blue" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Office</div>
                    <div className="text-gray-400">San Francisco, CA</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-glass-border">
                <div className="text-white font-medium mb-4">Follow Us</div>
                <div className="flex space-x-3">
                  {[
                    { icon: Linkedin, href: '#', color: 'text-neon-cyan' },
                    { icon: Twitter, href: '#', color: 'text-neon-magenta' },
                    { icon: Github, href: '#', color: 'text-electric-blue' }
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
                              setTimeout(() => sendChatMessage(), 100);
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