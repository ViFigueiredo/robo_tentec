module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    eqeqeq: 0,
    'consistent-return': 0,
    'no-console': 0,
    'operator-linebreak': 0,
    'import/newline-after-import': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
  },
};
