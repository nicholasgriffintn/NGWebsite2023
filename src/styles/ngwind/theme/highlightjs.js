// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const merge = require('lodash.merge');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const convertCss = require('../utils/converter');

function generateBaseStyles(baseStyles) {
  const base = {
    '.hljs': {
      display: 'block',
      overflowX: 'auto',
      padding: '0.5em',
    },
  };

  const merged = merge(base['.hljs'], baseStyles);

  return {
    '.hljs': Object.assign(merged, {}),
  };
}

function generateCustomTheme(custom) {
  let baseStyles = {};
  const customStyles = {};

  if (custom.base) {
    baseStyles = generateBaseStyles(custom.base);
  }

  Object.entries(custom).forEach(([key, value]) => {
    if (key !== 'base') {
      Object.entries(value).forEach(([key, value]) => {
        customStyles[`.hljs-${key}`] = value;
      });
    }
  });

  return merge(baseStyles, customStyles);
}

function findTheme(theme) {
  const themePath = path.resolve(`${process.cwd()}/node_modules/highlight.js/styles/${theme}.css`);
  const themeContents = fs.readFileSync(themePath, 'utf8');

  const styles = convertCss(themeContents);

  return styles;
}

module.exports = function getTheme(theme = null, custom = null) {
  let themeContents = {};
  let customTheme = {};

  if (theme) {
    themeContents = findTheme(theme);
  }

  if (custom) {
    customTheme = generateCustomTheme(custom);
  }

  return merge(themeContents, customTheme);
};
