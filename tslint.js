module.exports = {
  extends: [
    '@ridi/tslint-config',
    'tslint-config-prettier',
  ],
  rulesDirectory: [
    'tslint-plugin-prettier',
  ],
  rules: {
    // due to TS 2.9 bug regarding rest props trailing comma
    'trailing-comma': false,
    'jsx-no-lambda': false,
  },
  linterOptions: {
    exclude: [
      '**/node_modules/**',
      '**/__tests__/**',
    ],
  },
};