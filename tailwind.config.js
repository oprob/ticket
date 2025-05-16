/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        spotlight: 'spotlight 2s ease-in-out infinite alternate',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        spotlight: {
          '0%': { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
          '100%': { opacity: 0.8, transform: 'translate(-50%, -50%) scale(1.5)' },
        },
      },
    },
  },
  plugins: [],
};