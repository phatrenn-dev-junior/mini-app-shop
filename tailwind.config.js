/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Mapped to Telegram theme CSS variables (see src/index.css)
        'tg-bg': 'var(--tg-theme-bg-color)',
        'tg-text': 'var(--tg-theme-text-color)',
        'tg-hint': 'var(--tg-theme-hint-color)',
        'tg-link': 'var(--tg-theme-link-color)',
        'tg-button': 'var(--tg-theme-button-color)',
        'tg-button-text': 'var(--tg-theme-button-text-color)',
        'tg-secondary-bg': 'var(--tg-theme-secondary-bg-color)',
        'tg-header-bg': 'var(--tg-theme-header-bg-color)',
        'tg-section-bg': 'var(--tg-theme-section-bg-color)',
        'tg-subtitle': 'var(--tg-theme-subtitle-text-color)',
        'tg-destructive': 'var(--tg-theme-destructive-text-color)',
      },
      borderRadius: {
        tg: '14px',
      },
    },
  },
  plugins: [],
};
