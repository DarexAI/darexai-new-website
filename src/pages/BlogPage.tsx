import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  Tag,
  Share2,
  Bookmark,
  ArrowRight,
  TrendingUp,
  Zap,
  Brain,
  Target,
  Settings,
  BarChart3,
  MessageSquare,
  Linkedin,
  Twitter,
  Link,
  ChevronDown
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    expertise: string[];
    social: {
      linkedin?: string;
      twitter?: string;
    };
  };
  publishedAt: Date;
  readTime: number;
  category: string;
  tags: string[];
  featuredImage: string;
  isBookmarked?: boolean;
  views: number;
  likes: number;
}

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  count: number;
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const categories: Category[] = [
    { id: 'all', name: 'All Posts', icon: BarChart3, color: 'neon-cyan', count: 24 },
    { id: 'ai-trends', name: 'AI Trends', icon: TrendingUp, color: 'neon-magenta', count: 8 },
    { id: 'automation', name: 'Automation', icon: Zap, color: 'electric-blue', count: 6 },
    { id: 'case-studies', name: 'Case Studies', icon: Target, color: 'success-green', count: 5 },
    { id: 'tutorials', name: 'Tutorials', icon: Settings, color: 'warning-orange', count: 3 },
    { id: 'insights', name: 'Industry Insights', icon: Brain, color: 'neon-purple', count: 2 }
  ];

  const samplePosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of AI Automation in Enterprise: 2025 Predictions',
      excerpt: 'Explore the cutting-edge trends that will shape enterprise AI automation in 2025, from autonomous workflows to predictive business intelligence.',
      content: 'Full article content here...',
      author: {
        name: 'Dr. Sarah Chen',
        avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        role: 'CEO & AI Research Director',
        expertise: ['AI Strategy', 'Machine Learning', 'Enterprise Solutions'],
        social: {
          linkedin: '#',
          twitter: '#'
        }
      },
      publishedAt: new Date('2024-12-15'),
      readTime: 8,
      category: 'ai-trends',
      tags: ['AI', 'Enterprise', 'Predictions', 'Automation'],
      featuredImage: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      views: 2847,
      likes: 156
    },
    {
      id: '2',
      title: 'How TechFlow Increased Productivity by 340% with AI Assistants',
      excerpt: 'A detailed case study showing how our AI assistant implementation transformed TechFlow\'s customer support operations.',
      content: 'Full article content here...',
      author: {
        name: 'Marcus Rodriguez',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        role: 'CTO & Solutions Architect',
        expertise: ['System Architecture', 'Cloud Infrastructure', 'DevOps'],
        social: {
          linkedin: '#',
          twitter: '#'
        }
      },
      publishedAt: new Date('2024-12-10'),
      readTime: 12,
      category: 'case-studies',
      tags: ['Case Study', 'AI Assistants', 'Productivity', 'Customer Support'],
      featuredImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      views: 1923,
      likes: 89
    },
    {
      id: '3',
      title: 'Building Your First Workflow Automation: A Step-by-Step Guide',
      excerpt: 'Learn how to create powerful workflow automations that save time and eliminate manual errors in your business processes.',
      content: 'Full article content here...',
      author: {
        name: 'Emily Watson',
        avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        role: 'VP of Product',
        expertise: ['Product Strategy', 'UX Design', 'Customer Success'],
        social: {
          linkedin: '#',
          twitter: '#'
        }
      },
      publishedAt: new Date('2024-12-05'),
      readTime: 15,
      category: 'tutorials',
      tags: ['Tutorial', 'Workflow', 'Automation', 'Guide'],
      featuredImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      views: 3156,
      likes: 234
    },
    {
      id: '4',
      title: 'The ROI of AI: Measuring Success in Enterprise Automation',
      excerpt: 'Discover the key metrics and methodologies for calculating the return on investment of your AI automation initiatives.',
      content: 'Full article content here...',
      author: {
        name: 'David Kim',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        role: 'Head of AI Research',
        expertise: ['Deep Learning', 'NLP', 'Computer Vision'],
        social: {
          linkedin: '#',
          twitter: '#'
        }
      },
      publishedAt: new Date('2024-11-28'),
      readTime: 10,
      category: 'insights',
      tags: ['ROI', 'Metrics', 'Enterprise', 'AI Strategy'],
      featuredImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      views: 1654,
      likes: 78
    },
    {
      id: '5',
      title: 'Natural Language Processing: The Brain Behind AI Assistants',
      excerpt: 'Deep dive into the NLP technologies that power intelligent conversational AI and how they understand human language.',
      content: 'Full article content here...',
      author: {
        name: 'Dr. Sarah Chen',
        avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        role: 'CEO & AI Research Director',
        expertise: ['AI Strategy', 'Machine Learning', 'Enterprise Solutions'],
        social: {
          linkedin: '#',
          twitter: '#'
        }
      },
      publishedAt: new Date('2024-11-20'),
      readTime: 14,
      category: 'ai-trends',
      tags: ['NLP', 'AI Technology', 'Conversational AI', 'Machine Learning'],
      featuredImage: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      views: 2234,
      likes: 145
    },
    {
      id: '6',
      title: 'Scaling AI Automation: From Pilot to Enterprise Deployment',
      excerpt: 'Best practices for successfully scaling your AI automation initiatives from small pilots to enterprise-wide implementations.',
      content: 'Full article content here...',
      author: {
        name: 'Lisa Thompson',
        avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        role: 'VP of Engineering',
        expertise: ['Software Engineering', 'Team Leadership', 'Agile Development'],
        social: {
          linkedin: '#',
          twitter: '#'
        }
      },
      publishedAt: new Date('2024-11-15'),
      readTime: 11,
      category: 'automation',
      tags: ['Scaling', 'Enterprise', 'Implementation', 'Best Practices'],
      featuredImage: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      views: 1876,
      likes: 92
    }
  ];

  useEffect(() => {
    setPosts(samplePosts);
    setFilteredPosts(samplePosts);
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    // Sort posts
    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'trending':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedCategory, selectedTag, sortBy]);

  // Infinite scroll
  useEffect(() => {
    if (inView && visiblePosts < filteredPosts.length) {
      setIsLoading(true);
      setTimeout(() => {
        setVisiblePosts(prev => Math.min(prev + 3, filteredPosts.length));
        setIsLoading(false);
      }, 1000);
    }
  }, [inView, visiblePosts, filteredPosts.length]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAllTags = () => {
    const allTags = posts.flatMap(post => post.tags);
    return [...new Set(allTags)];
  };

  const toggleBookmark = (postId: string) => {
    setPosts(prev => prev.map(post =>
      post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post
    ));
  };

  const sharePost = (post: BlogPost, platform: 'linkedin' | 'twitter' | 'link') => {
    const url = `${window.location.origin}/blog/${post.id}`;
    const text = `Check out this article: ${post.title}`;

    switch (platform) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'link':
        navigator.clipboard.writeText(url);
        break;
    }
  };

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
              <span className="text-sm font-medium text-neon-cyan">AI Insights & Trends</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6">
              The <span className="text-gradient animate-glow">AI Automation</span> Blog
            </h1>
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Stay ahead of the curve with expert insights, case studies, and practical guides 
              on enterprise AI automation from our team of industry leaders.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8">
        {/* Search and Filters */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass-card p-6 rounded-3xl">
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
              {/* Search */}
              <div className="relative flex-1 w-full lg:w-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, topics, or tags..."
                  className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-all duration-300"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-all duration-300 appearance-none pr-10"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id} className="bg-dark text-white">
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-all duration-300 appearance-none pr-10"
                >
                  <option value="latest" className="bg-dark text-white">Latest</option>
                  <option value="popular" className="bg-dark text-white">Most Popular</option>
                  <option value="trending" className="bg-dark text-white">Trending</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Tag Filter */}
            {getAllTags().length > 0 && (
              <div className="mt-6 pt-6 border-t border-glass-border">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag('')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      !selectedTag 
                        ? 'bg-neon-cyan text-dark' 
                        : 'glass text-gray-300 hover:text-white'
                    }`}
                  >
                    All Tags
                  </button>
                  {getAllTags().slice(0, 10).map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedTag === tag 
                          ? 'bg-neon-cyan text-dark' 
                          : 'glass text-gray-300 hover:text-white'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? `bg-${category.color} bg-opacity-20 text-${category.color} border border-${category.color}`
                    : 'glass text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-5'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon className="w-5 h-5" />
                <span>{category.name}</span>
                <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="masonry-grid">
          <AnimatePresence>
            {filteredPosts.slice(0, visiblePosts).map((post, index) => (
              <motion.article
                key={post.id}
                className="masonry-item glass-card rounded-3xl overflow-hidden hover-lift group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Featured Image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 bg-${categories.find(c => c.id === post.category)?.color} bg-opacity-20 text-${categories.find(c => c.id === post.category)?.color} text-xs font-medium rounded-full backdrop-blur-sm`}>
                      {categories.find(c => c.id === post.category)?.name}
                    </span>
                  </div>

                  {/* Bookmark Button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(post.id);
                    }}
                    className="absolute top-4 right-4 p-2 glass rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'text-neon-cyan fill-current' : 'text-gray-300'}`} />
                  </motion.button>
                </div>

                <div className="p-6">
                  {/* Meta Information */}
                  <div className="flex items-center space-x-4 text-gray-400 text-sm mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-heading font-bold text-white mb-3 line-clamp-2 group-hover:text-gradient transition-all duration-300">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-electric-blue bg-opacity-20 text-electric-blue text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-white font-medium text-sm">{post.author.name}</div>
                        <div className="text-gray-400 text-xs">{post.author.role}</div>
                      </div>
                    </div>

                    {/* Share Button */}
                    <div className="relative group/share">
                      <motion.button
                        className="p-2 glass rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Share2 className="w-4 h-4 text-gray-400" />
                      </motion.button>

                      {/* Share Dropdown */}
                      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover/share:opacity-100 transition-opacity duration-300 pointer-events-none group-hover/share:pointer-events-auto">
                        <div className="glass p-2 rounded-lg space-y-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              sharePost(post, 'linkedin');
                            }}
                            className="flex items-center space-x-2 w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-300"
                          >
                            <Linkedin className="w-4 h-4" />
                            <span className="text-sm">LinkedIn</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              sharePost(post, 'twitter');
                            }}
                            className="flex items-center space-x-2 w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-300"
                          >
                            <Twitter className="w-4 h-4" />
                            <span className="text-sm">Twitter</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              sharePost(post, 'link');
                            }}
                            className="flex items-center space-x-2 w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-300"
                          >
                            <Link className="w-4 h-4" />
                            <span className="text-sm">Copy Link</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-glass-border">
                    <div className="flex items-center space-x-4 text-gray-400 text-sm">
                      <span>{post.views.toLocaleString()} views</span>
                      <span>{post.likes} likes</span>
                    </div>
                    <motion.div
                      className="flex items-center space-x-2 text-neon-cyan opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm font-medium">Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More / Infinite Scroll */}
        {visiblePosts < filteredPosts.length && (
          <div ref={loadMoreRef} className="mt-12 text-center">
            {isLoading ? (
              <motion.div
                className="flex items-center justify-center space-x-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-6 h-6 border-2 border-neon-cyan border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span className="text-gray-300">Loading more articles...</span>
              </motion.div>
            ) : (
              <motion.button
                onClick={() => setVisiblePosts(prev => Math.min(prev + 3, filteredPosts.length))}
                className="px-8 py-4 glass text-white rounded-xl font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More Articles
              </motion.button>
            )}
          </div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-4">
              No Articles Found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search criteria or browse our categories.
            </p>
            <motion.button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTag('');
              }}
              className="px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow-cyan transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;