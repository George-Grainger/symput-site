const colors = require('tailwindcss/colors');
const { fontFamily, outline, cursor } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Noto Sans', fontFamily.sans],
      body: ['Noto Sans', fontFamily.sans]
    },
    extend: {
      spacing: {
        18: '4.5rem',
        9: '2.25rem'
      },
      minWidth: {
        feedback: 'clamp(275px, 100%, 768px)',
        'fs-card': 'clamp(275px, 100%, 906px)'
      },
      width: {
        'fs-card': 'clamp(275px, 100%, 906px)'
      },
      maxWidth: {
        markdown: 'calc(100vw - 4rem)'
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
              color: theme('colors.gray.900'),
              cursor: 'pointer',
              borderRadius: '0.5rem',
              padding: '2px',
              transitionProperty:
                'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDuration: '150ms'
            },
            'a:hover': {
              backgroundColor: theme('colors.gray.200')
            },
            'a:focus': {
              backgroundColor: theme('colors.gray.200'),
              outline: 'none'
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.700')
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.700')
            },
            'ol > li::before': {
              color: theme('colors.gray.700')
            },
            hr: {
              borderColor: theme('colors.gray.700')
            },
            h1: {
              fontWeight: 600
            },
            h2: {
              fontWeight: 600
            },
            h3: {
              fontWeight: 600
            },
            h4: {
              fontWeight: 600
            },
            h5: {
              fontWeight: 600
            },
            h6: {
              fontWeight: 600
            }
          }
        },
        dark: {
          css: {
            color: theme('colors.white'),
            a: {
              color: theme('colors.white'),
              cursor: 'pointer',
              borderRadius: '0.5rem',
              padding: '2px',
              transitionProperty:
                'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDuration: '150ms'
            },
            'a:hover': {
              color: theme('colors.yellow.400'),
              backgroundColor: theme('colors.gray.700')
            },
            'a:focus': {
              color: theme('colors.yellow.400'),
              backgroundColor: theme('colors.gray.700'),
              outline: 'none'
            },
            blockquote: {
              borderLeftColor: theme('colors.yellow.400'),
              color: theme('colors.gray.100')
            },
            'ul > li::before': {
              backgroundColor: theme('colors.yellow.400')
            },
            'ol > li::before': {
              color: theme('colors.yellow.400')
            },
            hr: {
              borderColor: theme('colors.gray.200')
            },
            h1: {
              color: theme('colors.white'),
              fontWeight: 600
            },
            h2: {
              color: theme('colors.white'),
              fontWeight: 600
            },
            h3: {
              color: theme('colors.white'),
              fontWeight: 600
            },
            h4: {
              color: theme('colors.white'),
              fontWeight: 600
            },
            h5: {
              color: theme('colors.white'),
              fontWeight: 600
            },
            h6: {
              color: theme('colors.white'),
              fontWeight: 600
            },
            pre: {
              backgroundColor: theme('colors.gray.600')
            },
            'pre code': {
              color: theme('colors.gray.200')
            },
            strong: {
              color: theme('colors.yellow.400')
            },
            code: {
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
