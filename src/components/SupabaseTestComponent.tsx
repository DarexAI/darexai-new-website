import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle, RefreshCw } from 'lucide-react';
import { SupabaseConnectionTest, ConnectionTestResult } from '../utils/supabaseTest';

const SupabaseTestComponent: React.FC = () => {
  const [testResults, setTestResults] = useState<ConnectionTestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const runTests = async () => {
    setIsLoading(true);
    try {
      const results = await SupabaseConnectionTest.testConnection();
      setTestResults(results);
      setHasRun(true);
    } catch (error) {
      console.error('Failed to run tests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Auto-run tests on component mount
    runTests();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-green-500/20 bg-green-500/10';
      case 'warning':
        return 'border-yellow-500/20 bg-yellow-500/10';
      case 'error':
        return 'border-red-500/20 bg-red-500/10';
      default:
        return 'border-gray-500/20 bg-gray-500/10';
    }
  };

  const summary = {
    total: testResults.length,
    success: testResults.filter(r => r.status === 'success').length,
    warning: testResults.filter(r => r.status === 'warning').length,
    error: testResults.filter(r => r.status === 'error').length,
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
          Supabase Connection Test
        </h2>
        <p className="text-gray-400">
          Verify your Supabase configuration and connection status
        </p>
        
        <button
          onClick={runTests}
          disabled={isLoading}
          className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 rounded-lg font-medium transition-colors text-white"
        >
          {isLoading ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4 mr-2" />
          )}
          {isLoading ? 'Running Tests...' : 'Run Tests'}
        </button>
      </div>

      {/* Summary */}
      {hasRun && (
        <motion.div
          className="grid grid-cols-4 gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{summary.total}</div>
            <div className="text-sm text-gray-400">Total Tests</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{summary.success}</div>
            <div className="text-sm text-gray-400">Passed</div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">{summary.warning}</div>
            <div className="text-sm text-gray-400">Warnings</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-500">{summary.error}</div>
            <div className="text-sm text-gray-400">Errors</div>
          </div>
        </motion.div>
      )}

      {/* Test Results */}
      {hasRun && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-white">Test Results</h3>
          
          <div className="space-y-3">
            {testResults.map((result, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg border ${getStatusColor(result.status)}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="flex items-start space-x-3">
                  {getStatusIcon(result.status)}
                  <div className="flex-1">
                    <div className="font-medium text-white">
                      Test {index + 1}: {result.message}
                    </div>
                    {result.details && (
                      <div className="mt-1 text-sm text-gray-400">
                        {result.details}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Configuration Tips */}
      {hasRun && summary.error > 0 && (
        <motion.div
          className="bg-red-500/10 border border-red-500/20 rounded-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h4 className="text-lg font-semibold text-red-400 mb-3">Configuration Tips</h4>
          <div className="space-y-2 text-sm text-gray-300">
            <div>• Check your <code className="bg-gray-800 px-2 py-1 rounded">.env</code> file contains valid VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY</div>
            <div>• Ensure your Supabase URL follows the format: <code className="bg-gray-800 px-2 py-1 rounded">https://your-project.supabase.co</code></div>
            <div>• Verify your Supabase project is active and not paused</div>
            <div>• Check your database tables exist and RLS policies are configured correctly</div>
            <div>• Make sure your anon key has the correct permissions</div>
          </div>
        </motion.div>
      )}

      {/* Success Message */}
      {hasRun && summary.error === 0 && summary.warning === 0 && (
        <motion.div
          className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h4 className="text-lg font-semibold text-green-400 mb-2">All Tests Passed!</h4>
          <p className="text-gray-300">Your Supabase configuration is working correctly.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SupabaseTestComponent;