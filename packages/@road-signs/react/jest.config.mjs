export default {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.setup.mjs'],
  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/src/**/*.test.tsx'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          esModuleInterop: true,
          jsx: 'react-jsx',
          module: 'commonjs',
          moduleResolution: 'node10',
          strict: true,
          target: 'ES2022',
          types: ['jest', 'node'],
        },
      },
    ],
  },
  moduleNameMapper: {
    '^@road-signs/core$': '<rootDir>/../core/src/index.ts',
  },
};
