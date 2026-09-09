/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        apple: {
          black: '#000000',
          dark: '#0a0a0b',
          card: '#161617',
          cardHover: '#1d1d1f',
          light: '#f5f5f7',
          subtext: '#86868b',
          border: 'rgba(255, 255, 255, 0.12)',
        },
        telkom: {
          red: '#E1251B',
          darkRed: '#B81B14',
          accent: '#FF3B30',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          'Inter',
          'sans-serif',
        ],
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
