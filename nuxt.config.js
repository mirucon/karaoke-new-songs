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
    title: 'カラオケ最新曲クイックビューアー',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index, follow' },
      {
        hid: 'description',
        name: 'description',
        content: 'DAM と JOYSOUND の最新配信曲を同時表示 + 横断検索出来る、高機能なカラオケ最新曲ビューアーアプリです。'
      },
      { name: 'apple-mobile-web-app-title', content: 'カラオケ最新曲' },
      {
        property: 'og:description',
        content: 'DAM と JOYSOUND の最新配信曲を同時表示 + 横断検索出来る、高機能なカラオケ最新曲ビューアーアプリです。'
      },
      { property: 'og:site_name', content: 'カラオケ最新曲クイックビューアー' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://karaokenewsongs.com/' },
      { property: 'og:image', content: 'https://karaokenewsongs.com/icon.png' },
      { property: 'og:locale', content: 'ja' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:domain', content: 'https://karaokenewsongs.com/' },
      { name: 'twitter:site', content: '@mirucons' }
    ],
    link: [
      {
        rel: 'icon',
        href: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        rel: 'icon',
        href: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        rel: 'icon',
        href: '/favicon/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        rel: 'icon',
        href: '/favicon/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        rel: 'apple-touch-favicon',
        href: '/favicon/favicon-120x120.png',
        sizes: '120x120'
      },
      {
        rel: 'apple-touch-favicon',
        href: '/favicon/favicon-152x152.png',
        sizes: '152x152'
      },
      {
        rel: 'apple-touch-favicon',
        href: '/favicon/favicon-167x167.png',
        sizes: '167x167'
      },
      {
        rel: 'apple-touch-favicon',
        href: '/favicon/favicon-180x180.png',
        sizes: '180x180'
      }
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
    vendor: ['moment'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      // find the stylus loader
      const stylus = config.module.rules[0].options.loaders.stylus.find(
        e => e.loader === 'stylus-loader'
      )
      // extend default options
      Object.assign(stylus.options, {
        import: [
          // require my own configs and variables and mixins and ..
          path.resolve(__dirname, 'assets/_variables.styl')
        ]
      })
      const vueLoader = config.module.rules.find(
        loader => loader.loader === 'vue-loader'
      )
      Object.assign(vueLoader.options.transformToRequire, {
        object: 'src',
        embed: 'src'
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
    '~/modules/typescript.js',
    '@nuxtjs/pwa',
    // [
    // '@nuxtjs/google-analytics', {
    // id: 'UA-56308747-9'
    // }
    // ],
    [
      '@nuxtjs/google-adsense', {
        id: 'ca-pub-6450842193166394'
      }
    ]
  ],
  icon: {
    sizes: [16, 120, 144, 152, 167, 192, 384, 512]
  },
  manifest: {
    name: 'カラオケ最新曲クイックビューアー',
    short_name: 'カラオケ最新曲',
    lang: 'ja'
  }
}
