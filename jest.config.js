module.exports = {
  testEnvironment: 'node',
  testRegex: './test/.*\\.test\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
