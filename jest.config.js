var testAndCoverageIgnorePatterns = [
  '/node_modules/',
  '/__mocks__/',
  '__stories',
  'd.ts',
];

module.exports = {
  testRegex: '(/__tests__/.*|(\\.|/|__)(test|spec))\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: testAndCoverageIgnorePatterns,
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
  ],
  moduleDirectories: [
    'node_modules',
    '<rootDir>/node_modules',
    'src/app',
    '.',
    '<rootDir>/../',
  ],
  transform: {
    '^.+\\.(j|t)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!lodash-es/)',
  ],
  mapCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
  ],
  coveragePathIgnorePatterns: testAndCoverageIgnorePatterns,
  globals: {
    'ts-jest': {
      skipBabel: true,
      tsConfigFile: 'tsconfig.jest.json',
    },
  },
};
