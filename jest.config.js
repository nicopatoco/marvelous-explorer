const nextJest = require('next/jest')

// Creating a custom Jest configuration with `next/jest`
const createJestConfig = nextJest({
  // Specify the Next.js project directory for loading the Next.js configuration and .env files in your test environment
  dir: './',
})

// Custom Jest configuration
const customJestConfig = {
  // Specify the Jest coverage provider
  coverageProvider: 'v8',

  // Set the environment in which the tests will run. "jsdom" simulates a browser environment.
  testEnvironment: 'jest-environment-jsdom',

  // Configure module name mapper for resolving module paths. Adjust according to your project structure.
  moduleNameMapper: {
    // Assuming a structure where your actual source files reside in a "src" directory
    '^@/(.*)$': '<rootDir>/src/$1',
    // Adjust or add more mappings depending on your directory structure and alias configuration in tsconfig.json
  },

  // If you have a setup file where you configure global variables, import jest-dom matchers, etc.
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Adjust the path to your setup file

  // Add any other Jest configuration options that you need below
}

// Enhance the Jest configuration with Next.js features and custom configuration
module.exports = createJestConfig(customJestConfig)
