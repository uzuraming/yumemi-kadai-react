module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  // see https://github.com/zeit/next.js/issues/8663
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.jest.json',
    },
  },
  // see https://stackoverflow.com/questions/50863312/jest-gives-cannot-find-module-when-importing-components-with-absolute-paths
  moduleDirectories: ['node_modules', '<rootDir>'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/src/__tests__/utils'],
};
