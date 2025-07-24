import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Loader, 
  Cpu, 
  Database, 
  Globe, 
  Lock, 
  RefreshCw,
  Server,
  Wifi,
  HardDrive,
  Clock,
  Shield
} from 'lucide-react';
import { SystemDiagnosticsService } from '../utils/supabase';

interface DiagnosticItem {
  id: string;
  component: string;
  status: 'pass' | 'fail' | 'warning' | 'checking';
  message: string;
  details?: string;
  timestamp: Date;
  icon: React.ElementType;
  category: 'system' | 'security' | 'performance' | 'connectivity';
}

const SystemDiagnostics: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<DiagnosticItem[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [lastRun, setLastRun] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // Load previous diagnostics from localStorage for demo purposes
    const savedDiagnostics = localStorage.getItem('system_diagnostics');
    if (savedDiagnostics) {
      const parsed = JSON.parse(savedDiagnostics);
      setDiagnostics(parsed.map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      })));
      setLastRun(new Date(parsed[0]?.timestamp || Date.now()));
    }
  }, []);

  const runDiagnostics = async () => {
    setIsRunning(true);
    
    // Clear previous results
    setDiagnostics([]);
    
    // Define diagnostic checks
    const checks: Omit<DiagnosticItem, 'id' | 'timestamp'>[] = [
      {
        component: 'Database Connection',
        status: 'checking',
        message: 'Checking database connectivity...',
        icon: Database,
        category: 'connectivity'
      },
      {
        component: 'API Services',
        status: 'checking',
        message: 'Verifying API endpoints...',
        icon: Globe,
        category: 'connectivity'
      },
      {
        component: 'Authentication',
        status: 'checking',
        message: 'Testing authentication services...',
        icon: Lock,
        category: 'security'
      },
      {
        component: 'Storage',
        status: 'checking',
        message: 'Checking storage availability...',
        icon: HardDrive,
        category: 'system'
      },
      {
        component: 'Network Latency',
        status: 'checking',
        message: 'Measuring network performance...',
        icon: Wifi,
        category: 'performance'
      },
      {
        component: 'Server Health',
        status: 'checking',
        message: 'Checking server status...',
        icon: Server,
        category: 'system'
      },
      {
        component: 'Security Scan',
        status: 'checking',
        message: 'Running security scan...',
        icon: Shield,
        category: 'security'
      },
      {
        component: 'Response Time',
        status: 'checking',
        message: 'Measuring response times...',
        icon: Clock,
        category: 'performance'
      }
    ];
    
    // Add initial checking state for all diagnostics
    const initialDiagnostics = checks.map((check, index) => ({
      ...check,
      id: `diag-${Date.now()}-${index}`,
      timestamp: new Date()
    }));
    
    setDiagnostics(initialDiagnostics);
    
    // Simulate running diagnostics with random results
    for (let i = 0; i < checks.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      // Generate a random result
      const random = Math.random();
      let status: 'pass' | 'fail' | 'warning';
      let message: string;
      let details: string | undefined;
      
      if (random > 0.8) {
        status = 'fail';
        message = `${checks[i].component} check failed`;
        details = `Error connecting to ${checks[i].component.toLowerCase()}. Please check your configuration.`;
      } else if (random > 0.6) {
        status = 'warning';
        message = `${checks[i].component} has potential issues`;
        details = `Performance degradation detected in ${checks[i].component.toLowerCase()}. Monitor for further issues.`;
      } else {
        status = 'pass';
        message = `${checks[i].component} is functioning properly`;
        details = `All ${checks[i].component.toLowerCase()} tests passed successfully.`;
      }
      
      // Update the diagnostic item
      setDiagnostics(prev => {
        const updated = [...prev];
        updated[i] = {
          ...updated[i],
          status,
          message,
          details
        };
        return updated;
      });
      
      // Log to Supabase (simulated)
      try {
        console.log('Logging diagnostic to Supabase:', {
          component: checks[i].component,
          status,
          message,
          details
        });
        
        // In a real implementation, this would use the actual user ID
        // await SystemDiagnosticsService.logDiagnostic(
        //   'user123',
        //   checks[i].component,
        //   status,
        //   message,
        //   details
        // );
      } catch (error) {
        console.error('Error logging diagnostic:', error);
      }
    }
    
    setIsRunning(false);
    setLastRun(new Date());
    
    // Save to localStorage for demo purposes
    localStorage.setItem('system_diagnostics', JSON.stringify(diagnostics));
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-success-green" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-error-red" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning-orange" />;
      case 'checking':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader className="w-5 h-5 text-electric-blue" />
          </motion.div>
        );
      default:
        return null;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'bg-success-green/20 text-success-green';
      case 'fail':
        return 'bg-error-red/20 text-error-red';
      case 'warning':
        return 'bg-warning-orange/20 text-warning-orange';
      case 'checking':
        return 'bg-electric-blue/20 text-electric-blue';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };
  
  const filteredDiagnostics = selectedCategory === 'all'
    ? diagnostics
    : diagnostics.filter(diag => diag.category === selectedCategory);
  
  const categories = [
    { id: 'all', label: 'All Checks', icon: Cpu },
    { id: 'system', label: 'System', icon: Server },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'performance', label: 'Performance', icon: Clock },
    { id: 'connectivity', label: 'Connectivity', icon: Wifi }
  ];
  
  const getOverallStatus = () => {
    if (diagnostics.length === 0) return 'unknown';
    if (diagnostics.some(d => d.status === 'checking')) return 'checking';
    if (diagnostics.some(d => d.status === 'fail')) return 'fail';
    if (diagnostics.some(d => d.status === 'warning')) return 'warning';
    return 'pass';
  };
  
  const overallStatus = getOverallStatus();
  
  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-12">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center glass px-6 py-3 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Cpu className="w-4 h-4 text-neon-cyan mr-2" />
            <span className="text-sm font-medium text-neon-cyan">System Health</span>
          </motion.div>

          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
            System <span className="text-gradient">Diagnostics</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive health check of your AI automation platform components
          </p>
        </motion.div>
        
        {/* Overall Status */}
        <motion.div
          className="glass-card p-8 rounded-3xl mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                overallStatus === 'pass' ? 'bg-success-green/20' :
                overallStatus === 'fail' ? 'bg-error-red/20' :
                overallStatus === 'warning' ? 'bg-warning-orange/20' :
                'bg-electric-blue/20'
              }`}>
                {overallStatus === 'pass' && <CheckCircle className="w-8 h-8 text-success-green" />}
                {overallStatus === 'fail' && <XCircle className="w-8 h-8 text-error-red" />}
                {overallStatus === 'warning' && <AlertTriangle className="w-8 h-8 text-warning-orange" />}
                {overallStatus === 'checking' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader className="w-8 h-8 text-electric-blue" />
                  </motion.div>
                )}
                {overallStatus === 'unknown' && <Cpu className="w-8 h-8 text-gray-400" />}
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {overallStatus === 'pass' && 'All Systems Operational'}
                  {overallStatus === 'fail' && 'System Issues Detected'}
                  {overallStatus === 'warning' && 'System Warnings Present'}
                  {overallStatus === 'checking' && 'Running Diagnostics...'}
                  {overallStatus === 'unknown' && 'System Status Unknown'}
                </h2>
                <p className="text-gray-400">
                  {lastRun 
                    ? `Last checked: ${lastRun.toLocaleString()}`
                    : 'Run diagnostics to check system status'
                  }
                </p>
              </div>
            </div>
            
            <motion.button
              onClick={runDiagnostics}
              disabled={isRunning}
              className="px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              whileHover={{ scale: isRunning ? 1 : 1.05 }}
              whileTap={{ scale: isRunning ? 1 : 0.95 }}
            >
              {isRunning ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Loader className="w-5 h-5" />
                  </motion.div>
                  Running Diagnostics...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Run Diagnostics
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
        
        {/* Category Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-primary text-white'
                    : 'glass text-gray-300 hover:text-white'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Diagnostics List */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredDiagnostics.length > 0 ? (
            filteredDiagnostics.map((diagnostic, index) => (
              <motion.div
                key={diagnostic.id}
                className="glass-card p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${getStatusColor(diagnostic.status)}`}>
                      {getStatusIcon(diagnostic.status)}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{diagnostic.component}</h3>
                      <p className="text-gray-300 mb-2">{diagnostic.message}</p>
                      
                      {diagnostic.details && (
                        <div className="glass p-3 rounded-lg text-sm text-gray-400 mt-2">
                          {diagnostic.details}
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-500 mt-2">
                        {diagnostic.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-3 py-1 glass rounded-full text-xs text-gray-400">
                    {diagnostic.category}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Cpu className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Diagnostics Run</h3>
              <p className="text-gray-400 mb-6">
                Run a system diagnostic to check the health of your platform
              </p>
              <motion.button
                onClick={runDiagnostics}
                disabled={isRunning}
                className="px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow-cyan transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Run Diagnostics
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SystemDiagnostics;