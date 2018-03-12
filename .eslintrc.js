module.exports = {
  extends: 'airbnb-base',
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    ['import/prefer-default-export']: 0,
    'comma-dangle': 0,
    ['no-shadow']: 0,
    ["no-mixed-operators"]: 0,
    ["no-restricted-syntax"]: 0,
    'function-paren-newline': 0
  },
  "parserOptions": {
    "ecmaVersion": 2018
  }
}
