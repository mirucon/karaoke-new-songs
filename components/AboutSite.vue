<template lang="pug">
  div.aboutSite
    .toggle--modalSwitcher.toggle--aboutSite(@click="click" :class="{ isOpen: showAboutSite, isClosed: !hasOpenedOnce }")
      img(src="/help.svg" width="32" height="32")
      span.label About
    transition(name="fadeLeft")
      div.modalWindow.aboutSite__inner(v-show="showAboutSite" :class="{ isOpen: showAboutSite }")
        span.icon--clear.modalWindow__close.aboutSite__close(@click="click")
          span.top
          span.bottom

        section.aboutSite__content.aboutThisSite
          h3 このサイトについて
          p DAMとJOYSOUNDの最新曲を同時に表示し、検索が出来るビューアーサイトです。DAM/JOYSOUNDの表示切替や、並べ替え機能も備わっています。
          p DAM楽曲は毎週木曜日の11時, JOYSOUND楽曲は平日0時のそれぞれ10分ほど後に更新されます。<br>
          p ホーム画面にこのサイトを追加するとアプリのように使えます。

        section.aboutSite__content.aboutTheAuthor
          h3 作者について
          a.author(href="https://twitter.com/mirucons")
            img.authorIcon(src="https://secure.gravatar.com/avatar/38228223544cf5f1f818c93ecdd4371f" width="80" height="80")
            span.authorName: strong mirucon
          p Vue.jsやWordPress開発をする15歳のエンジニア。DAMの精密採点が趣味。最高点は91。
          p 現在アルバイト/インターン先を募集しています。興味のあるWeb制作会社様がいたら是非お声がけください。
          p <a href="https://twitter.com/mirucons" target="blank">Twitter</a> | <a href="https://github.com/mirucon" target="blank">GitHub</a>
</template>

<script>
export default {
  name: 'about-site',
  data: () => ({
    showAboutSite: false,
    hasOpenedOnce: false
  }),
  methods: {
    click: function () {
      this.showAboutSite = !this.showAboutSite
      if (!this.hasOpenedOnce) {
        this.hasOpenedOnce = true
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.toggle--modalSwitcher
  bottom 85px
  background-color #3399cc

  @media only screen and (device-width 375px) and (device-height 812px) and (-webkit-device-pixel-ratio 3)
    bottom 115px

.label
  font-size .7em

.aboutSite__content
  padding-right 1em
  padding-left @padding-right

.author
  display inline-flex
  flex-flow column wrap
  align-items center
  justify-content center

.authorName
  padding-top .3em
</style>
