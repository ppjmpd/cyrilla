/** @typedef {{env: Object}} process */
module.exports = {
  'env': {
    'browser': false,
    'es6': true,
    'node': true,
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'project': 'tsconfig.json',
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
    'jest',
  ],
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  'rules': {
    // It's Node.js
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // Disabled check because all code are committed with LF-style (\n)
    'linebreak-style': 'off',
    // Use unary operators ++ and --
    'no-plusplus': 'off',
  },
};
