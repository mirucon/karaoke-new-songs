<template lang="pug">
  main.main
    div.container.songsList
      setting-panel(
        @toggleDAM="toggleDAM" @toggleJOY="toggleJOY" :showDAM="showDAM" :showJOY="showJOY"
      )
      about-site
      songs-pagination(@prev="goToLastWeek", @next="goToNextWeek", @loadMore="$emit('loadMore')", :hasLoaded="hasLoaded", :nextWeek="nextWeek", :lastWeek="lastWeek", :current="current")
      search-bar(v-model="searchQuery", @clearQuery="clearQuery", @searchBySong="searchBySong", @searchByArtist="searchByArtist")
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
      div.wrapper--notFound(v-if="searchQuery && cols.length <= 0")
        div
          p 検索結果が見つかりませんでした。
          button.button--green(type="button", @click="searchQuery = ''") 戻る
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import SongsPagination from '~/components/SongsPagination.vue'
import SearchBar from '~/components/SearchBar.vue'
import ModelSwitcher from '~/components/ModelSwitcher.vue'
import SettingPanel from '~/components/SettingPanel.vue'
import AboutSite from '~/components/AboutSite.vue'

export default {
  components: {
    AboutSite,
    SettingPanel,
    ModelSwitcher,
    SearchBar,
    SongsPagination
  },
  props: [
    // 'songsTable',
    // 'datesArray',
    'hasLoaded'
  ],
  data() {
    return {
      lastWeek: {
        isButtonShown: true
      },
      nextWeek: {
        isButtonShown: true
      },
      current: '',
      searchQuery: '',
      filterSong: true,
      filterArtist: true,
      showDAM: true,
      showJOY: true,
      sortBy: 'artist',
      cols: [],
      thead: ['', '歌手名', '曲名', '配信日']
    }
  },
  computed: {
    ...mapState(['datesArray', 'songsTable'])
  },
  watch: {
    searchQuery: function() {
      this.getSearchResults()
    },
    songsTable: function() {
      this.currentDateChecker()
    },
    current: function() {
      this.cols = this.returnCurrentData()
      this.currentDateChecker()
      this.sortCols()
    },
    sortBy: function() {
      this.sortCols()
    }
  },
  mounted: function() {
    // デフォルト設定の `current` の値 //
    this.current = this.datesArray[1]
    setTimeout(() => {
      this.currentDateChecker()
    }, 400)
    // if URL query is included in the first load. //
    let query = ''
    setTimeout(() => {
      query = this.$route.query.s
      if (query) {
        this.searchQuery = query
      }
    }, 100)
  },
  methods: {
    goToLastWeek: function() {
      //  前週分へ移動  //
      if (!this.lastWeek.isButtonShown) return
      let index = this.datesArray.indexOf(this.current)
      index += 1
      this.$emit('filterArray')

      while (true) {
        if (index === Object.keys(this.songsTable).length) {
          this.lastWeek.isButtonShown = false
          return
        } else if (!this.songsTable[this.datesArray[index]].isExisted) {
          index -= 1
        } else {
          break
        }
      }
      this.current = this.datesArray[index]
      this.clearQuery()

      // Check for the previous week and disable the button if it reaches to the end.
      index = this.datesArray.indexOf(this.current) + 1
      if (index === Object.keys(this.songsTable).length) {
        this.lastWeek.isButtonShown = false
      }
    },
    goToNextWeek: function() {
      //  次週分へ移動  //
      if (!this.nextWeek.isButtonShown) return
      this.$emit('filterArray')
      let index = this.datesArray.indexOf(this.current)
      index -= 1
      while (true) {
        if (index === -1) {
          this.nextWeek.isButtonShown = false
          return
        } else if (!this.songsTable[this.datesArray[index]].isExisted) {
          index -= 1
        } else {
          break
        }
      }
      this.current = this.datesArray[index]
      this.clearQuery()
    },
    currentDateChecker: function() {
      // 既に最新週まで到達、もしくは次週分がない場合: 次週ボタンの無効化 //
      if (
        this.current === this.datesArray[0] ||
        (this.current === this.datesArray[1] &&
          !this.songsTable[this.datesArray[0]].isExisted)
      ) {
        this.nextWeek.isButtonShown = false
      } else {
        this.nextWeek.isButtonShown = true
      }
      // 既に最前週まで到達、もしくは前週分がない場合: 前週ボタンの無効化 //
      if (
        this.current === this.datesArray[this.datesArray.length - 1] ||
        (this.current === this.datesArray[this.datesArray.length - 1] &&
          !this.songsTable[this.datesArray[this.datesArray.length - 1]]
            .isExisted)
      ) {
        this.lastWeek.isButtonShown = false
      } else {
        this.lastWeek.isButtonShown = true
      }
    },
    returnCurrentData: function() {
      // 現在位置から当てはまる曲リストを返す //
      let cols = this.songsTable[this.current].cols
      for (let col of cols.keys()) {
        if (cols[col].length !== 3) {
          let wrappedNm = [cols[col][1], cols[col][2]]
          cols[col] = [cols[col][0], wrappedNm, cols[col][3]]
        }
      }
      return cols
    },
    getSearchResults: function() {
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
    clearQuery: function() {
      // SearchQuery をクリア //
      this.$router.replace({ query: '' })
      this.searchQuery = ''
    },
    sortCols: function() {
      /* Custom sort by model/artist/song/date */
      function comparatorModel(a, b) {
        if (a[0] < b[0]) return -2
        if (a[0] > b[0]) return 2
        if (a[1][0] < b[1][0]) return -2
        if (a[1][0] > b[1][0]) return 2
        if (a[1][1] < b[1][1]) return -1
        if (a[1][1] > b[1][1]) return 1
        return 0
      }
      function comparatorArtist(a, b) {
        if (a[1][0] < b[1][0]) return -2
        if (a[1][0] > b[1][0]) return 2
        if (a[1][1] < b[1][1]) return -1
        if (a[1][1] > b[1][1]) return 1
        return 0
      }
      /**
       * Custom sort by song
       * @param {array} a - An element to sort
       * @param {array} b - An element to sort
       * @returns {number} - The number for sorting
       */
      function comparatorSong(a, b) {
        if (a[1][1] < b[1][1]) return -1
        if (a[1][1] > b[1][1]) return 1
        return 0
      }
      /**
       * Custom sort by date
       * @param {array} a - An element to sort
       * @param {array} b - An element to sort
       * @returns {number} - The number for sorting
       */
      function comparatorDate(a, b) {
        if (Array.isArray(a[2])) {
          let aDate = moment(a[2][1], 'M/D')
          let bDate = moment(b[2][1], 'M/D')
          if (aDate < bDate) return -1
          if (aDate > bDate) return 1
          if (a[1][0] < b[1][0]) return -2
          if (a[1][0] > b[1][0]) return 2
          if (a[1][1] < b[1][1]) return -1
          if (a[1][1] > b[1][1]) return 1
        } else {
          if (a[2] < b[2]) return -3
          if (a[2] > b[2]) return 3
          if (a[1][0] < b[1][0]) return -2
          if (a[1][0] > b[1][0]) return 2
          if (a[1][1] < b[1][1]) return -1
          if (a[1][1] > b[1][1]) return 1
        }
        return 0
      }

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
    searchBySong: function() {
      this.filterSong = !this.filterSong
      this.getSearchResults()
    },
    searchByArtist: function() {
      this.filterArtist = !this.filterArtist
      this.getSearchResults()
    },
    toggleDAM: function() {
      this.showDAM = !this.showDAM
      if (!this.showJOY && !this.showDAM) {
        this.showJOY = true
      }
    },
    toggleJOY: function() {
      this.showJOY = !this.showJOY
      if (!this.showJOY && !this.showDAM) {
        this.showDAM = true
      }
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
