module.exports = {
  linters: {
    'src/app/**/*.{ts,tsx}': ['tslint -c ./tslint.js', 'git add'],
  },
};
