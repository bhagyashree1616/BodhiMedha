/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        surface: {
          ground: '#0B0F19',
          low: '#111827',
          mid: '#161F30',
          elevated: '#1E293B',
          editor: '#0E1422'
        },
        border: {
          subdued: '#1E293B',
          prominent: '#334155',
          focus: '#8B5CF6'
        },
        neural: {
          DEFAULT: '#8B5CF6',
          deep: '#7C3AED',
          glow: 'rgba(139, 92, 246, 0.15)'
        },
        mastery: {
          emerald: '#10B981',
          teal: '#14B8A6',
          darkTeal: '#0D9488'
        },
        diagnostic: {
          amber: '#F59E0B',
          rose: '#F43F5E'
        }
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
