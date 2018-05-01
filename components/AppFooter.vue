<template lang="pug">
  footer.footer#footer
    a(href="#", @click="scrollToTop" aria-label="Back to top").backToTop#backToTop
      span.icon--caret.bottom
    div.container
      p.copyright DAM 週間配信曲クイックビューワー by <a href="https://www.mirucon.com/">mirucon</a>
</template>

<script>
export default {
  name: 'app-footer',
  methods: {
    scrollToTop: function () {
      const SmoothScroll = require('smooth-scroll')
      SmoothScroll('a[href="#"]', {
        speed: 300
      })
      setTimeout(() => {
        this.$router.replace({hash: ''})
      }, 100)
    }
  }
}
</script>

<style scoped lang="stylus">
.footer
  position relative
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
  right 0
  padding .3em 1.05em .5em
  background-color: #ffffffdd
  cursor pointer
  box-shadow 0 0 1px rgba(0, 0, 0, .3)
  &:hover
    padding-top .5em
    padding-bottom .7em

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
