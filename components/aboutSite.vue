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
          p DAMとJOYSOUNDの最新曲を同時に表示し、検索も出来るビューアーサイトです。
          p DAM/JOYSOUNDの表示切り替え機能や、曲名/配信日ソート機能も備わっています。
          p DAM楽曲は毎週木曜日の11時、JOYSOUND楽曲はほぼ毎日0時に更新されますが、データ取得からキャッシュクリアに少し時間がかかります。<br>
          p 最新情報を見るには、更新時刻より10分ほど後にアクセスしてください。

        section.aboutSite__content.aboutTheAuthor
          h3 作者について
          a.author(href="https://twitter.com/mirucons")
            img.authorIcon(src="https://secure.gravatar.com/avatar/38228223544cf5f1f818c93ecdd4371f" width="74" height="74")
            span.authorName: strong mirucon
          p Vue.jsやWordPressを触ってる15歳のエンジニアです。
          p 現在アルバイト/インターン先を募集しています。興味のあるWeb制作会社さんがいたら是非お声がけください。
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
  padding-right 1.2em
  padding-left @padding-right

.author
  display inline-flex
  flex-flow column wrap
  align-items center
  justify-content center

.authorName
  padding-top .3em
</style>
