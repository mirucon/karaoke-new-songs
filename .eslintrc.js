module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2017,
    sourceType: "module"
  },
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
    // "plugin:prettier/recommended",
    "standard",
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'semi': [2, 'never'],
    "space-before-function-paren": ["error", "always"],
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'vue/max-attributes-per-line': 'off',
    'vue/require-default-prop': 'warn',
    'vue/require-prop-types': 'warn'
  },
  globals: {}
}
