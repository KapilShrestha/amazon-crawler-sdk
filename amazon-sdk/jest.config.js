export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
      '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
      '^@constants/(.*)$': '<rootDir>/src/constants/$1'
  }
};