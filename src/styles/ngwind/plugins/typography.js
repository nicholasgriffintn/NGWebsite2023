const plugin = require('tailwindcss/plugin');

const { FONT_SCALE, GROUP_A, GROUP_D } = require('../settings/typography.js');

const NO_TOUCH_CLASS = '.ng-no-touch';

const createFontStyles = (prefix) => {
  const fonts = {};

  Object.entries(FONT_SCALE).forEach(([name, breakpoints]) => {
    Object.entries(breakpoints).forEach(([breakpoint, styles]) => {
      const modifier = breakpoint === GROUP_D && `${NO_TOUCH_CLASS} `;
      const cls = `${modifier || ''}.${prefix || ''}text-${name}`;
      fonts[cls] = breakpoints[GROUP_A];

      if (breakpoint === GROUP_D) {
        fonts[cls] = {};
        fonts[cls][`@media (min-width: 600px)`] = styles;
      } else if (breakpoint !== GROUP_A) {
        fonts[cls][`@media (min-width: ${breakpoint})`] = styles;
      }
    });
  });

  return fonts;
};

module.exports = plugin(({ addBase, config }) => {
  addBase(createFontStyles(config('prefix')));
});
