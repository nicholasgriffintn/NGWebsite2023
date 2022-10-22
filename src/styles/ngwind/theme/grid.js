const { GROUP_1, GROUP_2, GROUP_3, GROUP_4, GROUP_5 } = require('../settings/breakpoints');

const GROUP_BREAKPOINTS = {
  1: GROUP_1,
  2: GROUP_2,
  3: GROUP_3,
  4: GROUP_4,
  5: GROUP_5,
};

/**
 *
 * @xs - Extra Small Breakpoint (240px)
 * @s - Small Breakpoint (400px)
 * @m - Medium Breakpoint (600px)
 * @l - Large Breakpoint (900px)
 * @xl - Extra Large Breakpoint (1008px)
 * @xxl - Extra Extra Large Breakpoint (1280px)
 *
 */
const SIZE_BREAKPOINTS = {
  xs: '240px',
  s: GROUP_2,
  m: GROUP_3,
  l: '900px',
  xl: GROUP_4,
  xxl: GROUP_5,
};

module.exports = {
  screens: {
    ...GROUP_BREAKPOINTS,
    ...SIZE_BREAKPOINTS,
  },
};
