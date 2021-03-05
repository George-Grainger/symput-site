const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Noto Sans', fontFamily.sans],
      body: ['Noto Sans', fontFamily.sans]
    },
    extend: {
      colors: {
        orange: colors.orange
      },
      spacing: {
        18: '4.5rem',
        9: '2.25rem'
      },
      minWidth: {
        feedback: 'clamp(311px, 100%, 56rem)',
        login: 'clamp(311px, 100%, 906px)'
      },
      minHeight: {
        login: '577px',
        '1/4v': '25vh',
        '1/2v': '50vh',
        '3/4v': '75vh',
        '1.1v': '110vh'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {}
        },
        dark: {
          css: {}
        }
      })
    }
  },
  variants: {
    typography: ['dark']
  },
  plugins: [require('@tailwindcss/typography')]
};
