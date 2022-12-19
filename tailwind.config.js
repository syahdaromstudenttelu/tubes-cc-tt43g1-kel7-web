const twDefaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-bg': 'url(/assets/images/bg1.jpg)',
      },
      fontFamily: {
        raleway: ['var(--font-raleway)', ...twDefaultTheme.fontFamily.sans],
        inter: ['var(--font-inter)', ...twDefaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
