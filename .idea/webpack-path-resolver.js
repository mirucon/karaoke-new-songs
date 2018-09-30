// Dummy webpack config for JetBrains editors

const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../src/'),
      '@': path.resolve(__dirname, '../src/')
    }
  }
}
