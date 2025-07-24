/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        'dark': '#0F1419',
        'dark-lighter': '#1C2128',
        'dark-card': '#21262D',
        'ai-blue': '#2563EB',
        'ai-indigo': '#4F46E5',
        'ai-purple': '#7C3AED',
        'ai-teal': '#0D9488',
        'ai-emerald': '#059669',
        'ai-slate': '#475569',
        'ai-gray': '#6B7280',
        'success-green': '#10B981',
        'warning-amber': '#F59E0B',
        'error-red': '#EF4444',
        'glass-bg': 'rgba(0, 0, 0, 0.2)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.125rem' }],
        'sm': ['0.875rem', { lineHeight: '1.375rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'glass': '12px',
      },
      backdropBlur: {
        'glass': '10px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
        'count': 'countUp 2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'particle': 'particle 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(5deg)' },
          '66%': { transform: 'translateY(-10px) rotate(-5deg)' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 20px rgba(160, 32, 240, 0.4), 0 0 40px rgba(160, 32, 240, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(160, 32, 240, 0.6), 0 0 60px rgba(160, 32, 240, 0.3)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        particle: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.3' },
          '50%': { transform: 'translateY(-20px) translateX(10px)', opacity: '1' },
        },
        glow: {
          '0%': { textShadow: '0 0 10px rgba(0, 255, 255, 0.5)' },
          '100%': { textShadow: '0 0 20px rgba(255, 0, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.5)' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glow-blue': '0 0 20px rgba(0, 102, 255, 0.4)',
        'glow-purple': '0 0 20px rgba(160, 32, 240, 0.4)',
        'glow-green': '0 0 20px rgba(0, 210, 106, 0.4)',
        'glow-cyan': '0 0 20px rgba(0, 255, 255, 0.4)',
        'glow-magenta': '0 0 20px rgba(255, 0, 255, 0.4)',
      },
    },
  },
  plugins: [],
};