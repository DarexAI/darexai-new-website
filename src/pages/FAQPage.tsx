import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  ChevronDown, 
  Users, 
  Globe, 
  Settings, 
  Clock, 
  DollarSign,
  Phone,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import BookingModal from '../components/shared/BookingModal';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon: React.ElementType;
}

const FAQPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'Will this replace my sales/support team?',
      answer: 'No, it assists and scales your team without hiring more people. Your AI agent handles routine inquiries, lead qualification, and appointment booking, freeing your team to focus on closing deals and handling complex customer needs. Think of it as your best employee who never sleeps, never takes breaks, and never forgets to follow up.',
      category: 'general',
      icon: Users
    },
    {
      id: '2',
      question: 'Can it speak in Hindi or regional languages?',
      answer: 'Yes, we support multilingual voice and WhatsApp bots. Our AI can communicate fluently in Hindi, Tamil, Marathi, Bengali, and English. It understands regional accents and can switch languages mid-conversation based on customer preference. This is especially powerful for businesses serving diverse Indian markets.',
      category: 'features',
      icon: Globe
    },
    {
      id: '3',
      question: 'Do I need to install a new CRM?',
      answer: 'No, we work with your Google Sheets or existing CRM. Our system integrates seamlessly with popular tools like Salesforce, HubSpot, Zoho, or even simple Google Sheets. All conversation data, lead information, and booking details are automatically synced to your preferred system.',
      category: 'technical',
      icon: Settings
    },
    {
      id: '4',
      question: 'What\'s the setup time?',
      answer: 'Usually 5–7 days for full deployment. Day 1-2: We analyze your current process and set up the AI. Day 3-4: Training the AI with your specific responses and testing. Day 5-7: Live deployment with monitoring and fine-tuning. Most clients see results within the first week.',
      category: 'implementation',
      icon: Clock
    },
    {
      id: '5',
      question: 'Is it affordable for small teams?',
      answer: 'Absolutely. We work best with lean businesses that want to grow without growing costs. Our pricing starts at ₹15,000/month, which is less than hiring one part-time employee. Most clients save 3-5x their investment by reducing missed opportunities and improving conversion rates.',
      category: 'pricing',
      icon: DollarSign
    },
    {
      id: '6',
      question: 'What if customers prefer talking to humans?',
      answer: 'The AI seamlessly transfers complex queries to your team. It\'s designed to handle 80% of routine inquiries (pricing, availability, basic info) and intelligently escalate when human expertise is needed. Customers often don\'t realize they\'re talking to AI initially because the conversations feel natural.',
      category: 'general',
      icon: Phone
    },
    {
      id: '7',
      question: 'How does it handle WhatsApp Business?',
      answer: 'We integrate directly with WhatsApp Business API. The AI can send rich media (images, PDFs, location), handle group chats, manage broadcast lists, and even process orders through WhatsApp. It maintains your business profile and follows WhatsApp\'s guidelines perfectly.',
      category: 'features',
      icon: MessageSquare
    },
    {
      id: '8',
      question: 'What if my business is very niche?',
      answer: 'We specialize in customization. Whether you\'re in astrology consultations, pet grooming, or industrial equipment sales, we train the AI on your specific terminology, processes, and customer journey. The more niche your business, the more competitive advantage you get.',
      category: 'general',
      icon: Settings
    },
    {
      id: '9',
      question: 'Can it handle complex pricing discussions?',
      answer: 'Yes, it can handle pricing tiers, discounts, and negotiations within your guidelines. You set the rules (minimum prices, discount limits, special offers), and the AI follows them consistently. It can even create custom quotes and send them via WhatsApp or email.',
      category: 'features',
      icon: DollarSign
    },
    {
      id: '10',
      question: 'What about data security and privacy?',
      answer: 'We follow enterprise-grade security standards. All data is encrypted, stored securely, and never shared with third parties. We\'re GDPR compliant and can sign NDAs for sensitive businesses. Your customer data remains yours, and you can export it anytime.',
      category: 'technical',
      icon: Settings
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions', count: faqs.length },
    { id: 'general', label: 'General', count: faqs.filter(f => f.category === 'general').length },
    { id: 'features', label: 'Features', count: faqs.filter(f => f.category === 'features').length },
    { id: 'technical', label: 'Technical', count: faqs.filter(f => f.category === 'technical').length },
    { id: 'pricing', label: 'Pricing', count: faqs.filter(f => f.category === 'pricing').length },
    { id: 'implementation', label: 'Setup', count: faqs.filter(f => f.category === 'implementation').length }
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="pt-24 pb-12">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-ai-blue/10 via-transparent to-ai-purple/10"></div>
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
              <HelpCircle className="w-4 h-4 text-ai-teal mr-2" />
              <span className="text-sm font-medium text-ai-teal">Frequently Asked Questions</span>
            </motion.div>

            <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
              Got Questions? <span className="text-gradient">We've Got Answers</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Everything you need to know about implementing AI automation for your business. 
              Can't find what you're looking for? Book a free consultation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-primary text-white'
                    : 'glass text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{category.label}</span>
                <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                  {category.count}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="glass-card rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white hover:bg-opacity-5 transition-all duration-300"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <faq.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pl-20">
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="glass-card p-12 rounded-3xl text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Still Have Questions? <span className="text-gradient">Let's Talk</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Book a free 30-minute consultation where we'll answer all your questions 
              and show you exactly how AI automation can work for your specific business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                className="px-10 py-5 bg-gradient-primary text-white rounded-xl font-bold text-lg hover:shadow-glow-blue transition-all duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBookingOpen(true)}
              >
                Book Free Consultation
                <ArrowRight className="ml-3 w-5 h-5" />
              </motion.button>
              <motion.button
                className="px-10 py-5 glass text-white rounded-xl font-bold text-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBookingOpen(true)}
              >
                <MessageSquare className="mr-3 w-5 h-5" />
                Chat with Expert
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </div>
  );
};

export default FAQPage;