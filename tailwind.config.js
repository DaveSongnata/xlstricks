/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Syne', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'Consolas', 'Monaco', 'monospace'],
      },
      colors: {
        vault: {
          bg: '#0a0e1a',
          surface: '#141b2d',
          border: '#1e2942',
          text: '#e1e7f5',
          muted: '#6b7a99',
          cyan: '#00d9ff',
          amber: '#ffb800',
          success: '#00ff85',
          error: '#ff4757',
        }
      },
      animation: {
        'unlock': 'unlock 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.4s ease-out',
      },
      keyframes: {
        unlock: {
          '0%': { transform: 'scale(0.9) rotate(-5deg)', opacity: '0' },
          '50%': { transform: 'scale(1.05) rotate(2deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 217, 255, 0.6)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
