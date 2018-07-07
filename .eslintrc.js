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
    'typescript',
    "plugin:vue/recommended",
    "standard",
    "prettier"
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'prettier'
  ],
  // add your custom rules here
  rules: {
    "prettier/prettier": "error",
    'semi': [2, 'never'],
    "space-before-function-paren": 'off',
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'require-jsdoc': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/require-default-prop': 'warn',
    'vue/require-prop-types': 'warn'
  },
}
