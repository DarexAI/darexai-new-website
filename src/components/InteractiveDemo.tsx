import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Send, 
  Sparkles, 
  MessageSquare, 
  BarChart3, 
  Users, 
  Mail,
  Calendar,
  FileText,
  Zap
} from 'lucide-react';

interface Command {
  id: string;
  text: string;
  category: 'automation' | 'analytics' | 'communication';
  icon: React.ElementType;
}

interface DemoResult {
  type: 'success' | 'processing' | 'info';
  title: string;
  description: string;
  metrics?: { label: string; value: string }[];
}

const InteractiveDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentResult, setCurrentResult] = useState<DemoResult | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const popularCommands: Command[] = [
    { id: '1', text: 'Generate lead qualification report', category: 'analytics', icon: BarChart3 },
    { id: '2', text: 'Send personalized email campaign', category: 'communication', icon: Mail },
    { id: '3', text: 'Schedule social media posts', category: 'automation', icon: Calendar },
    { id: '4', text: 'Analyze customer sentiment', category: 'analytics', icon: MessageSquare },
    { id: '5', text: 'Create automated workflow', category: 'automation', icon: Zap },
    { id: '6', text: 'Generate performance report', category: 'analytics', icon: FileText },
  ];

  const demoResults: { [key: string]: DemoResult } = {
    'lead': {
      type: 'success',
      title: 'Lead Qualification Report Generated',
      description: 'Analyzed 1,247 leads and identified 89 high-quality prospects ready for immediate follow-up.',
      metrics: [
        { label: 'Hot Leads', value: '89' },
        { label: 'Conversion Rate', value: '23%' },
        { label: 'Avg. Deal Size', value: '$12,500' }
      ]
    },
    'email': {
      type: 'processing',
      title: 'Email Campaign in Progress',
      description: 'Personalizing and sending emails to 2,500 qualified leads with dynamic content optimization.',
      metrics: [
        { label: 'Recipients', value: '2,500' },
        { label: 'Personalization', value: '100%' },
        { label: 'Est. Delivery', value: '15 min' }
      ]
    },
    'social': {
      type: 'success',
      title: 'Social Media Posts Scheduled',
      description: 'Created and scheduled 24 posts across LinkedIn, Twitter, and Facebook for the next week.',
      metrics: [
        { label: 'Posts Created', value: '24' },
        { label: 'Platforms', value: '3' },
        { label: 'Engagement Score', value: '94%' }
      ]
    },
    'sentiment': {
      type: 'info',
      title: 'Customer Sentiment Analysis Complete',
      description: 'Processed 1,856 customer interactions with 87% positive sentiment and key insights identified.',
      metrics: [
        { label: 'Positive', value: '87%' },
        { label: 'Neutral', value: '10%' },
        { label: 'Negative', value: '3%' }
      ]
    }
  };

  const typeText = async (text: string) => {
    setIsTyping(true);
    setInputValue('');
    
    for (let i = 0; i <= text.length; i++) {
      setInputValue(text.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    setIsTyping(false);
  };

  const handleCommandClick = (command: Command) => {
    setShowSuggestions(false);
    typeText(command.text);
    
    setTimeout(() => {
      const key = command.text.toLowerCase().includes('lead') ? 'lead' :
                  command.text.toLowerCase().includes('email') ? 'email' :
                  command.text.toLowerCase().includes('social') ? 'social' :
                  command.text.toLowerCase().includes('sentiment') ? 'sentiment' :
                  'lead';
      
      setCurrentResult(demoResults[key]);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setShowSuggestions(false);
      setCurrentResult(demoResults['lead']);
    }
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-electric/5 via-transparent to-purple-primary/5"></div>
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-electric rounded-full opacity-10 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center glass px-6 py-3 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-cyan-electric mr-2" />
            <span className="text-sm font-medium text-cyan-electric">Interactive Demo</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Try Our <span className="text-gradient">AI Assistant</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the power of natural language automation. Simply describe what you want to accomplish, 
            and watch our AI execute complex business tasks instantly.
          </p>
        </motion.div>

        {/* Demo Interface */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-8 rounded-3xl">
            {/* Command Input */}
            <div className="mb-8">
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Describe what you want to automate..."
                    className="w-full pl-14 pr-16 py-6 bg-dark-card border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-primary transition-colors duration-300 text-lg"
                  />
                  <motion.button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-primary text-white rounded-lg hover:shadow-glow-purple transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isTyping}
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </form>

              <p className="text-gray-400 text-sm mt-3 text-center">
                Try commands like "Generate sales report" or "Send follow-up emails"
              </p>
            </div>

            {/* Popular Commands */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Popular Commands</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {popularCommands.map((command, index) => (
                      <motion.button
                        key={command.id}
                        onClick={() => handleCommandClick(command)}
                        className="flex items-center space-x-3 p-4 glass rounded-lg text-left hover:bg-white hover:bg-opacity-10 transition-all duration-300 group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className={`p-2 rounded-lg ${
                          command.category === 'automation' ? 'bg-purple-primary/20 text-purple-primary' :
                          command.category === 'analytics' ? 'bg-cyan-electric/20 text-cyan-electric' :
                          'bg-green-neon/20 text-green-neon'
                        }`}>
                          <command.icon className="w-4 h-4" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                          {command.text}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Area */}
            <AnimatePresence>
              {currentResult && (
                <motion.div
                  className="glass p-6 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full ${
                      currentResult.type === 'success' ? 'bg-green-neon/20 text-green-neon' :
                      currentResult.type === 'processing' ? 'bg-cyan-electric/20 text-cyan-electric' :
                      'bg-purple-primary/20 text-purple-primary'
                    }`}>
                      {currentResult.type === 'processing' ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Zap className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <Sparkles className="w-5 h-5" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {currentResult.title}
                      </h4>
                      <p className="text-gray-300 mb-4">
                        {currentResult.description}
                      </p>
                      
                      {currentResult.metrics && (
                        <div className="grid grid-cols-3 gap-4">
                          {currentResult.metrics.map((metric, index) => (
                            <div key={index} className="text-center">
                              <div className="text-xl font-bold text-white mb-1">
                                {metric.value}
                              </div>
                              <div className="text-xs text-gray-400">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Helper Text */}
            {!currentResult && (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  Click on a command above or type your own to see the AI in action
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveDemo;