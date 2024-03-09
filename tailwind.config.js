/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './src/**/*.ts'],
  theme: {
    extend: {
      fontFamily: {
        workSans: 'Work Sans',
        montserrat: 'Montserrat',
        poppins: 'Poppins',
      },
      colors:{
        bluePurple: "#9272CF",
        galaxy: "#D400C6",
      }
     },
  },
  plugins: [],
};
