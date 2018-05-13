module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  globals: {
    '$nuxt': true
  },
  env: {
    browser: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    "plugin:vue/recommended",
    "plugin:prettier/recommended"
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'semi': [2, 'never'],
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error', { 'singleQuote': true, 'semi': false }]
  },
  globals: {}
}
