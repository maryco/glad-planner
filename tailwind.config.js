/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // https://www.mailslurp.com/blog/tailwind-print-styles-custom-media-query/
      screens: {
        'print': { 'raw': 'print' },
      }
    },
  },
  plugins: [],
}

