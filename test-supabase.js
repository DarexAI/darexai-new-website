#!/usr/bin/env node

/**
 * Simple Node.js test script to verify Supabase configuration
 * Run with: node test-supabase.js
 */

console.log('🚀 Testing Supabase Configuration...\n');

// Check if .env file exists
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env file not found');
  console.log('💡 Create a .env file with your Supabase credentials');
  process.exit(1);
}

// Load .env file
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY;

console.log('📋 Environment Check:');
console.log('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('\n❌ Missing Supabase environment variables');
  process.exit(1);
}

// Validate URL format
if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
  console.error('\n❌ Invalid VITE_SUPABASE_URL format');
  console.log('Expected: https://your-project.supabase.co');
  console.log('Got:', supabaseUrl);
  process.exit(1);
}

console.log('\n✅ Basic configuration looks good!');
console.log('\n📱 Next steps:');
console.log('1. Run: npm run dev');
console.log('2. Visit: http://localhost:5173/supabase-test');
console.log('3. Check the detailed test results');

console.log('\n🔧 If issues persist:');
console.log('- Verify your Supabase project is not paused');
console.log('- Check database tables exist');
console.log('- Ensure RLS policies are configured correctly');