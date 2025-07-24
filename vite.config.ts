import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  optimizeDeps: {
    include: ['framer-motion', 'lucide-react', '@supabase/supabase-js']
  },
  build: {
    target: 'es2015',
    cssCodeSplit: false,
    assetsDir: 'assets',
    assetsInlineLimit: 4096, // 4kb
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
          utils: ['@supabase/supabase-js'],
          seo: ['react-helmet-async']
        }
      }
    },
    minify: 'esbuild',
    sourcemap: false,
    reportCompressedSize: false
  },
  server: {
    host: true
  },
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  }
});
