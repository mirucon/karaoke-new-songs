<template lang="pug">
  div.aboutSite
    .toggle--modalSwitcher.toggle--aboutSite(@click="click" :class="{ isOpen: showAboutSite, isClosed: !hasOpenedOnce }")
      img(:src="help" width="32" height="32" alt="about")
      span.label About
    transition(name="fadeLeft")
      div.modalWindow.aboutSite__inner(v-show="showAboutSite" :class="{ isOpen: showAboutSite }")
        span.icon--clear.modalWindow__close.aboutSite__close(@click="click")
          span.top
          span.bottom

        section.aboutSite__content.aboutThisSite
          h3 このサイトについて
          p DAMとJOYSOUNDの最新曲を同時に表示し、検索が出来るビューアーサイトです。DAM/JOYSOUNDの表示切替や、並べ替え機能も備わっています。
          p DAM楽曲は毎週木曜日の11時, JOYSOUND楽曲は平日0時のそれぞれ5分ほど後に更新されます。<br>
          p ホーム画面にこのサイトを追加するとアプリのように使えます。

        section.aboutSite__content.aboutTheAuthor
          h3 作者について
          a.author(href="https://twitter.com/mirucons")
            img.authorIcon(src="https://secure.gravatar.com/avatar/38228223544cf5f1f818c93ecdd4371f" width="80" height="80" alt="mirucon")
            span.authorName: strong mirucon
          p Vue.jsやWordPress開発をする15歳のフリーランスエンジニア。DAMの精密採点が趣味。
          p 現在 Web サイト製作依頼受付中です。お気軽にお問い合わせください。
          p <a href="https://twitter.com/mirucons" target="blank">Twitter</a> | <a href="https://github.com/mirucon" target="blank">GitHub</a>

        section.aboutSite__content.attributions
          h3 リソース
          p このサイトでは以下のリソースを使用しています :
          h4 Font Awesome Icons
          ul
            li License: CC-BY 4.0
            li URL: https://fontawesome.com/license
            li Created by Fonticons, Inc.
          h4 Gen Jyuu Gothic
          ul
            li License: SIL Open Font License 1.1
            li URL: http://jikasei.me/info/license.html
            li Created by MM.
</template>

<script>
import helpIcon from '~/assets/icon/help.svg'

export default {
  name: 'AboutSite',
  data: () => ({
    showAboutSite: false,
    hasOpenedOnce: false,
    help: helpIcon
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

h4
  margin-top .8em
  margin-bottom .3em
ul
  list-style none
</style>
