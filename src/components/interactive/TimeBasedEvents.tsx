import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Gift, 
  Zap, 
  Star, 
  Calendar,
  Timer,
  Trophy,
  Sparkles,
  Bell,
  X,
  Target as TargetIcon
} from 'lucide-react';

interface TimeEvent {
  id: string;
  type: 'flash_sale' | 'limited_offer' | 'daily_challenge' | 'surprise_bonus' | 'milestone_celebration';
  title: string;
  description: string;
  action: string;
  reward: string;
  duration: number; // in seconds
  startTime: Date;
  isActive: boolean;
  icon: React.ElementType;
  color: string;
  urgency: 'low' | 'medium' | 'high';
}

interface Notification {
  id: string;
  message: string;
  type: 'event' | 'reminder' | 'celebration';
  timestamp: Date;
  read: boolean;
}

export const TimeBasedEvents: React.FC = () => {
  const [activeEvents, setActiveEvents] = useState<TimeEvent[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [visitStartTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Initialize events and check for time-based triggers
  useEffect(() => {
    const initializeEvents = () => {
      const now = new Date();
      const events: TimeEvent[] = [];

      // Daily Challenge (resets every 24 hours)
      const lastChallenge = localStorage.getItem('last_daily_challenge');
      const lastChallengeDate = lastChallenge ? new Date(lastChallenge) : new Date(0);
      const daysSinceLastChallenge = Math.floor((now.getTime() - lastChallengeDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysSinceLastChallenge >= 1) {
        events.push({
          id: 'daily-challenge',
          type: 'daily_challenge',
          title: 'Daily AI Challenge',
          description: 'Complete today\'s challenge to earn bonus points!',
          action: 'Take Quiz',
          reward: '50 bonus points',
          duration: 86400, // 24 hours
          startTime: now,
          isActive: true,
          icon: TargetIcon,
          color: 'text-purple-400',
          urgency: 'medium'
        });
      }

      // Flash Sale (random, 10% chance every hour)
      const lastFlashSale = localStorage.getItem('last_flash_sale');
      const lastFlashSaleTime = lastFlashSale ? new Date(lastFlashSale) : new Date(0);
      const hoursSinceLastFlashSale = Math.floor((now.getTime() - lastFlashSaleTime.getTime()) / (1000 * 60 * 60));

      if (hoursSinceLastFlashSale >= 1 && Math.random() < 0.1) {
        events.push({
          id: 'flash-sale',
          type: 'flash_sale',
          title: 'Flash Demo Bonus!',
          description: 'Book a demo in the next 15 minutes for exclusive benefits!',
          action: 'Book Demo',
          reward: 'Priority support + 100 points',
          duration: 900, // 15 minutes
          startTime: now,
          isActive: true,
          icon: Zap,
          color: 'text-yellow-400',
          urgency: 'high'
        });
        localStorage.setItem('last_flash_sale', now.toISOString());
      }

      // Milestone Celebration (based on time spent on site)
      const timeSpent = Math.floor((now.getTime() - visitStartTime.getTime()) / 1000);
      if (timeSpent >= 300 && timeSpent < 310) { // 5 minutes
        events.push({
          id: 'milestone-5min',
          type: 'milestone_celebration',
          title: '5-Minute Explorer!',
          description: 'You\'ve been exploring for 5 minutes! Here\'s a reward.',
          action: 'Claim Reward',
          reward: '25 points + Explorer badge',
          duration: 60, // 1 minute to claim
          startTime: now,
          isActive: true,
          icon: Trophy,
          color: 'text-green-400',
          urgency: 'low'
        });
      }

      // Surprise Bonus (random, 5% chance every 2 minutes)
      if (Math.random() < 0.05) {
        events.push({
          id: 'surprise-bonus',
          type: 'surprise_bonus',
          title: 'Surprise Bonus!',
          description: 'Lucky you! A wild bonus appeared.',
          action: 'Collect',
          reward: 'Random points (10-50)',
          duration: 30, // 30 seconds
          startTime: now,
          isActive: true,
          icon: Gift,
          color: 'text-pink-400',
          urgency: 'high'
        });
      }

      setActiveEvents(events);

      // Create notifications for new events
      events.forEach(event => {
        addNotification({
          id: `event-${event.id}`,
          message: `New event: ${event.title}`,
          type: 'event',
          timestamp: now,
          read: false
        });
      });
    };

    initializeEvents();

    // Check for new events every 2 minutes
    const eventTimer = setInterval(initializeEvents, 120000);

    return () => clearInterval(eventTimer);
  }, [visitStartTime]);

  // Remove expired events
  useEffect(() => {
    setActiveEvents(prev => prev.filter(event => {
      const elapsed = Math.floor((currentTime.getTime() - event.startTime.getTime()) / 1000);
      return elapsed < event.duration;
    }));
  }, [currentTime]);

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev.slice(0, 9)]); // Keep last 10
  };

  const handleEventAction = (event: TimeEvent) => {
    switch (event.type) {
      case 'daily_challenge':
        localStorage.setItem('last_daily_challenge', new Date().toISOString());
        break;
      
      case 'flash_sale':
        console.log('Flash demo booking');
        break;
      
      case 'milestone_celebration':
        console.log('5-minute exploration milestone');
        break;
      
      case 'surprise_bonus':
        const bonusPoints = Math.floor(Math.random() * 40) + 10;
        console.log('Surprise bonus:', bonusPoints);
        break;
      
      case 'limited_offer':
        console.log('Limited offer claimed');
        break;
    }

    // Remove the event after action
    setActiveEvents(prev => prev.filter(e => e.id !== event.id));
    
    addNotification({
      id: `action-${event.id}`,
      message: `Claimed: ${event.reward}`,
      type: 'celebration',
      timestamp: new Date(),
      read: false
    });
  };

  const formatTimeRemaining = (event: TimeEvent) => {
    const elapsed = Math.floor((currentTime.getTime() - event.startTime.getTime()) / 1000);
    const remaining = Math.max(0, event.duration - elapsed);
    
    if (remaining >= 3600) {
      const hours = Math.floor(remaining / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);
      return `${hours}h ${minutes}m`;
    } else if (remaining >= 60) {
      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;
      return `${minutes}m ${seconds}s`;
    } else {
      return `${remaining}s`;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-400 bg-red-400/10';
      case 'medium': return 'border-yellow-400 bg-yellow-400/10';
      case 'low': return 'border-green-400 bg-green-400/10';
      default: return 'border-gray-400 bg-gray-400/10';
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Active Events Display */}
      <AnimatePresence>
        {activeEvents.map((event, index) => (
          <motion.div
            key={event.id}
            className={`fixed top-32 right-4 w-80 glass-card rounded-xl overflow-hidden border-2 ${getUrgencyColor(event.urgency)} z-30`}
            style={{ top: `${128 + index * 120}px` }}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className={`p-2 glass rounded-lg ${event.color}`}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <event.icon className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-bold text-sm">{event.title}</h3>
                    <div className="flex items-center space-x-2 text-xs">
                      <Timer className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400">{formatTimeRemaining(event)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveEvents(prev => prev.filter(e => e.id !== event.id))}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                {event.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-gray-400">Reward: </span>
                  <span className={`font-medium ${event.color}`}>{event.reward}</span>
                </div>
                <motion.button
                  onClick={() => handleEventAction(event)}
                  className="px-4 py-2 bg-gradient-primary text-white rounded-lg font-semibold text-sm hover:shadow-glow-purple transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {event.action}
                </motion.button>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <motion.div
                    className={`h-1 rounded-full bg-gradient-to-r from-${event.color.split('-')[1]}-400 to-${event.color.split('-')[1]}-600`}
                    initial={{ width: '100%' }}
                    animate={{ 
                      width: `${Math.max(0, (1 - (currentTime.getTime() - event.startTime.getTime()) / (event.duration * 1000)) * 100)}%`
                    }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};