<template lang="pug">
  footer.footer#footer
    a(href="#", @click="scrollToTop" aria-label="Back to top").backToTop#backToTop
      span.icon--caret.bottom
    div.container
      p.copyright カラオケ配信曲クイックビューアー by <a href="https://twitter.com/mirucons">mirucon</a>
</template>

<script>
export default {
  name: 'AppFooter',
  methods: {
    scrollToTop() {
      // @ts-ignore
      // eslint-disable-next-line
      const SmoothScroll = require('smooth-scroll')
      SmoothScroll('a[href="#"]', {
        speed: 300
      })
      setTimeout(() => {
        this.$router.replace({ hash: '' })
      }, 100)
    }
  }
}
</script>

<style scoped lang="stylus">
.footer
  position absolute
  right 0
  bottom 0
  left 0
  padding 2.2em 10px
  background-color #11161b
  color #ffffff94
  a
    color #ffffffbb
    transition color .2s, all .2s
    text-decoration none
    &:hover
      color #ffffffff

.backToTop
  display block
  position absolute
  top 0%
  right calc(50% - 27px)
  padding .2em 1.2em .4em
  background-color #ffffffdd
  cursor pointer
  box-shadow 0 0 1px rgba(0, 0, 0, .3)
  &:hover
    padding-top .37em
    padding-bottom .65em

.icon--caret.bottom
  right .16em
  &::after
    bottom 20px
    transform rotate(-135deg)
    box-shadow: inset 0 0 0 32px #555
  &::before
    bottom 20px
    transform rotate(-45deg)
    box-shadow: inset 0 0 0 32px #555
</style>
