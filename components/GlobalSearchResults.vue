<template lang="pug">
  div#wrapper--globalSearchResults.wrapper--globalSearchResults
    div.container
      section.releaseList
        div.releaseList__col.releaseList__heading
          div.releaseList__heading__item.releaseList__model(@click="sortBy = 'model'" :class="{ currentSort: sortBy === 'model' }") &nbsp;
          div.releaseList__heading__item.releaseList__artist(@click="sortBy = 'artist'" :class="{ currentSort: sortBy === 'artist' }") 歌手名
          div.releaseList__heading__item.releaseList__song(@click="sortBy = 'song'" :class="{ currentSort: sortBy === 'song' }") 曲名
          div.releaseList__heading__item.releaseList__date(@click="sortBy = 'date'" :class="{ currentSort: sortBy === 'date' }") 配信日
        div.releaseList__col.releaseList__line(v-for="col in cols", :class="{ dam: col[0] === 'D', joy: col[0] === 'J', both: col[0] === 'D,J', isDAMHidden: !showDAM, isJOYHidden: !showJOY }")
          template(v-for="(item, index) in col")
            div.releaseList__item.releaseList__model(
            v-if="index === 0", :class="{ 'icon--dam': item === 'D', 'icon--joy': item === 'J', 'icon--both': item === 'D,J' }"
            ): span.releaseList__model__inner {{ item }}
            div.releaseList__item.releaseList__songWrapper(v-else-if="index === 1")
              template(v-for="(nm, index) in item")
                div(
                :class="{ releaseList__artist: index === 0, releaseList__song: index === 1 }"
                ): span(:class="{ releaseList__artist__inner: index === 0, releaseList__song__inner: index === 1 }") {{ nm }}
            div.releaseList__item.releaseList__date(v-else-if="index === 2 && Array.isArray(item)") {{ item[0] }}
            div.releaseList__item.releaseList__date(v-else-if="index === 2") {{ item }}
      div.wrapper--notFound(v-if="cols.length <= 0")
        div
          p 検索結果が見つかりませんでした。
</template>

<script lang="ts">
import { mapState } from 'vuex'

export default {
  name: 'GlobalSearchResults',
  data: () => ({
    sortBy: 'artist',
    showDAM: true,
    showJOY: true
  }),
  computed: {
    ...mapState({
      cols: 'searchResults'
    })
  }
}
</script>

<style scoped lang="stylus">
.wrapper--globalSearchResults
  position relative
  z-index 0
  margin-top 20vh
  padding-top 1.6em

.container
  padding-right 0
  padding-left 0

.songsList
  margin-bottom 2em

.releaseList
  width 100%
  color #333
.releaseList__line
  border-bottom 1px solid #ddd
  transition .2s all
  &.dam
    background-color rgba($accent, .02)
    &:nth-child(even)
      background-color rgba($accent, .024)

    .releaseList__artist
      background-color rgba($accent, .09)

    @media screen and (min-width 641px)
      .releaseList__model
        background-color rgba($accent, .06)

    &.isDAMHidden
      display none

  &.joy
    background-color rgba(#1000ff, .02)
    &:nth-child(even)
      background-color rgba(#1000ff, .024)

    .releaseList__artist
      background-color rgba(#1000ff, .058)

    @media screen and (min-width 641px)
      .releaseList__model
        background-color rgba(#1000ff, .042)

    &.isJOYHidden
      display none

  &.both
    background-color rgba(#1e343b, .02)

    .releaseList__artist
      background-color rgba(#1e343b, .064)

    @media screen and (min-width 641px)
      .releaseList__model
        background-color rgba(#1e343b, .02)

  &:hover
    box-shadow 0 1px 0 #00000010
  &.notFound
    &:hover
      box-shadow 0 1px 0 #00000010

.releaseList__col
  display flex
  flex-flow row wrap
  align-items center

.releaseList__heading__item
  padding .8em .7em
  @media screen and (min-width 641px)
    padding .7em .7em
    &.releaseList__song
    &.releaseList__artist
      padding-right 1em
      padding-left @padding-right

  &.releaseList__model
    align-self stretch
  @media screen and (max-width 640px)
    &.releaseList__artist
    &.releaseList__song
      flex 1

.releaseList__item
  padding 1.4em .7em
  @media screen and (min-width 641px)
    padding 16px 13px

.releaseList__heading
  background-color #b7626160

.releaseList__songWrapper
  flex 1
  align-self stretch
  display flex
  flex-flow column wrap
  align-items stretch
  border solid #e1e1e1
  border-width 0 .02em
  @media screen and (min-width 641px)
    flex-flow row wrap
    align-items center
    padding 0
    border-left 0

  *[class*="releaseList__"]
    display flex
    align-self stretch
    & > *[class$="__inner"]
      align-self center

  .releaseList__artist
    margin-bottom .45em
    padding .18em .4em
    color #616161
    font-size .9em
    @media screen and (max-width 640px)
      align-self flex-start
    @media screen and (min-width 641px)
      margin-bottom 0
      padding 1.14em 1em
      color currentColor
      font-size 1em

  .releaseList__song
    flex 1
    @media screen and (min-width 641px)
      padding 1.14em 1em

.releaseList__song
  flex 1
.releaseList__artist
  @media screen and (min-width 641px)
    width 250px

.releaseList__model
  align-self stretch
  display flex
  align-items center
  width 1.5em
  padding-left .46em
  padding-right .3em
  font-size .84em
  font-weight 600
  word-break break-word
  .releaseList__model__inner
    align-self center
  @media screen and (min-width 641px)
    padding-right .6em
    font-size .94em

.releaseList__date
  // flex 0 1 5%
  text-align center
  font-size .9em

.releaseList__heading__item
  transition background-color .2s
  &:hover
    background-color #b7626116
  &.currentSort
    background-color #b7626132

.icon--dam
  color #ad2d28
.icon--joy
  color #194480
.icon--both
  line-height 1.2

.wrapper--notFound
  padding .8em .7em
  width 100%
  text-align center
  box-shadow 0 1px 0 #00000010
</style>
