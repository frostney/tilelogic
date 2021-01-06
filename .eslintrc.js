module.exports = {
  extends: [
    'airbnb-typescript/base',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'prefer-arrow-callback': 'error',
  },
};
