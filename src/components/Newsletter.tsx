import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  Sparkles,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1500);
  };

  const benefits = [
    { icon: TrendingUp, text: 'Weekly AI automation insights' },
    { icon: Zap, text: 'Exclusive feature previews' },
    { icon: Users, text: 'Industry best practices' }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-primary/10 via-transparent to-cyan-electric/10"></div>
        <motion.div
          className="absolute top-10 right-10 w-64 h-64 bg-purple-primary rounded-full opacity-10 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-electric rounded-full opacity-10 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-12 rounded-3xl text-center">
            {!isSubscribed ? (
              <>
                {/* Header */}
                <motion.div
                  className="mb-8"
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
                    <span className="text-sm font-medium text-cyan-electric">Stay Ahead of the Curve</span>
                  </motion.div>

                  <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    Get the Latest <span className="text-gradient">AI Insights</span>
                  </h2>
                  
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Join 50,000+ business leaders who receive our weekly newsletter with 
                    cutting-edge AI automation strategies, case studies, and industry trends.
                  </p>
                </motion.div>

                {/* Benefits */}
                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <benefit.icon className="w-5 h-5 text-green-neon" />
                      <span className="text-gray-300">{benefit.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Newsletter Form */}
                <motion.form
                  onSubmit={handleSubmit}
                  className="max-w-md mx-auto mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="flex">
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-12 pr-4 py-4 bg-dark-card border border-gray-700 rounded-l-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-primary transition-colors duration-300"
                        required
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-4 bg-gradient-primary text-white rounded-r-xl font-semibold hover:shadow-glow-purple transition-all duration-300 disabled:opacity-50 flex items-center"
                      whileHover={{ scale: isLoading ? 1 : 1.05 }}
                      whileTap={{ scale: isLoading ? 1 : 0.95 }}
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <>
                          Subscribe
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>

                {/* Privacy Note */}
                <motion.p
                  className="text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  No spam, ever. Unsubscribe anytime. Read our{' '}
                  <a href="#" className="text-purple-primary hover:text-cyan-electric transition-colors duration-300">
                    Privacy Policy
                  </a>
                </motion.p>
              </>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="py-8"
              >
                <motion.div
                  className="w-20 h-20 bg-green-neon rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <CheckCircle className="w-10 h-10 text-dark" />
                </motion.div>

                <h3 className="text-3xl font-bold text-white mb-4">
                  Welcome to the <span className="text-gradient">AI Revolution!</span>
                </h3>
                
                <p className="text-xl text-gray-300 mb-6">
                  Thank you for subscribing! Check your inbox for a welcome email with 
                  exclusive AI automation resources.
                </p>

                <motion.button
                  onClick={() => setIsSubscribed(false)}
                  className="px-8 py-3 glass text-white rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe Another Email
                </motion.button>
              </motion.div>
            )}

            {/* Social Proof */}
            {!isSubscribed && (
              <motion.div
                className="mt-8 pt-8 border-t border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center space-x-8 text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">50,000+ subscribers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">98% satisfaction rate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">Weekly insights</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;