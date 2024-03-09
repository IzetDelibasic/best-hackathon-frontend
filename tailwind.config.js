/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './src/**/*.ts'],
  theme: {
    extend: {
      fontFamily: {
        workSans: 'Work Sans',
        montserrat: 'Montserrat'
      },
      colors:{
        bluePurple: "#9272CF",
      }
     },
  },
  plugins: [],
};
