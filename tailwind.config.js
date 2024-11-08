/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily : {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [
  
  ],
};

