/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    hljs: {
      theme: 'atom-one-dark',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
