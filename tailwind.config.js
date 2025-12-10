/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C62828',   // Deep Red
        secondary: '#F59E0B', // Gold/Saffron
        accent: '#2E7D32',    // Fresh Green
        dark: '#1A1A1A',
        light: '#FAF9F6',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Lato"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

