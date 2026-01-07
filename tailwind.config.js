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
          DEFAULT: '#06B6D4', // Cyan from logo
          light: '#22D3EE',   // Lighter cyan
          dark: '#0891B2',    // Darker cyan
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#2563EB', // Deep blue from logo
          light: '#3B82F6',   // Lighter blue
          dark: '#1D4ED8',    // Darker blue
        },
        background: '#FFFFFF',        // Light theme: white background
        foreground: '#0F172A',        // Light theme: dark text
        muted: {
          DEFAULT: '#F1F5F9',         // Light theme: very light gray
          foreground: '#64748B',      // Light theme: muted dark text
        },
        card: {
          DEFAULT: '#FFFFFF',         // Light theme: white cards
          foreground: '#0F172A',      // Light theme: dark text on cards
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #06B6D4 0%, #2563EB 100%)',
        'gradient-brand-hover': 'linear-gradient(135deg, #22D3EE 0%, #3B82F6 100%)',
        'gradient-light-bg': 'linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 100%)', // Light gradient background
      },
    },
  },
  plugins: [],
}
