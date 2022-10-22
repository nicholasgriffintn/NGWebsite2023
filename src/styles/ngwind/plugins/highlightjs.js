// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const getTheme = require('../theme/highlightjs');

module.exports = plugin(({ addComponents, theme }) => {
  const hljs = theme('hljs', {});

  if (!hljs.theme && !hljs.custom) {
    hljs.theme = 'default';
  }

  const hljsTheme = getTheme(hljs.theme, hljs.custom);

  addComponents(hljsTheme);
});
