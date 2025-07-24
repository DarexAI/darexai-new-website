import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown, 
  Star, 
  Send,
  Smile,
  Meh,
  Frown,
  TrendingUp,
  Users,
  Clock,
  Zap
} from 'lucide-react';

interface FeedbackData {
  id: string;
  type: 'rating' | 'emoji' | 'comment' | 'poll';
  content: string;
  timestamp: Date;
  user: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface LivePoll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  endTime: Date;
}

export const RealTimeFeedback: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'rating' | 'emoji' | 'comment' | 'poll'>('rating');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState<'positive' | 'neutral' | 'negative' | null>(null);
  const [recentFeedback, setRecentFeedback] = useState<FeedbackData[]>([]);
  const [currentPoll, setCurrentPoll] = useState<LivePoll | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [liveStats, setLiveStats] = useState({
    totalFeedback: 1247,
    averageRating: 4.6,
    positivePercentage: 87,
    activeUsers: 23
  });

  // Initialize with sample data
  useEffect(() => {
    const sampleFeedback: FeedbackData[] = [
      {
        id: '1',
        type: 'rating',
        content: '5 stars - Amazing platform!',
        timestamp: new Date(Date.now() - 300000),
        user: 'Sarah M.',
        sentiment: 'positive'
      },
      {
        id: '2',
        type: 'comment',
        content: 'The AI automation features are exactly what we needed for our business.',
        timestamp: new Date(Date.now() - 600000),
        user: 'Mike R.',
        sentiment: 'positive'
      },
      {
        id: '3',
        type: 'emoji',
        content: 'positive',
        timestamp: new Date(Date.now() - 900000),
        user: 'Alex K.',
        sentiment: 'positive'
      }
    ];

    const samplePoll: LivePoll = {
      id: '1',
      question: 'Which AI feature interests you most?',
      options: [
        { id: '1', text: 'Automated Customer Support', votes: 45 },
        { id: '2', text: 'Lead Generation', votes: 32 },
        { id: '3', text: 'Workflow Automation', votes: 38 },
        { id: '4', text: 'Data Analytics', votes: 28 }
      ],
      totalVotes: 143,
      endTime: new Date(Date.now() + 300000) // 5 minutes from now
    };

    setRecentFeedback(sampleFeedback);
    setCurrentPoll(samplePoll);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        totalFeedback: prev.totalFeedback + Math.floor(Math.random() * 3),
        activeUsers: Math.max(15, prev.activeUsers + Math.floor(Math.random() * 5) - 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const submitFeedback = () => {
    let feedbackContent = '';
    let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';

    switch (feedbackType) {
      case 'rating':
        feedbackContent = `${rating} stars`;
        sentiment = rating >= 4 ? 'positive' : rating >= 3 ? 'neutral' : 'negative';
        break;
      case 'emoji':
        feedbackContent = selectedEmoji || 'neutral';
        sentiment = selectedEmoji || 'neutral';
        break;
      case 'comment':
        feedbackContent = comment;
        sentiment = 'positive'; // Simplified sentiment analysis
        break;
    }

    const newFeedback: FeedbackData = {
      id: Date.now().toString(),
      type: feedbackType,
      content: feedbackContent,
      timestamp: new Date(),
      user: 'You',
      sentiment
    };

    setRecentFeedback(prev => [newFeedback, ...prev.slice(0, 9)]);
    
    // Reset form
    setRating(0);
    setComment('');
    setSelectedEmoji(null);
    setIsOpen(false);
  };

  const submitPollVote = (optionId: string) => {
    if (hasVoted || !currentPoll) return;

    setCurrentPoll(prev => {
      if (!prev) return null;
      return {
        ...prev,
        options: prev.options.map(option =>
          option.id === optionId
            ? { ...option, votes: option.votes + 1 }
            : option
        ),
        totalVotes: prev.totalVotes + 1
      };
    });

    setHasVoted(true);
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 left-4 p-4 bg-gradient-primary rounded-full shadow-glow-purple hover:shadow-glow-cyan transition-all duration-300 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.button>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-2xl glass-card rounded-3xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Header */}
              <div className="p-6 border-b border-glass-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Share Your Feedback</h2>
                    <p className="text-gray-400">Help us improve your experience</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </div>

                {/* Feedback Type Selector */}
                <div className="flex space-x-2 mt-6">
                  {[
                    { type: 'rating' as const, label: 'Rating', icon: Star },
                    { type: 'emoji' as const, label: 'Quick', icon: Smile },
                    { type: 'comment' as const, label: 'Comment', icon: MessageCircle },
                    { type: 'poll' as const, label: 'Poll', icon: TrendingUp }
                  ].map(({ type, label, icon: Icon }) => (
                    <button
                      key={type}
                      onClick={() => setFeedbackType(type)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        feedbackType === type
                          ? 'bg-gradient-primary text-white'
                          : 'glass text-gray-300 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {feedbackType === 'rating' && (
                    <motion.div
                      key="rating"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="text-center"
                    >
                      <h3 className="text-xl font-semibold text-white mb-6">
                        How would you rate your experience?
                      </h3>
                      <div className="flex justify-center space-x-2 mb-8">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            onClick={() => setRating(star)}
                            className={`p-2 ${rating >= star ? 'text-yellow-400' : 'text-gray-600'}`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Star className="w-8 h-8" fill={rating >= star ? 'currentColor' : 'none'} />
                          </motion.button>
                        ))}
                      </div>
                      {rating > 0 && (
                        <motion.button
                          onClick={submitFeedback}
                          className="px-8 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow-purple transition-all duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Submit Rating
                        </motion.button>
                      )}
                    </motion.div>
                  )}

                  {feedbackType === 'emoji' && (
                    <motion.div
                      key="emoji"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="text-center"
                    >
                      <h3 className="text-xl font-semibold text-white mb-6">
                        How are you feeling about our platform?
                      </h3>
                      <div className="flex justify-center space-x-8 mb-8">
                        {[
                          { emoji: 'positive', icon: Smile, color: 'text-green-400', label: 'Great!' },
                          { emoji: 'neutral', icon: Meh, color: 'text-yellow-400', label: 'Okay' },
                          { emoji: 'negative', icon: Frown, color: 'text-red-400', label: 'Not good' }
                        ].map(({ emoji, icon: Icon, color, label }) => (
                          <motion.button
                            key={emoji}
                            onClick={() => setSelectedEmoji(emoji as any)}
                            className={`flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-300 ${
                              selectedEmoji === emoji
                                ? 'bg-white/10 scale-110'
                                : 'hover:bg-white/5'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Icon className={`w-12 h-12 ${color}`} />
                            <span className="text-white text-sm">{label}</span>
                          </motion.button>
                        ))}
                      </div>
                      {selectedEmoji && (
                        <motion.button
                          onClick={submitFeedback}
                          className="px-8 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow-purple transition-all duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Submit Feedback
                        </motion.button>
                      )}
                    </motion.div>
                  )}

                  {feedbackType === 'comment' && (
                    <motion.div
                      key="comment"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-6">
                        Tell us more about your experience
                      </h3>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your thoughts, suggestions, or any issues you've encountered..."
                        className="w-full h-32 px-4 py-3 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 resize-none"
                      />
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-gray-400 text-sm">
                          {comment.length}/500 characters
                        </span>
                        <motion.button
                          onClick={submitFeedback}
                          disabled={comment.length < 10}
                          className="px-8 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow-purple transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                          whileHover={{ scale: comment.length >= 10 ? 1.05 : 1 }}
                          whileTap={{ scale: comment.length >= 10 ? 0.95 : 1 }}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Submit Comment
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {feedbackType === 'poll' && currentPoll && (
                    <motion.div
                      key="poll"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-white">
                          {currentPoll.question}
                        </h3>
                        <div className="text-sm text-gray-400">
                          {currentPoll.totalVotes} votes
                        </div>
                      </div>

                      <div className="space-y-3">
                        {currentPoll.options.map((option) => {
                          const percentage = currentPoll.totalVotes > 0 
                            ? (option.votes / currentPoll.totalVotes) * 100 
                            : 0;

                          return (
                            <motion.button
                              key={option.id}
                              onClick={() => submitPollVote(option.id)}
                              disabled={hasVoted}
                              className={`w-full p-4 rounded-xl transition-all duration-300 relative overflow-hidden ${
                                hasVoted
                                  ? 'cursor-default'
                                  : 'hover:bg-white/5 cursor-pointer'
                              }`}
                              whileHover={{ scale: hasVoted ? 1 : 1.02 }}
                              whileTap={{ scale: hasVoted ? 1 : 0.98 }}
                            >
                              {/* Background bar */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-cyan-400/20"
                                initial={{ width: 0 }}
                                animate={{ width: hasVoted ? `${percentage}%` : 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                              />
                              
                              <div className="relative flex items-center justify-between">
                                <span className="text-white font-medium">{option.text}</span>
                                {hasVoted && (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-gray-400">{option.votes}</span>
                                    <span className="text-purple-400 font-bold">
                                      {percentage.toFixed(1)}%
                                    </span>
                                  </div>
                                )}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>

                      {hasVoted && (
                        <motion.div
                          className="mt-6 text-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className="glass p-4 rounded-xl">
                            <div className="flex items-center justify-center space-x-2 text-green-400 mb-2">
                              <Zap className="w-5 h-5" />
                              <span className="font-medium">Thanks for voting!</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                              Your vote helps us understand what matters most to our users.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Recent Feedback */}
              <div className="border-t border-glass-border p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-400" />
                  Recent Feedback
                </h4>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {recentFeedback.slice(0, 5).map((feedback) => (
                    <motion.div
                      key={feedback.id}
                      className="flex items-start space-x-3 p-3 glass rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        feedback.sentiment === 'positive' ? 'bg-green-400' :
                        feedback.sentiment === 'neutral' ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-white font-medium text-sm">{feedback.user}</span>
                          <span className="text-gray-400 text-xs">
                            {formatTimeAgo(feedback.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">{feedback.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};