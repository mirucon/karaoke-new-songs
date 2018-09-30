module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-basic-starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
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
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    babel: {
      plugins: ['@babel/plugin-proposal-optional-chaining']
    }
  },
  srcDir: 'src/',
  mode: 'spa',
  modules: ['@nuxtjs/axios', '@nuxtjs/dotenv'],
  axios: {
    headers: {
      'Content-Type': 'application/json'
    }
  },
  sassResources: ['@/assets/_var.scss'],
  env: {
    APP_ENV: process.env.APP_ENV
  }
}
