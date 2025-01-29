export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.app.json" }],
  },
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["**/src/**/*.test.ts", "**/src/**/*.test.tsx"],
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
}
