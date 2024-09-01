/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        belleza: ['Belleza', 'sans-serif'], // Agrega la fuente Belleza
        quicksand: ['Quicksand', 'sans-serif'], 
      },
      colors:{
        darkGray: '#333333',
        healthyGray: '#E5EBDF',
        healthyGreen: '#a1bc1f',
        healthyDarkGreen: '#8ba020',
        healthyOrange:'#EE772C',
        healthyDarkOrange: '#cc6728',
      }
    },
  },
  plugins: [],
}

