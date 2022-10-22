// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');
module.exports = {
  presets: [require('./src/styles/ngwind')],
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '::-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      });
    }),
  ],
  prefix: 'ng-',
  variants: {
    extend: {
      animation: ['motion-safe'],
      backgroundColor: ['disabled'],
      fill: ['group-disabled', 'group-hover'],
      opacity: ['disabled'],
    },
  },
  theme: {
    colors: {
      grey: {
        1: '#fefefe',
        2: '#f6f6f6',
        3: '#e6e8ea',
        4: '#b0b2b4',
        5: '#8a8c8e',
        6: '#545658',
        7: '#3a3c3e',
        8: '#202224',
        9: '#141618',
        10: '#141414',
      },
      error: '#F51A5A',
      alert: '#FFB32B',
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      accent: 'var(--color-accent)',
      divider: 'var(--color-divider)',
      background: 'var(--color-background)',
      contrast: {
        primary: 'var(--color-contrast-primary)',
        secondary: 'var(--color-contrast-secondary)',
        accent: 'var(--color-contrast-accent)',
        divider: 'var(--color-contrast-divider)',
        background: 'var(--color-contrast-background)',
      },
      brand: {
        dark: '#171923',
        light: '#093054',
        core: '#093054',
      },
    },
    extend: {
      animation: {
        radial: 'radial 1.5s ease-in',
      },
      keyframes: {
        radial: {
          '0%': { opacity: '1', strokeDasharray: '0, 295.3' },
          '50%': { opacity: '1' },
        },
      },
      transitionProperty: {
        'max-h': 'max-height',
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
      },
      screens: {
        desktopNav: '660px',
      },
      boxShadow: {
        'button-hover': '0px 0px 0px 2px',
      },
      minWidth: {
        '9/24': '37.5%',
        '1/4': '25%',
        '1/5': '20%',
        '1/6': '16.67%',
      },
    },
    configViewer: {
      themeReplacements: {
        'var(--color-primary)': '#141414',
        'var(--color-secondary)': '#3a3c3e',
        'var(--color-accent)': '#171923',
        'var(--color-background)': '#fefefe',
        'var(--color-divider)': '#b0b2b4',
        'var(--color-contrast-primary)': '#fefefe',
        'var(--color-contrast-secondary)': '#b0b2b4',
        'var(--color-contrast-accent)': '#093054',
        'var(--color-contrast-background)': '#141414',
        'var(--color-contrast-divider)': '#3a3c3e',
      },
    },
  },
};
