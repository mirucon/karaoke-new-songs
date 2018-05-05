<template lang="pug">
  header.header
    div.container
      a.siteInfo(nuxt-link to="/")
        img.siteLogo__img(:src="logo" alt="カラオケ最新曲")
        h1.siteTitle カラオケ最新曲

</template>

<script>
import logoImg from '~/assets/logo.svg'

export default {
  name: 'app-header',
  data: () => ({
    logo: logoImg
  })
}
</script>

<style scoped lang="stylus">

@font-face
  font-family 'SubsettedGenJyuuGothic-Bold'
  src url('~/assets/fonts/GenJyuuGothic.ttf') format('truetype')
  font-weight bold

@font-face
  font-family 'SubsettedGenJyuuGothic-Bold'
  src url('~/assets/fonts/GenJyuuGothic.woff') format('woff')
  font-weight bold

@font-face
  font-family 'SubsettedGenJyuuGothic-Bold'
  src url('~/assets/fonts/GenJyuuGothic.woff2') format('woff2')
  font-weight bold

.header
  padding 0 .9em .7em
  margin-bottom 1.3em
  box-shadow 0 1px 1px rgba(0, 0, 0, .1)
  @media screen and (min-width 640px)
    margin-bottom .9em

.siteInfo
  display flex
  align-items center
  justify-content center
  text-align center

.siteLogo__img
  width 60px
  @media screen and (min-width 640px)
    width 60px

.siteTitle
  position relative
  top 6px
  font-size 1.5em
  font-family "SubsettedGenJyuuGothic-Bold", "Hiragino Maru Gothic ProN", sans-serif
  @media screen and (min-width 640px)
    font-size 1.7em
</style>
