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
      { hid: 'description', name: 'description', content: 'DAMとJOYSOUNDの最新配信曲を同時表示 + 横断検索 !' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
      { rel: 'icon', type: 'image/png', href: '/favicon-192x192.png', sizes: '192x192' },
      { rel: 'apple-touch-icon', href: '/favicon-120x120.png', sizes: '120x120' },
      { rel: 'apple-touch-icon', href: '/favicon-152x152.png', sizes: '152x152' },
      { rel: 'apple-touch-icon', href: '/favicon-167x167.png', sizes: '167x167' },
      { rel: 'apple-touch-icon', href: '/favicon-180x180.png', sizes: '180x180' }
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
