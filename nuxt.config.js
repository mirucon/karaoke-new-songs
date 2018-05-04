const path = require('path')

module.exports = {
  /*
  ** Headers of the page
  */
  htmlAttrs: {
    lang: 'ja',
    prefix: 'http://ogp.me/ns/website#'
  },
  head: {
    title: 'カラオケ最新曲クイックビューワー',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'DAMとJOYSOUNDの最新配信曲を同時表示 + 横断検索 !' },
      { property: 'og:description', content: 'DAMとJOYSOUNDの最新配信曲を同時表示 + 横断検索 !' },
      { property: 'og:site_name', content: 'カラオケ最新曲クイックビューワー' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://karaokenewsongs.com/' },
      { property: 'og:image', content: '/favicon-600x600.png' },
      { property: 'og:locale', content: 'ja' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:domain', content: 'https://karaokenewsongs.com/' },
      { name: 'twitter:site', content: '@mirucons' },
      { name: 'twitter:creator', content: '@mirucons' }
    ],
    link: [
      { rel: 'icon', href: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { rel: 'icon', href: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { rel: 'icon', href: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
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
    '@nuxtjs/pwa',
    ['@nuxtjs/google-analytics', {
      id: 'UA-56308747-9'
    }],
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-6450842193166394',
      test: true
    }]
  ],
  workbox: {
    // dev: true
  },
  manifest: {
    name: 'カラオケ最新曲クイックビューワー',
    lang: 'ja'
  }
}
