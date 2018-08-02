<template lang="pug">
  main.main
    div.container.songsList
      setting-panel
      about-site
      songs-pagination
      search-bar(v-model="searchQuery", @clearQuery="clearQuery", @searchBySong="searchBySong", @searchByArtist="searchByArtist")
      section.releaseList
        div.releaseList__col.releaseList__heading#releaseList__heading
          div.releaseList__heading__item.releaseList__model(@click="sortBy = 'model'" :class="{ currentSort: sortBy === 'model' }") &nbsp;
          div.releaseList__heading__item.releaseList__artist(@click="sortBy = 'artist'" :class="{ currentSort: sortBy === 'artist' }") 歌手名
          div.releaseList__heading__item.releaseList__song(@click="sortBy = 'song'" :class="{ currentSort: sortBy === 'song' }") 曲名
          div.releaseList__heading__item.releaseList__date(@click="sortBy = 'date'" :class="{ currentSort: sortBy === 'date' }") 配信日

        div.releaseList__col.releaseList__line(
          v-for="col in cols", :class="{ dam: col[0] === 'D', joy: col[0] === 'J', both: col[0] === 'D,J', isDAMHidden: !settings.showDAM, isJOYHidden: !settings.showJOY }"
        )

          template(v-for="(item, index) in col")
            div.releaseList__item.releaseList__model(
              v-if="index === 0", :class="{ 'icon--dam': item === 'D', 'icon--joy': item === 'J', 'icon--both': item === 'D,J' }"
            ): span.releaseList__model__inner {{ item }}
            div.releaseList__item.releaseList__songWrapper(v-else-if="index === 1")
              template(v-for="(nm, index) in item")
                div(
                  :class="{ releaseList__artist: index === 0, releaseList__song: index === 1 }"
                ): span(:class="{ releaseList__artist__inner: index === 0, releaseList__song__inner: index === 1 }") {{ nm }}
            div.releaseList__item.releaseList__date(v-else-if="index === 2") {{ item[1] }}
      div.wrapper--notFound(v-if="searchQuery && cols.length <= 0")
        div
          p 検索結果が見つかりませんでした。
          button.button--green(type="button", @click="searchQuery = ''") 戻る
</template>

<script lang="ts">
import { mapState } from 'vuex'
import moment from 'moment'
import SongsPagination from '~/components/SongsPagination.vue'
import SearchBar from '~/components/SearchBar.vue'
import ModelSwitcher from '~/components/ModelSwitcher.vue'
import SettingPanel from '~/components/SettingPanel.vue'
import AboutSite from '~/components/AboutSite.vue'

/* Custom sort by model/artist/song/date */
const comparatorModel = (a, b) => {
  if (a[0] < b[0]) return -2
  if (a[0] > b[0]) return 2
  if (a[1][0] < b[1][0]) return -2
  if (a[1][0] > b[1][0]) return 2
  if (a[1][1] < b[1][1]) return -1
  if (a[1][1] > b[1][1]) return 1
  return 0
}
const comparatorArtist = (a, b) => {
  if (a[1][0] < b[1][0]) return -2
  if (a[1][0] > b[1][0]) return 2
  if (a[1][1] < b[1][1]) return -1
  if (a[1][1] > b[1][1]) return 1
  return 0
}
const comparatorSong = (a, b) => {
  if (a[1][1] < b[1][1]) return -1
  if (a[1][1] > b[1][1]) return 1
  return 0
}
const comparatorDate = (a, b) => {
  let aDate = moment(a[2][0], 'YYYY/M/D')
  let bDate = moment(b[2][0], 'YYYY/M/D')
  if (aDate < bDate) return -1
  if (aDate > bDate) return 1
  if (a[1][0] < b[1][0]) return -1
  if (a[1][0] > b[1][0]) return 1
  if (a[1][1] < b[1][1]) return -1
  if (a[1][1] > b[1][1]) return 1
  return 0
}

