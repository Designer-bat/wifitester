/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: '#7B2CBF',
          gradient: '#9D4EDD',
          deep: '#240046',
          lavender: '#E9D8FD',
        },
        background: {
          light: '#F8F9FC',
          card: '#FFFFFF',
        },
        status: {
          success: '#22C55E',
          warning: '#FACC15',
          error: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
