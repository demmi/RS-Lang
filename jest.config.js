/* eslint-disable no-undef*/
module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.svg': '<rootDir>/src/__mocks__/svgMock.js',
    '\\.(css|less|sass|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  coveragePathIgnorePatterns: ['.styles.ts', 'index.ts', 'config.ts', 'routes.ts', 'i18n.ts'],
}
