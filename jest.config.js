// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1"
  },
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  }
};
