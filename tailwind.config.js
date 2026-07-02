/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './*.{ts,tsx}',
    './components/**/*.{tsx,ts}',
    './hooks/**/*.{ts,tsx}',
    './contexts/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff5e00',
        primaryLight: '#ff8c42',
        secondary: '#1a1a2e',
        bg: '#fafafa',
        surface: '#f0f0f5',
        surfaceLight: '#e8e8ee',
        border: 'rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
        gradient: 'gradient-shift 15s ease infinite',
        glow: 'glow-pulse 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'border-glow': 'border-glow 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 94, 0, 0.1)' },
          '50%': { boxShadow: '0 0 60px rgba(255, 94, 0, 0.25)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(-80px)' },
          '50%': { transform: 'translateX(80px)' },
        },
        'drift-reverse': {
          '0%, 100%': { transform: 'translateX(60px)' },
          '50%': { transform: 'translateX(-60px)' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(255, 94, 0, 0.1)' },
          '50%': { borderColor: 'rgba(255, 94, 0, 0.4)' },
        },
      },
    },
  },
  plugins: [],
};
