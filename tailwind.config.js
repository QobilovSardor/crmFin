/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'theme-xs': '0.75rem',
        'theme-sm': '0.875rem',
      },
      zIndex: {
        '99999': '99999',
      },
      colors: {
        'blue': '#407BFF',
        'blue-light': "#F4F8FF",
        black: '#141414',
        blackLight: '#1D2939',
        border: {
          light: '#DEE3F3', // Used for borders
        },
        bg: {
          hover: '#F4F8FF', // Used for hover states
          avatar: '#F9FBFF', // Used for avatar background
        },
        gray: {
          'base': '#707D89',
          '400': '#667085'
        },
        line: "#DEE3F3"
      },
      boxShadow: {
        'theme-xs': '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        'theme-md': '0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.10)',
        'theme-lg': '0px 8px 8px -4px rgba(16, 24, 40, 0.04), 0px 20px 24px -4px rgba(16, 24, 40, 0.10)',
        'input-focus': '0px 0px 0px 4px #465FFF1F',
        "tooltip-shd": "0px 6px 16px 0px #1414141A"
      },
      backgroundImage: {

      },
      space: {
        '1.5': '6px'
      },
      gap: {
        '1.5': '6px'
      },
      screens: {
        '1350': '1350px'
      },

    },
  },
  plugins: [],
}
