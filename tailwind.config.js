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
        feedback: 'clamp(275px, 100%, 768px)',
        'fs-card': 'clamp(275px, 100%, 906px)'
      },
      minHeight: {
        'fs-card': '600px',
        '1/4v': '25vh',
        '1/2v': '50vh',
        '3/4v': '75vh',
        '1.1v': '110vh'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.gray.900')
            },
            'a:hover': {
              color: theme('colors.yellow.400')
            }
          }
        },
        dark: {
          css: {
            color: theme('colors.white'),
            a: {
              color: theme('colors.white')
            },
            'a:hover': {
              color: theme('colors.yellow.400')
            }
          }
        }
      })
    }
  },
  variants: {
    typography: ['dark'],
    extend: {
      ringWidth: ['hover', 'dark']
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
