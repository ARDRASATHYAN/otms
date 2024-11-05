/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Add Inter as the default sans font
      },
      colors: {
        customPurple: '#5900b3', // Add your custom color here
      },
    },
  },
  plugins: [],
}
