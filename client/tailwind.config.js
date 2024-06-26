/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
    },
    colors: {
      customGray: 'rgb(50, 50, 50)',
    },
    gridTemplateColumns: {
      '2fr-1fr-1fr': '2fr 1fr 1fr',
    },
    },
  },
  plugins: [],
}