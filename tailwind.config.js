/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['-apple-system','BlinkMacSystemFont','"Hiragino Kaku Gothic ProN"','"Hiragino Sans"','Meiryo','sans-serif'],
      },
    },
  },
  plugins: [],
}
