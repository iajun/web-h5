module.exports = {
  'src/**/*.{css,scss,less,styl,stylus}': ['stylelint --fix', 'git add'],
  'src/**/*.{ts,tsx,js,jsx}': ['eslint --fix', 'git add'],
};
