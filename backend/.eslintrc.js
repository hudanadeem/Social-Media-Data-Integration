module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "google",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
module.exports = {
  env: {
    node: true, // this is needed to use the node plugin and run in node environment. DO NOT use browser: true
    commonjs: true,
    es2021: true,
    mocha: true, // this is needed as eslint will complain about describe, it, etc.
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "google", // order matters here: google should come first before prettier
    "prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "2022",
    sourceType: "module",
  },
  rules: {
    "node/no-unpublished-require": [
      "error",
      {
        allowModules: ["chai", "mocha", "supertest"], // eslint complains as these are under devDependencies inside package.json.
      },
    ],
  },
};
