/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#0a1628',
          900: '#0f1f38',
          800: '#152a4a',
          700: '#1b385f',
          600: '#234a78',
          500: '#2d5a94',
          400: '#3a6db0',
        },
        gold: {
          50: '#fff8e6',
          100: '#fff1cc',
          200: '#ffe299',
          300: '#ffd24d',
          400: '#FFA800',
          500: '#e09600',
          600: '#b87a00',
          700: '#8a5b00',
        },
        sky: {
          50: '#f0faff',
          100: '#e0f5ff',
          200: '#b3e9ff',
          300: '#80d9ff',
          400: '#99daff',
          500: '#4dc3ff',
          600: '#1aa8ff',
          700: '#0088db',
        },
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gentle-rock': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'gentle-rock': 'gentle-rock 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
