export default {
  clearMocks: true,
  coverageDirectory: 'coverage',
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: [
    'js',
    'ts',
    'json'
  ],
  testMatch: [
    '**/?(*.)+(spec|test).ts?(x)',
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  }
};
