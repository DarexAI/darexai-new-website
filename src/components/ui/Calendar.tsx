import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock,
  MapPin,
  Users,
  MoreHorizontal
} from 'lucide-react';
import Button from './Button';
import Card from './Card';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  attendees?: string[];
  color?: string;
  type?: 'meeting' | 'task' | 'reminder' | 'event';
}

interface CalendarProps {
  events?: CalendarEvent[];
  view?: 'month' | 'week' | 'day';
  onViewChange?: (view: 'month' | 'week' | 'day') => void;
  onEventCreate?: (event: Omit<CalendarEvent, 'id'>) => void;
  onEventUpdate?: (eventId: string, updates: Partial<CalendarEvent>) => void;
  onEventDelete?: (eventId: string) => void;
  className?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  events = [],
  view = 'month',
  onViewChange,
  onEventCreate,
  onEventUpdate,
  onEventDelete,
  className = ''
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getEventColor = (event: CalendarEvent) => {
    if (event.color) return event.color;
    
    switch (event.type) {
      case 'meeting': return 'bg-electric-blue';
      case 'task': return 'bg-neon-purple';
      case 'reminder': return 'bg-warning-orange';
      case 'event': return 'bg-success-green';
      default: return 'bg-electric-blue';
    }
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {dayNames.map(day => (
          <div key={day} className="p-3 text-center text-gray-400 font-medium text-sm">
            {day}
          </div>
        ))}
        
        {/* Calendar Days */}
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className="p-2 h-24"></div>;
          }
          
          const dayEvents = getEventsForDate(day);
          const isToday = day.toDateString() === new Date().toDateString();
          const isSelected = selectedDate?.toDateString() === day.toDateString();
          
          return (
            <motion.div
              key={day.toISOString()}
              className={`p-2 h-24 glass-card cursor-pointer transition-all duration-300 ${
                isToday ? 'ring-2 ring-electric-blue' : ''
              } ${isSelected ? 'bg-electric-blue bg-opacity-20' : ''}`}
              onClick={() => setSelectedDate(day)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col h-full">
                <div className={`text-sm font-medium mb-1 ${
                  isToday ? 'text-electric-blue' : 'text-white'
                }`}>
                  {day.getDate()}
                </div>
                
                <div className="flex-1 space-y-1 overflow-hidden">
                  {dayEvents.slice(0, 2).map(event => (
                    <div
                      key={event.id}
                      className={`px-1 py-0.5 rounded text-xs text-white truncate ${getEventColor(event)}`}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-400">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    // Simplified week view - would need more complex logic for full implementation
    return (
      <div className="text-center text-gray-400 py-8">
        Week view coming soon...
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = selectedDate ? getEventsForDate(selectedDate) : [];
    
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-heading font-semibold text-white">
            {selectedDate ? selectedDate.toLocaleDateString([], { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : 'Select a date'}
          </h3>
        </div>
        
        {dayEvents.length > 0 ? (
          <div className="space-y-3">
            {dayEvents.map(event => (
              <Card key={event.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-white mb-1">{event.title}</h4>
                    {event.description && (
                      <p className="text-gray-400 text-sm mb-2">{event.description}</p>
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        </span>
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      
                      {event.attendees && event.attendees.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees.length} attendees</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<MoreHorizontal className="w-4 h-4" />}
                  />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-400 mb-4">No events scheduled</p>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => {
                if (onEventCreate && selectedDate) {
                  onEventCreate({
                    title: 'New Event',
                    startTime: selectedDate,
                    endTime: new Date(selectedDate.getTime() + 60 * 60 * 1000), // 1 hour later
                    type: 'event'
                  });
                }
              }}
            >
              Create Event
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className={`p-6 ${className}`}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-heading font-bold text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              icon={<ChevronLeft className="w-4 h-4" />}
              onClick={() => navigateMonth('prev')}
            />
            <Button
              variant="ghost"
              size="sm"
              icon={<ChevronRight className="w-4 h-4" />}
              onClick={() => navigateMonth('next')}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* View Toggle */}
          <div className="glass p-1 rounded-glass">
            {(['month', 'week', 'day'] as const).map((viewOption) => (
              <Button
                key={viewOption}
                variant={view === viewOption ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onViewChange?.(viewOption)}
              >
                {viewOption.charAt(0).toUpperCase() + viewOption.slice(1)}
              </Button>
            ))}
          </div>
          
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => {
              if (onEventCreate) {
                onEventCreate({
                  title: 'New Event',
                  startTime: new Date(),
                  endTime: new Date(Date.now() + 60 * 60 * 1000),
                  type: 'event'
                });
              }
            }}
          >
            Add Event
          </Button>
        </div>
      </div>

      {/* Calendar Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {view === 'month' && renderMonthView()}
          {view === 'week' && renderWeekView()}
          {view === 'day' && renderDayView()}
        </motion.div>
      </AnimatePresence>
    </Card>
  );
};

export default Calendar;