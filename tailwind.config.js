/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sv-red':    '#B22222',
        'sv-orange': '#E11D2E',
        'sv-green':  '#111111',
        'sv-dark':   '#111111',
        'sv-warm':   '#fdf9f5',
        'sv-cream':  '#f5f0e8',
        'sv-border': '#ede8df',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.07)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.12)',
        red: '0 8px 32px rgba(178,34,34,0.25)',
      },
    },
  },
  plugins: [],
};
