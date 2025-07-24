import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Command, 
  ArrowRight, 
  Clock, 
  Star,
  Zap,
  Settings,
  Users,
  BarChart3,
  FileText,
  Calendar
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ElementType;
  category: string;
  shortcut?: string;
  action: () => void;
}

interface CommandBarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
  commands?: CommandItem[];
  recentCommands?: string[];
  className?: string;
}

const CommandBar: React.FC<CommandBarProps> = ({
  isOpen = false,
  onToggle,
  onClose,
  commands = [],
  recentCommands = [],
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredCommands, setFilteredCommands] = useState<CommandItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const defaultCommands: CommandItem[] = [
    {
      id: 'create-automation',
      title: 'Create New Automation',
      description: 'Set up a new automated workflow',
      icon: Zap,
      category: 'Automation',
      shortcut: 'Ctrl+N',
      action: () => console.log('Create automation')
    },
    {
      id: 'view-analytics',
      title: 'View Analytics Dashboard',
      description: 'Open performance metrics and insights',
      icon: BarChart3,
      category: 'Analytics',
      action: () => console.log('View analytics')
    },
    {
      id: 'manage-users',
      title: 'Manage Team Members',
      description: 'Add, remove, or edit user permissions',
      icon: Users,
      category: 'Team',
      action: () => console.log('Manage users')
    },
    {
      id: 'schedule-meeting',
      title: 'Schedule Meeting',
      description: 'Create a new calendar event',
      icon: Calendar,
      category: 'Calendar',
      action: () => console.log('Schedule meeting')
    },
    {
      id: 'generate-report',
      title: 'Generate Report',
      description: 'Create a custom performance report',
      icon: FileText,
      category: 'Reports',
      action: () => console.log('Generate report')
    },
    {
      id: 'settings',
      title: 'Open Settings',
      description: 'Configure application preferences',
      icon: Settings,
      category: 'Settings',
      action: () => console.log('Open settings')
    }
  ];

  const displayCommands = commands.length > 0 ? commands : defaultCommands;

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredCommands(displayCommands);
    } else {
      const filtered = displayCommands.filter(command =>
        command.title.toLowerCase().includes(query.toLowerCase()) ||
        command.description?.toLowerCase().includes(query.toLowerCase()) ||
        command.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCommands(filtered);
    }
    setSelectedIndex(0);
  }, [query, displayCommands]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onToggle?.();
      }

      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose?.();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            onClose?.();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onToggle, onClose]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-start justify-center pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Command Palette */}
        <motion.div
          className={`relative w-full max-w-2xl mx-4 glass-card shadow-glass overflow-hidden ${className}`}
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Search Input */}
          <div className="flex items-center p-4 border-b border-glass-border">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
            />
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">
                <Command className="w-3 h-3 inline mr-1" />K
              </kbd>
            </div>
          </div>

          {/* Commands List */}
          <div className="max-h-96 overflow-y-auto">
            {query.trim() === '' && recentCommands.length > 0 && (
              <div className="p-2">
                <div className="flex items-center space-x-2 px-3 py-2 text-gray-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Recent</span>
                </div>
                {/* Recent commands would be rendered here */}
              </div>
            )}

            {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
              <div key={category} className="p-2">
                <div className="px-3 py-2 text-gray-400 text-sm font-medium">
                  {category}
                </div>
                {categoryCommands.map((command, index) => {
                  const globalIndex = filteredCommands.indexOf(command);
                  const isSelected = globalIndex === selectedIndex;
                  const CommandIcon = command.icon;

                  return (
                    <motion.div
                      key={command.id}
                      className={`flex items-center justify-between px-3 py-3 mx-1 rounded-lg cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'bg-electric-blue bg-opacity-20 text-white' 
                          : 'text-gray-300 hover:bg-white hover:bg-opacity-5'
                      }`}
                      onClick={() => {
                        command.action();
                        onClose?.();
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          isSelected ? 'bg-electric-blue' : 'bg-gray-700'
                        }`}>
                          <CommandIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium">{command.title}</div>
                          {command.description && (
                            <div className="text-sm text-gray-400">
                              {command.description}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {command.shortcut && (
                          <kbd className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-400">
                            {command.shortcut}
                          </kbd>
                        )}
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}

            {filteredCommands.length === 0 && query.trim() !== '' && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-gray-400 mb-2">No commands found</p>
                <p className="text-gray-500 text-sm">
                  Try searching for something else or check your spelling
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-3 border-t border-glass-border text-xs text-gray-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-gray-700 rounded">↑↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-gray-700 rounded">↵</kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-gray-700 rounded">Esc</kbd>
                <span>Close</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3" />
              <span>Powered by AI</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommandBar;