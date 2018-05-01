const path = require('path')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'カラオケ週間配信曲クイックビューワー',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '登録したアーティストの新しい曲が配信決定時に通知を送信します !' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      // find the stylus loader
      const stylus = config.module.rules[0].options.loaders.stylus.find(e => e.loader == 'stylus-loader')
      // extend default options
      Object.assign(stylus.options, {
        import: [
          // require my own configs and variables and mixins and ..
          path.resolve(__dirname, 'assets/_variables.styl')
        ]
      })

      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    '@nuxtjs/pwa'
  ],
  workbox: {
    // dev: true
  },
  manifest: {
    name: 'カラオケ新着週間配信曲',
    lang: 'ja'
  }
}
