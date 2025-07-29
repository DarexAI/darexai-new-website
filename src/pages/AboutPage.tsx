import React, { useState } from 'react';
import { useSEO, useBreadcrumbs } from '../hooks/useSEO';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  Globe, 
  Users, 
  Rocket,
  Brain,
  Quote,
  ArrowRight,
  Linkedin,
  Twitter,
  Mail,
  TrendingUp,
  Award,
  CheckCircle,
  Clock
} from 'lucide-react';
import BookingModal from '../components/shared/BookingModal';

const AboutPage: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // SEO optimization
  useSEO({
    title: 'About Dare XAI - AI Automation Experts | Our Mission & Team',
    description: 'Learn about Dare XAI\'s mission to transform 10,000 businesses with AI automation. Meet our founders Aditya Kumar and Sanu Shaurya, and discover our innovative approach.',
    keywords: 'about dare xai, AI automation company, enterprise AI solutions, automation experts, AI team, business transformation, Aditya Kumar, Sanu Shaurya',
    canonical: 'https://darexai.com/about'
  });

  // Breadcrumb navigation
  useBreadcrumbs([
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' }
  ]);

  const stats = [
    { value: '10,000+', label: 'Businesses to Transform', icon: Target },
    { value: '24/7', label: 'AI Availability', icon: Clock },
    { value: '95%', label: 'Task Automation', icon: Zap },
    { value: '5-7 Days', label: 'Setup Time', icon: Rocket }
  ];

  const founders = [
    {
      name: 'Aditya Kumar',
      role: 'Founder',
      image: 'https://iili.io/F8pbZHQ.md.png',
      bio: 'AI automation expert with 10+ years in technology, passionate about transforming how businesses operate.',
      linkedin: 'https://www.linkedin.com/in/aditya-kumar-learner/',
      email: 'aditya.kumar@darexai.com'
    },
    {
      name: 'Sanu Shaurya',
      role: 'Founder',
      image: 'https://media.licdn.com/dms/image/v2/D5603AQH88sQD9CbBwA/profile-displayphoto-shrink_800_800/B56ZXLnvTeGsAc-/0/1742877949415?e=1758153600&v=beta&t=vZhVuqFJXVEp-ydElG8Mz40lRd6XrKCp8RKb6Idbqiw',
      bio: 'Technical leader specializing in AI systems and scalable automation solutions for enterprise growth.',
      linkedin: 'https://www.linkedin.com/in/sanu-shaurya-a0194a247/',
      email: 'sanu@darexai.com'
    }
  ];

  const values = [
    {
      icon: Brain,
      title: 'Results-Driven AI',
      description: 'We build AI that delivers measurable business outcomes, not just impressive demos.',
      color: 'text-ai-blue'
    },
    {
      icon: Zap,
      title: 'Speed & Simplicity',
      description: 'Fast implementation, easy integration, immediate results. No months-long deployments.',
      color: 'text-ai-teal'
    },
    {
      icon: Users,
      title: 'Real Business Focus',
      description: 'We understand MSMEs and service brands. Our solutions fit your budget and workflow.',
      color: 'text-ai-purple'
    },
    {
      icon: Award,
      title: 'Trust & Transparency',
      description: 'No hidden costs, clear timelines, honest communication. Your success is our success.',
      color: 'text-ai-emerald'
    }
  ];

  return (
    <div className="pt-24 pb-12">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-ai-blue/10 via-transparent to-ai-purple/10"></div>
          <motion.div
            className="absolute top-20 left-20 w-64 h-64 bg-ai-blue rounded-full opacity-20 blur-3xl"
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
              <Rocket className="w-4 h-4 text-ai-teal mr-2" />
              <span className="text-sm font-medium text-ai-teal">About Dare XAI</span>
            </motion.div>

            <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
              Building the Future of <span className="text-gradient">Business Automation</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We're on a mission to help high-intent businesses automate smarter and scale faster 
              using the power of AI agents. We don't just build tools — we design results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
              <span className="text-gradient">Who We Are</span>
            </h2>
            
            <div className="glass-card p-12 rounded-3xl">
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                <strong className="text-white">Dare XAI is a cutting-edge AI Sales & Automation Agency</strong> built specifically 
                for growth-stage businesses who are tired of losing leads to missed calls and delayed responses.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                We specialize in <strong className="text-ai-blue">voice AI agents</strong>, <strong className="text-ai-teal">WhatsApp automation bots</strong>, 
                and <strong className="text-ai-purple">intelligent follow-up systems</strong> that work 24/7 in regional languages. 
                Our performance-focused solutions help businesses capture more leads, book more appointments, 
                and close more deals — without hiring additional staff.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-r from-ai-blue/5 to-ai-purple/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Mission */}
            <motion.div
              className="glass-card p-10 rounded-3xl text-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-ai-blue to-ai-indigo rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6">Our Mission</h3>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                Help <strong className="text-ai-blue">10,000 businesses</strong> eliminate manual bottlenecks, 
                reduce lead losses, and grow using scalable AI automation — 
                <strong className="text-white">without increasing headcount.</strong>
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              className="glass-card p-10 rounded-3xl text-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-ai-teal to-ai-emerald rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6">Our Vision</h3>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                Become the <strong className="text-ai-teal">#1 automation partner</strong> for real-world businesses 
                in Tier 1 & 2 cities across India and beyond. 
                <strong className="text-white">Bring 24/7 AI to every business phone and WhatsApp.</strong>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Our <span className="text-gradient">Impact Goals</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-xl text-center hover-lift"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-ai-blue mb-2">{stat.value}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              What <span className="text-gradient">Drives Us</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 rounded-2xl hover-lift"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-6">
                  <div className={`p-4 glass rounded-xl ${value.color}`}>
                    <value.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-gradient-to-r from-ai-blue/5 to-ai-purple/5">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Meet Our <span className="text-gradient">Founders</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Led by passionate builders with experience in AI, automation, and SaaS. 
              Deeply driven by impact, speed, and solving real problems for real businesses.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-16">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 rounded-2xl text-center hover-lift"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative mb-6">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-ai-blue/20"
                  />
                  <div className="absolute inset-0 w-24 h-24 rounded-full mx-auto shadow-glow-blue"></div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{founder.name}</h3>
                <p className="text-ai-blue font-medium mb-4">{founder.role}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{founder.bio}</p>
                
                <div className="flex justify-center space-x-4">
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 glass rounded-lg text-ai-blue hover:text-white hover:bg-ai-blue/20 transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${founder.email}`}
                    className="p-2 glass rounded-lg text-ai-teal hover:text-white hover:bg-ai-teal/20 transition-all duration-300"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Team Quote */}
          <motion.div
            className="glass-card p-12 rounded-3xl text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Quote className="w-16 h-16 text-ai-blue mx-auto mb-6 opacity-50" />
            <blockquote className="text-2xl lg:text-3xl font-bold text-white mb-6 leading-relaxed">
              "We're not just automating tasks — we're upgrading how businesses talk to their customers."
            </blockquote>
            <p className="text-ai-blue font-medium text-lg">– Dare XAI Team</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
              Want to Automate Smarter and <span className="text-gradient">Grow Faster?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the businesses already transforming their operations with Dare XAI. 
              Book your free strategy call and see how AI can work for you.
            </p>
            <motion.button
              className="px-10 py-5 bg-gradient-primary text-white rounded-xl font-bold text-lg hover:shadow-glow-blue transition-all duration-300 flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookingOpen(true)}
            >
              📅 Book Free Strategy Call Now
              <ArrowRight className="ml-3 w-5 h-5" />
            </motion.button>
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

export default AboutPage;