export default {
  components: {
    AboutSite,
    SettingPanel,
    ModelSwitcher,
    SearchBar,
    SongsPagination
  },
  data: () => ({
    prevWeek: {
      isButtonShown: true
    },
    nextWeek: {
      isButtonShown: true
    },
    searchQuery: '',
    filterSong: true,
    filterArtist: true,
    sortBy: 'artist',
    cols: [],
    thead: ['', '歌手名', '曲名', '配信日']
  }),
  computed: {
    ...mapState([
      'datesArray',
      'songsTable',
      'current',
      'isLoading',
      'meta',
      'settings'
    ])
  },
  watch: {
    searchQuery() {
      this.getSearchResults()
    },
    current() {},
    isLoading() {
      if (!this.isLoading) {
        this.cols = this.returnCurrentData()
        this.sortCols()
        this.scrollToTop()
        this.clearQuery()
      }
    },
    sortBy() {
      this.sortCols()
    }
  },
  mounted() {
    // デフォルト設定の `current` の値 //
    this.$store.commit('setCurrent', this.meta.current)
    // if URL query is included in the first load. //
    let query = ''
    setTimeout(() => {
      query = this.$route.query.s
      if (query) {
        this.searchQuery = query
      }
    }, 100)
    this.cols = this.returnCurrentData()
    this.sortCols()
    this.scrollToTop()
    this.clearQuery()
  },
  methods: {
    scrollToTop() {
      const el: HTMLElement = document.getElementById('releaseList__heading')
      if (el && el.getBoundingClientRect().top < window.pageYOffset) {
        // @ts-ignore
        const SmoothScroll = require('smooth-scroll')
        const scroll = new SmoothScroll()
        const options = { speed: 300, ease: 'easeOutCubic' }
        scroll.animateScroll(el, null, options)
      }
    },
    returnCurrentData() {
      // 現在位置から当てはまる曲リストを返す //
      return this.songsTable[this.current].cols
    },
    getSearchResults() {
      // 検索結果 //
      let cols = this.returnCurrentData()
      let searchQuery = this.searchQuery.toLowerCase().trim()
      if (searchQuery) {
        this.$router.push({
          path: this.$route.path,
          query: { s: this.searchQuery }
        })
        cols = cols.filter(col => {
          return Object.keys(col).some(key => {
            // Do not include D or J & 配信日 in search results.
            if (parseInt(key) > 1 || parseInt(key) === 0) return
            // If artist is unchecked
            if (!this.filterArtist && parseInt(key) === 1) {
              return (
                String(col[key][1])
                  .toLowerCase()
                  .indexOf(searchQuery) > -1
              )
            }
            // If song is unchecked
            if (!this.filterSong && parseInt(key) === 1) {
              return (
                String(col[key][0])
                  .toLowerCase()
                  .indexOf(searchQuery) > -1
              )
            }
            if (parseInt(key) === 1 && !this.filterSong && !this.filterArtist) {
              return
            }
            return (
              String(col[key])
                .toLowerCase()
                .indexOf(searchQuery) > -1
            )
          })
        })
        this.cols = cols
      } else {
        // When search query is clear //
        this.cols = this.returnCurrentData()
        this.clearQuery()
      }
    },
    clearQuery() {
      // SearchQuery をクリア //
      this.$router.replace({ query: '' })
      this.searchQuery = ''
    },
    sortCols() {
      if (this.sortBy === 'model') {
        // Replace "D,J" with "Z" so they can go at the top of list.
        for (let col in this.cols) {
          if (this.cols[col][0] === 'D,J') {
            this.cols[col][0] = 'A'
          }
        }
        // Perform sort.
        this.cols = this.cols.sort(comparatorModel)
        // Change back "Z" to "D,J"
        for (let col in this.cols) {
          if (this.cols[col][0] === 'A') {
            this.cols[col][0] = 'D,J'
          }
        }
      } else if (this.sortBy === 'artist') {
        this.cols = this.cols.sort(comparatorArtist)
      } else if (this.sortBy === 'song') {
        this.cols = this.cols.sort(comparatorSong)
      } else if (this.sortBy === 'date') {
        this.cols = this.cols.sort(comparatorDate)
      }
    },
    searchBySong() {
      this.filterSong = !this.filterSong
      this.getSearchResults()
    },
    searchByArtist() {
      this.filterArtist = !this.filterArtist
      this.getSearchResults()
    }
  }
}
</script>

<style scoped lang="stylus">
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
