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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            strong: {
              color: theme('colors.orange.500')
            },
            blockquote: {
              color: theme('colors.orange.700')
            }
          }
        },
        dark: {
          css: {
            color: theme('colors.gray.200'),
            strong: {
              color: theme('colors.pink.500')
            },
            blockquote: {
              color: theme('colors.pink.700')
            }
          }
        }
      })
    }
  },
  variants: {
    typography: ['dark']
  },
  plugins: [require('@tailwindcss/typography')]
};
