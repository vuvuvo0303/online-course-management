/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'nav-border': '#EBEAEA',
        'light-white': '#FAFAFB',
        'light-white-100': '#F1F4F5',
        'light-white-200': '#d7d7d7',
        'light-white-300': '#F3F3F4',
        'light-white-400': '#E2E5F1',
        'light-white-500': '#E4E4E4',
        'gray': '#333',
        'gray-100': '#3d3d4e',
        'black-100': '#252525',
        'primary-purple': '#9747FF',
        'gray-50': '#D9D9D9',
      },
      backgroundColor: {
        'white-transparent': '#f7f9fa'
      },
      boxShadow: {
        menu: '0px 159px 95px rgba(13,12,34,0.01), 0px 71px 71px rgba(13,12,34,0.02), 0px 18px 39px rgba(13,12,34,0.02), 0px 0px 0px rgba(13,12,34,0.02)',
        'custom': '0 0 10px rgba(0, 0, 0, 0.1)',
      },
      screens: {
        'xs': '400px',
      },
      maxWidth: {
        '10xl': '1680px'
      },
      fontSize: {
        'custom': '16px',
      },
    },
  },

  plugins: [],
};
