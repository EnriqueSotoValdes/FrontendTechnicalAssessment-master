module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    //setupFiles: ['<rootDir>/src/Tests/Mocks/ResizeObserver.tsx'], 
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  };