import nextJest from 'next/jest';

/**
 * @see https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler
 */
const createJestConfig = nextJest({
  dir: './',
});

/**
 * @see https://jestjs.io/docs/configuration
 */
const jestConfig = {
  cacheDirectory: '.jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '.coverage',
  coverageReporters: ['text', 'lcov'],
  collectCoverageFrom: ['./src/**'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -11,
    },
  },
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/test'],
  testMatch: ['**/?(*.)+(test).+(ts|tsx)'],
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',
};

const config = createJestConfig(jestConfig);

export default config;