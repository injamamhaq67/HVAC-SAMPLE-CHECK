/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0f172a',
          deep: '#0d1322',
          cardDark: '#12183a',
          gold: '#f59e0b',
          yellow: '#FDB813',
          accent: '#facc15',
          muted: '#64748b',
          lightBg: '#f8fafc',
          borderLight: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 30px -10px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 20px 40px -15px rgba(15, 23, 42, 0.14)',
        'glass': '0 8px 32px 0 rgba(19, 27, 62, 0.12)',
        'form': '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
        'modal': '0 30px 60px -15px rgba(15, 23, 42, 0.35)',
      }
    },
  },
  plugins: [],
}
