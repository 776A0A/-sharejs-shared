module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    'prettier/prettier': 'error'
  },
  parser: 'babel-eslint'
};
