/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  plugins: [
    // allow you to use css next features
    require('postcss-cssnext')(),
    // compress css
    require('cssnano')(),
    // px to viewport
    require('postcss-px-to-viewport')({
      viewportWidth: 375,
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      mediaQuery: false,
      landscapeUnit: 'vw',
      landscapeWidth: 1134,
    }),
  ],
};
