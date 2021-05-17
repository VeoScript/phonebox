const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'scheme-dark': '#1F5565',
        'scheme-mid': '#357994',
        'scheme-light': '#699CB2',
        'scheme-sky': '#C3D2D6',
        'scheme-pale': '#F3E9EC',
        'scheme-peach': '#FAD9D2',
      },
      fontFamily: {
        poppins: ['Poppins', ...defaultTheme.fontFamily.serif]
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
}
