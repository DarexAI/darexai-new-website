// Simple Supabase connection test for Node.js
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
try {
  const envPath = join(__dirname, '.env');
  const envFile = readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  });
  
  // Set environment variables
  Object.assign(process.env, envVars);
} catch (error) {
  console.error('Failed to load .env file:', error.message);
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('🔍 Supabase Connection Test');
console.log('=' .repeat(40));

console.log('\n📋 Environment Variables Check:');
console.log('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('\n❌ Missing required Supabase environment variables');
  console.log('\n🔧 Fix: Ensure your .env file contains:');
  console.log('VITE_SUPABASE_URL=https://your-project.supabase.co');
  console.log('VITE_SUPABASE_ANON_KEY=your_anon_key_here');
  process.exit(1);
}

// Validate URL format
if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
  console.error('\n❌ Invalid VITE_SUPABASE_URL format');
  console.log('Expected format: https://your-project.supabase.co');
  console.log('Current value:', supabaseUrl);
  process.exit(1);
}

// Test Supabase connection
console.log('\n🔌 Testing Supabase Connection...');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  const tests = [];
  
  try {
    // Test 1: Basic auth connection
    console.log('\n1️⃣ Testing authentication connection...');
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.log('❌ Auth connection failed:', authError.message);
      tests.push({ name: 'Auth Connection', status: 'failed', error: authError.message });
    } else {
      console.log('✅ Authentication connection successful');
      tests.push({ name: 'Auth Connection', status: 'passed' });
    }
    
    // Test 2: Database connection (demo_requests table)
    console.log('\n2️⃣ Testing database connection (demo_requests)...');
    const { data: demoData, error: demoError } = await supabase
      .from('demo_requests')
      .select('count')
      .limit(1);
    
    if (demoError) {
      if (demoError.code === '42P01') {
        console.log('⚠️ demo_requests table does not exist (this is expected if not created yet)');
        tests.push({ name: 'Demo Requests Table', status: 'warning', error: 'Table does not exist' });
      } else {
        console.log('❌ Database connection failed:', demoError.message);
        tests.push({ name: 'Demo Requests Table', status: 'failed', error: demoError.message });
      }
    } else {
      console.log('✅ Database connection successful');
      tests.push({ name: 'Demo Requests Table', status: 'passed' });
    }
    
    // Test 3: Booking table
    console.log('\n3️⃣ Testing demo_bookings table...');
    const { data: bookingData, error: bookingError } = await supabase
      .from('demo_bookings')
      .select('count')
      .limit(1);
    
    if (bookingError) {
      if (bookingError.code === '42P01') {
        console.log('⚠️ demo_bookings table does not exist (this is expected if not created yet)');
        tests.push({ name: 'Demo Bookings Table', status: 'warning', error: 'Table does not exist' });
      } else if (bookingError.code === '42501') {
        console.log('⚠️ RLS policy may be restricting access to demo_bookings');
        tests.push({ name: 'Demo Bookings Table', status: 'warning', error: 'RLS policy restriction' });
      } else {
        console.log('❌ demo_bookings table access failed:', bookingError.message);
        tests.push({ name: 'Demo Bookings Table', status: 'failed', error: bookingError.message });
      }
    } else {
      console.log('✅ demo_bookings table access successful');
      tests.push({ name: 'Demo Bookings Table', status: 'passed' });
    }
    
  } catch (error) {
    console.error('\n❌ Unexpected error during testing:', error.message);
    tests.push({ name: 'General', status: 'failed', error: error.message });
  }
  
  // Summary
  console.log('\n📊 Test Summary:');
  console.log('=' .repeat(40));
  
  const passed = tests.filter(t => t.status === 'passed').length;
  const warnings = tests.filter(t => t.status === 'warning').length;
  const failed = tests.filter(t => t.status === 'failed').length;
  
  console.log(`✅ Passed: ${passed}`);
  console.log(`⚠️ Warnings: ${warnings}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (failed === 0 && warnings === 0) {
    console.log('\n🎉 All tests passed! Supabase is configured correctly.');
  } else if (failed === 0) {
    console.log('\n✅ Connection successful with warnings. Some features may not be available yet.');
  } else {
    console.log('\n🔧 Please fix the failed tests above.');
  }
  
  return { passed, warnings, failed, tests };
}

testConnection().catch(console.error);