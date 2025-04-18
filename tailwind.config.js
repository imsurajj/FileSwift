/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '33%': { transform: 'translateX(100%)' }
        },
        shine: {
          '0%': { left: '-100%' },
          '100%': { left: '200%' }
        }
      },
      animation: {
        shimmer: 'shimmer 5s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shine': 'shine 2s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}

