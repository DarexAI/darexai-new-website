import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  MessageCircle, 
  Calendar, 
  BarChart3, 
  Search,
  Settings,
  Users,
  Zap,
  Plus,
  Star
} from 'lucide-react';

// Import all UI components
import NavigationBar from './ui/NavigationBar';
import Button from './ui/Button';
import Card, { CardSkeleton } from './ui/Card';
import ChatInterface from './ui/ChatInterface';
import TaskBoard, { Task } from './ui/TaskBoard';
import Tabs, { Tab } from './ui/Tabs';
import Calendar, { CalendarEvent } from './ui/Calendar';
import Analytics from './ui/Analytics';
import CommandBar from './ui/CommandBar';

const ComponentShowcase: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCommandBarOpen, setIsCommandBarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('components');

  // Sample data
  const sampleTasks: Task[] = [
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create a modern, conversion-focused design',
      status: 'in-progress',
      priority: 'high',
      assignee: { name: 'John Doe' },
      dueDate: new Date(Date.now() + 86400000),
      tags: ['design', 'frontend'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Implement user authentication',
      status: 'pending',
      priority: 'urgent',
      assignee: { name: 'Jane Smith' },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      title: 'Deploy to production',
      status: 'complete',
      priority: 'medium',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const sampleEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Team Standup',
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
      type: 'meeting',
      attendees: ['team@company.com']
    },
    {
      id: '2',
      title: 'Product Demo',
      startTime: new Date(Date.now() + 86400000),
      endTime: new Date(Date.now() + 86400000 + 3600000),
      type: 'event',
      location: 'Conference Room A'
    }
  ];

  const showcaseTabs: Tab[] = [
    { id: 'components', label: 'Components', icon: <Cpu className="w-4 h-4" /> },
    { id: 'navigation', label: 'Navigation', icon: <Settings className="w-4 h-4" /> },
    { id: 'data', label: 'Data Display', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'interaction', label: 'Interaction', icon: <MessageCircle className="w-4 h-4" /> }
  ];

  const user = {
    name: 'Alex Johnson',
    email: 'alex@darexai.com',
    avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  };

  return (
    <div className="min-h-screen bg-dark">
      {/* Navigation */}
      <NavigationBar
        darkMode={darkMode}
        onThemeToggle={() => setDarkMode(!darkMode)}
        user={user}
        onSearch={(query) => console.log('Search:', query)}
      />

      {/* Main Content */}
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
              Dare XAI <span className="text-gradient">Component Library</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A comprehensive collection of enterprise-grade UI components built with React, 
              TypeScript, and Tailwind CSS for modern automation platforms.
            </p>
          </motion.div>

          {/* Component Showcase Tabs */}
          <Tabs
            tabs={showcaseTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="pills"
            fullWidth={false}
            className="mb-12"
          >
            {/* Components Tab */}
            {activeTab === 'components' && (
              <div className="space-y-12">
                {/* Buttons Section */}
                <section>
                  <h2 className="text-2xl font-heading font-bold text-white mb-6">Buttons</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card title="Primary Buttons" className="p-6">
                      <div className="space-y-4">
                        <Button variant="primary" size="sm">Small Button</Button>
                        <Button variant="primary" size="md">Medium Button</Button>
                        <Button variant="primary" size="lg">Large Button</Button>
                        <Button variant="primary" loading>Loading...</Button>
                        <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
                          With Icon
                        </Button>
                      </div>
                    </Card>

                    <Card title="Secondary Buttons" className="p-6">
                      <div className="space-y-4">
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="secondary" disabled>Disabled</Button>
                        <Button variant="secondary" fullWidth>Full Width</Button>
                        <Button 
                          variant="secondary" 
                          icon={<Star className="w-4 h-4" />}
                          iconPosition="right"
                        >
                          Icon Right
                        </Button>
                      </div>
                    </Card>

                    <Card title="Ghost Buttons" className="p-6">
                      <div className="space-y-4">
                        <Button variant="ghost">Ghost Button</Button>
                        <Button variant="ghost" icon={<Settings className="w-4 h-4" />} />
                        <Button variant="ghost" size="sm">Small Ghost</Button>
                        <Button variant="ghost" size="lg">Large Ghost</Button>
                      </div>
                    </Card>
                  </div>
                </section>

                {/* Cards Section */}
                <section>
                  <h2 className="text-2xl font-heading font-bold text-white mb-6">Cards</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card
                      title="Basic Card"
                      subtitle="Simple card with title and subtitle"
                      icon={<Cpu className="w-6 h-6 text-electric-blue" />}
                    >
                      <p className="text-gray-300">
                        This is a basic card component with an icon, title, subtitle, and content area.
                      </p>
                    </Card>

                    <Card
                      title="Gradient Card"
                      subtitle="Card with gradient border"
                      gradient={true}
                      icon={<Zap className="w-6 h-6 text-neon-purple" />}
                    >
                      <p className="text-gray-300">
                        This card features a gradient border effect for enhanced visual appeal.
                      </p>
                    </Card>

                    <Card
                      title="Interactive Card"
                      subtitle="Clickable card with hover effects"
                      onClick={() => alert('Card clicked!')}
                      icon={<MessageCircle className="w-6 h-6 text-success-green" />}
                    >
                      <p className="text-gray-300">
                        Click this card to see the interaction in action.
                      </p>
                    </Card>

                    <Card loading className="p-6">
                      <p className="text-gray-300">Loading card state</p>
                    </Card>

                    <CardSkeleton />

                    <Card
                      image="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
                      title="Card with Image"
                      subtitle="Featuring a header image"
                    >
                      <p className="text-gray-300">
                        Cards can include header images for richer content presentation.
                      </p>
                    </Card>
                  </div>
                </section>
              </div>
            )}

            {/* Navigation Tab */}
            {activeTab === 'navigation' && (
              <div className="space-y-12">
                <section>
                  <h2 className="text-2xl font-heading font-bold text-white mb-6">Navigation Components</h2>
                  <Card className="p-6">
                    <p className="text-gray-300 mb-4">
                      The navigation bar is already visible at the top of this page. It includes:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                      <li>Responsive design with mobile hamburger menu</li>
                      <li>Search functionality with AI command integration</li>
                      <li>Theme toggle (light/dark mode)</li>
                      <li>User profile dropdown with avatar support</li>
                      <li>Smooth scroll effects and glass morphism styling</li>
                    </ul>
                  </Card>
                </section>

                <section>
                  <h2 className="text-2xl font-heading font-bold text-white mb-6">Tab Navigation</h2>
                  <Card className="p-6">
                    <Tabs
                      tabs={[
                        { id: 'tab1', label: 'Tab One', icon: <Star className="w-4 h-4" /> },
                        { id: 'tab2', label: 'Tab Two', badge: '3' },
                        { id: 'tab3', label: 'Tab Three' },
                        { id: 'tab4', label: 'Disabled', disabled: true }
                      ]}
                      variant="underline"
                    >
                      <div className="p-4 glass rounded-glass">
                        <p className="text-gray-300">Tab content goes here. Switch between tabs to see the smooth transitions.</p>
                      </div>
                    </Tabs>
                  </Card>
                </section>
              </div>
            )}

            {/* Data Display Tab */}
            {activeTab === 'data' && (
              <div className="space-y-12">
                <section>
                  <h2 className="text-2xl font-heading font-bold text-white mb-6">Task Management</h2>
                  <TaskBoard
                    tasks={sampleTasks}
                    onTaskCreate={(task) => console.log('Create task:', task)}
                    onTaskUpdate={(id, updates) => console.log('Update task:', id, updates)}
                  />
                </section>

                <section>
                  <h2 className="text-2xl font-heading font-bold text-white mb-6">Analytics Dashboard</h2>
                  <Analytics />
                </section>

                <section>
                  <h2 className="text-2xl font-heading font-bold text-white mb-6">Calendar</h2>
                  <Calendar
                    events={sampleEvents}
                    onEventCreate={(event) => console.log('Create event:', event)}
                  />
                </section>
              </div>
            )}

            {/* Interaction Tab */}
            {activeTab === 'interaction' && (
              <div className="space-y-12">
                <section>
                  <h2 className="text-2xl font-heading font-bold text-white mb-6">Interactive Components</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card title="Chat Interface" className="p-6">
                      <p className="text-gray-300 mb-4">
                        Click the button below to open the AI chat interface.
                      </p>
                      <Button
                        variant="primary"
                        onClick={() => setIsChatOpen(true)}
                        icon={<MessageCircle className="w-4 h-4" />}
                      >
                        Open Chat
                      </Button>
                    </Card>

                    <Card title="Command Bar" className="p-6">
                      <p className="text-gray-300 mb-4">
                        Press Cmd/Ctrl + K or click the button to open the command palette.
                      </p>
                      <Button
                        variant="secondary"
                        onClick={() => setIsCommandBarOpen(true)}
                        icon={<Search className="w-4 h-4" />}
                      >
                        Open Command Bar
                      </Button>
                    </Card>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-heading font-bold text-white mb-6">Component Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card title="Accessibility" icon={<Users className="w-6 h-6 text-electric-blue" />}>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• WCAG 2.1 compliant</li>
                        <li>• Keyboard navigation</li>
                        <li>• Screen reader support</li>
                        <li>• Focus management</li>
                      </ul>
                    </Card>

                    <Card title="Responsive Design" icon={<Settings className="w-6 h-6 text-neon-purple" />}>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Mobile-first approach</li>
                        <li>• Flexible breakpoints</li>
                        <li>• Touch-optimized</li>
                        <li>• Adaptive layouts</li>
                      </ul>
                    </Card>

                    <Card title="Performance" icon={<Zap className="w-6 h-6 text-success-green" />}>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Optimized animations</li>
                        <li>• Lazy loading</li>
                        <li>• Minimal bundle size</li>
                        <li>• Efficient rendering</li>
                      </ul>
                    </Card>
                  </div>
                </section>
              </div>
            )}
          </Tabs>
        </div>
      </div>

      {/* Chat Interface */}
      <ChatInterface
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        messages={[
          {
            id: '1',
            content: 'Hello! How can I help you with the component library today?',
            sender: 'ai',
            timestamp: new Date()
          },
          {
            id: '2',
            content: 'I need help implementing the task board component.',
            sender: 'user',
            timestamp: new Date()
          },
          {
            id: '3',
            content: 'I can help you with that! The TaskBoard component supports drag-and-drop functionality and custom status columns. Here\'s a code example:',
            sender: 'ai',
            timestamp: new Date(),
            type: 'code'
          }
        ]}
        onSendMessage={(message) => console.log('Send message:', message)}
      />

      {/* Command Bar */}
      <CommandBar
        isOpen={isCommandBarOpen}
        onToggle={() => setIsCommandBarOpen(!isCommandBarOpen)}
        onClose={() => setIsCommandBarOpen(false)}
      />
    </div>
  );
};

export default ComponentShowcase;