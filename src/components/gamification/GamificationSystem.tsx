import React, { useState, useEffect, useContext, createContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Gift, 
  Crown, 
  Medal,
  Flame,

} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  points: number;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface UserProgress {
  totalPoints: number;
  level: number;
  streak: number;
  achievements: Achievement[];
  badges: string[];
  lastVisit: Date;
  timeSpent: number;
  actionsCompleted: number;
}

interface GamificationContextType {
  userProgress: UserProgress;
  addPoints: (points: number, action: string) => void;
  unlockAchievement: (achievementId: string) => void;
  updateProgress: (achievementId: string, progress: number) => void;
  showNotification: (message: string, type: 'achievement' | 'points' | 'level') => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within GamificationProvider');
  }
  return context;
};

const initialAchievements: Achievement[] = [
  {
    id: 'first-visit',
    title: 'Welcome Explorer',
    description: 'Visit the website for the first time',
    icon: Star,
    points: 10,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: 'common'
  },
  {
    id: 'page-explorer',
    title: 'Page Explorer',
    description: 'Visit 5 different pages',
    icon: Target,
    points: 25,
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    rarity: 'common'
  },
  {
    id: 'demo-booker',
    title: 'Demo Enthusiast',
    description: 'Book a demo session',
    icon: Trophy,
    points: 100,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: 'rare'
  },
  {
    id: 'time-master',
    title: 'Time Master',
    description: 'Spend 10 minutes on the site',
    icon: Flame,
    points: 50,
    unlocked: false,
    progress: 0,
    maxProgress: 600, // 10 minutes in seconds
    rarity: 'common'
  },
  {
    id: 'interaction-king',
    title: 'Interaction King',
    description: 'Complete 20 interactions',
    icon: Zap,
    points: 75,
    unlocked: false,
    progress: 0,
    maxProgress: 20,
    rarity: 'rare'
  },
  {
    id: 'newsletter-subscriber',
    title: 'Insider',
    description: 'Subscribe to the newsletter',
    icon: Crown,
    points: 50,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: 'rare'
  },
  {
    id: 'social-sharer',
    title: 'Social Butterfly',
    description: 'Share content on social media',
    icon: Gift,
    points: 30,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: 'common'
  },
  {
    id: 'ai-master',
    title: 'AI Master',
    description: 'Complete the AI knowledge quiz',
    icon: Medal,
    points: 200,
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: 'legendary'
  }
];

interface NotificationProps {
  message: string;
  type: 'achievement' | 'points' | 'level';
  onClose: () => void;
}

const GamificationNotification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'achievement': return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 'points': return <Star className="w-6 h-6 text-purple-400" />;
      case 'level': return <Crown className="w-6 h-6 text-gold-400" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'achievement': return 'from-yellow-400 to-orange-500';
      case 'points': return 'from-purple-400 to-pink-500';
      case 'level': return 'from-gold-400 to-yellow-500';
    }
  };

  return (
    <motion.div
      className="fixed top-20 right-4 z-50 max-w-sm"
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className={`glass-card p-4 rounded-xl bg-gradient-to-r ${getColor()} bg-opacity-20 border border-white/20`}>
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: 2 }}
          >
            {getIcon()}
          </motion.div>
          <div className="flex-1">
            <p className="text-white font-medium text-sm">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('gamification_progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        achievements: initialAchievements.map(achievement => {
          const savedAchievement = parsed.achievements?.find((a: Achievement) => a.id === achievement.id);
          return savedAchievement || achievement;
        })
      };
    }
    return {
      totalPoints: 0,
      level: 1,
      streak: 0,
      achievements: initialAchievements,
      badges: [],
      lastVisit: new Date(),
      timeSpent: 0,
      actionsCompleted: 0
    };
  });

  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; type: 'achievement' | 'points' | 'level' }>>([]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gamification_progress', JSON.stringify(userProgress));
  }, [userProgress]);

  // Track time spent on site
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      setUserProgress(prev => ({
        ...prev,
        timeSpent: prev.timeSpent + 1
      }));
      
      // Update time master achievement
      updateProgress('time-master', timeSpent);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Check for first visit achievement
  useEffect(() => {
    const hasVisited = localStorage.getItem('has_visited');
    if (!hasVisited) {
      localStorage.setItem('has_visited', 'true');
      setTimeout(() => {
      
      }, 2000);
    }
  }, []);

  const addPoints = (points: number, action: string) => {
    setUserProgress(prev => {
      const newPoints = prev.totalPoints + points;
      const newLevel = Math.floor(newPoints / 100) + 1;
      const leveledUp = newLevel > prev.level;

      if (leveledUp) {
        showNotification(`Level Up! You're now level ${newLevel}!`, 'level');
      } else {
        showNotification(`+${points} points for ${action}!`, 'points');
      }

      return {
        ...prev,
        totalPoints: newPoints,
        level: newLevel,
        actionsCompleted: prev.actionsCompleted + 1
      };
    });

    // Update interaction achievement
    updateProgress('interaction-king', userProgress.actionsCompleted + 1);
  };



  const updateProgress = (achievementId: string, progress: number) => {
    setUserProgress(prev => {
      const achievement = prev.achievements.find(a => a.id === achievementId);
      if (!achievement || achievement.unlocked) return prev;

      const newProgress = Math.min(progress, achievement.maxProgress);
      const shouldUnlock = newProgress >= achievement.maxProgress;

      const updatedAchievements = prev.achievements.map(a =>
        a.id === achievementId 
          ? { ...a, progress: newProgress, unlocked: shouldUnlock }
          : a
      );



      return {
        ...prev,
        achievements: updatedAchievements,
        totalPoints: shouldUnlock && !achievement.unlocked 
          ? prev.totalPoints + achievement.points 
          : prev.totalPoints
      };
    });
  };

  const showNotification = (message: string, type: 'achievement' | 'points' | 'level') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <GamificationContext.Provider value={{
      userProgress,
      addPoints,
    
      updateProgress,
      showNotification
    }}>
      {children}
      
      {/* Notifications */}
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            style={{ top: `${80 + index * 80}px` }}
            className="fixed right-4 z-50"
          >
            <GamificationNotification
              message={notification.message}
              type={notification.type}
              onClose={() => removeNotification(notification.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </GamificationContext.Provider>
  );
};