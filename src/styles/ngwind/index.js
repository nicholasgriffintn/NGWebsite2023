module.exports = {
  theme: {
    container: false,
    ...require('./theme/grid'),
    ...require('./theme/spacing'),
    ...require('./theme/fonts'),
  },
  plugins: [require('./plugins/typography.js')],
};
