// Supabase Connection Test Utility
import { supabase } from './supabase';

export interface ConnectionTestResult {
  status: 'success' | 'error' | 'warning';
  message: string;
  details?: string | undefined;
  timestamp?: string;
}

export class SupabaseConnectionTest {
  static async testConnection(): Promise<ConnectionTestResult[]> {
    const results: ConnectionTestResult[] = [];
    const timestamp = new Date().toISOString();
    
    try {
      // Test 1: Environment Variables
      const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;
      
      // Validate environment variables exist
      if (!supabaseUrl) {
        results.push({
          status: 'error',
          message: 'VITE_SUPABASE_URL environment variable is missing',
          timestamp
        });
      } else if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
        results.push({
          status: 'error',
          message: 'VITE_SUPABASE_URL format is invalid',
          details: 'Expected format: https://your-project.supabase.co',
          timestamp
        });
      } else {
        results.push({
          status: 'success',
          message: 'VITE_SUPABASE_URL is configured correctly',
          timestamp
        });
      }
      
      if (!supabaseAnonKey) {
        results.push({
          status: 'error',
          message: 'VITE_SUPABASE_ANON_KEY environment variable is missing',
          timestamp
        });
      } else if (supabaseAnonKey.length < 100) {
        results.push({
          status: 'warning',
          message: 'VITE_SUPABASE_ANON_KEY seems too short',
          details: 'Supabase anon keys are typically longer. Please verify this is correct.',
          timestamp
        });
      } else {
        results.push({
          status: 'success',
          message: 'VITE_SUPABASE_ANON_KEY is configured',
          timestamp
        });
      }
      
      // Test 2: Basic Connection
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          results.push({
            status: 'error',
            message: 'Failed to establish Supabase connection',
            details: error.message,
            timestamp
          });
        } else {
          results.push({
            status: 'success',
            message: 'Successfully connected to Supabase',
            timestamp
          });
        }
      } catch (authError: any) {
        results.push({
          status: 'error',
          message: 'Auth connection failed',
          details: authError?.message || 'Unknown auth error',
          timestamp
        });
      }
      
      // Test 3: Database Access (demo_requests table)
      try {
        const { data, error } = await supabase
          .from('demo_requests')
          .select('count')
          .limit(1);
        
        if (error) {
          if (error.code === '42P01') {
            results.push({
              status: 'warning',
              message: 'demo_requests table does not exist',
              details: 'This is expected if you haven\'t created the table yet',
              timestamp
            });
          } else {
            results.push({
              status: 'error',
              message: 'Database access error',
              details: error.message,
              timestamp
            });
          }
        } else {
          results.push({
            status: 'success',
            message: 'Database access successful',
            timestamp
          });
        }
      } catch (dbError: any) {
        results.push({
          status: 'error',
          message: 'Database connection failed',
          details: dbError?.message || 'Unknown database error',
          timestamp
        });
      }
      
      // Test 4: RLS Policies (demo_bookings table)
      try {
        const { data, error } = await supabase
          .from('demo_bookings')
          .select('count')
          .limit(1);
        
        if (error) {
          if (error.code === '42P01') {
            results.push({
              status: 'warning',
              message: 'demo_bookings table does not exist',
              details: 'This is expected if you haven\'t created the table yet',
              timestamp
            });
          } else if (error.code === '42501') {
            results.push({
              status: 'warning',
              message: 'RLS policy may be restricting access to demo_bookings',
              details: 'Check if Row Level Security policies are correctly configured',
              timestamp
            });
          } else {
            results.push({
              status: 'error',
              message: 'demo_bookings table access error',
              details: error.message,
              timestamp
            });
          }
        } else {
          results.push({
            status: 'success',
            message: 'demo_bookings table access successful',
            timestamp
          });
        }
      } catch (bookingError: any) {
        results.push({
          status: 'error',
          message: 'demo_bookings table connection failed',
          details: bookingError?.message || 'Unknown booking table error',
          timestamp
        });
      }
      
    } catch (error: any) {
      results.push({
        status: 'error',
        message: 'Unexpected error during connection test',
        details: error?.message || 'Unknown error occurred',
        timestamp
      });
    }
    
    return results;
  }
  
  static async logTestResults(): Promise<void> {
    try {
      console.log('🔍 Running Supabase Connection Tests...\n');
      
      const results = await this.testConnection();
      
      results.forEach((result, index) => {
        const emoji = result.status === 'success' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
        console.log(`${emoji} Test ${index + 1}: ${result.message}`);
        if (result.details) {
          console.log(`   Details: ${result.details}`);
        }
      });
      
      const hasErrors = results.some(r => r.status === 'error');
      const hasWarnings = results.some(r => r.status === 'warning');
      
      console.log('\n📊 Summary:');
      if (!hasErrors && !hasWarnings) {
        console.log('✅ All tests passed - Supabase is configured correctly!');
      } else if (hasErrors) {
        console.log('❌ Some tests failed - please check your Supabase configuration');
      } else if (hasWarnings) {
        console.log('⚠️ Tests passed with warnings - some features may not be available');
      }
    } catch (error) {
      console.error('Failed to run Supabase tests:', error);
    }
  }
}

// Export for direct testing
export default SupabaseConnectionTest;