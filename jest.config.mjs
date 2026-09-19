/**
 * Root jest project — covers the bin/ build scripts.
 *
 * The country packages are tested from inside their own workspaces; this
 * config exists because bin/ isn't a workspace but holds the logic that
 * decides what every registry contains (ID derivation, SVG normalisation).
 */
export default {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/bin/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: {
          esModuleInterop: true,
          module: 'commonjs',
          moduleResolution: 'node10',
          strict: true,
          target: 'ES2022',
          types: ['jest', 'node'],
        },
      },
    ],
  },
};
