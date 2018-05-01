<template lang="pug">
  main.main
    div.container.songsList
      setting-panel(
        @toggleDAM="toggleDAM" @toggleJOY="toggleJOY" :showDAM="showDAM" :showJOY="showJOY"
      )
      songs-pagination(@prev="goToLastWeek", @next="goToNextWeek", @loadMore="$emit('loadMore')", :hasLoaded="hasLoaded", :nextWeek="nextWeek", :lastWeek="lastWeek", :current="current")
      search-bar(v-model="searchQuery", @clearQuery="clearQuery", @searchBySong="searchBySong", @searchByArtist="searchByArtist")
      table.releaseList
        thead.releaseList__heading
          tr
            td
            td.releaseList__heading__item(@click="sortBy = 'artist'" :class="{ currentSort: sortBy === 'artist' }") 歌手名
            td.releaseList__heading__item(@click="sortBy = 'song'" :class="{ currentSort: sortBy === 'song' }") 曲名
            td.releaseList__heading__item(@click="sortBy = 'date'" :class="{ currentSort: sortBy === 'date' }") 配信日
        tbody
            tr.releaseList__line(v-for="col in cols", :class="{ dam: col[0] === 'D', joy: col[0] === 'J', both: col[0] === 'D,J', isDAMHidden: !showDAM, isJOYHidden: !showJOY }")
              template(v-for="(item, index) in col")
                td.releaseList__item(v-if="index === 0", :class="{ 'icon--dam': item === 'D', 'icon--joy': item === 'J', 'icon--both': item === 'D,J' }") {{ item }}
                td.releaseList__item.artist(v-else-if="index === 1", @click="searchQuery = item") {{ item }}
                td.releaseList__item(v-else-if="index === 3 && Array.isArray(item)") {{ item[0] }}
                td.releaseList__item(v-else) {{ item }}
      div.wrapper--notFound(v-if="searchQuery && cols.length <= 0")
        div
          p 検索結果が見つかりませんでした。
          button.button--green(type="button", @click="searchQuery = ''") 戻る
</template>

<script>
import SongsPagination from '~/components/SongsPagination.vue'
import SearchBar from '~/components/SearchBar.vue'
import ModelSwitcher from '~/components/ModelSwitcher.vue'
import SettingPanel from '~/components/SettingPanel.vue'

export default {
  components: {
    SettingPanel,
    ModelSwitcher,
    SearchBar,
    SongsPagination
  },
  data () {
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
  props: ['songsTable', 'datesArray', 'hasLoaded'],
  mounted: function () {
    // デフォルト設定の `current` の値 //
    // 日曜日以降なら今週分を取得
    if (new Date().getDay() >= 0) {
      this.current = this.datesArray[1]
    } else {
      this.current = this.datesArray[2]
    }
    setTimeout(() => {
      this.currentDateChecker()
    }, 400)
    // if URL query is included in the first load. //
    let query = ''
    setTimeout(() => {
      query = this.$route.query.s
      if (query) {
        console.log('query = ' + query)
        this.searchQuery = query
      }
    }, 100)
  },
  methods: {
    goToLastWeek: function () {
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
    goToNextWeek: function () {
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
    currentDateChecker: function () {
      // 既に最新週まで到達、もしくは次週分がない場合: 次週ボタンの無効化 //
      if (this.current === this.datesArray[0] || (this.current === this.datesArray[0] && !this.songsTable[this.datesArray[0]].isExisted)) {
        this.nextWeek.isButtonShown = false
      } else {
        this.nextWeek.isButtonShown = true
      }
      // 既に最前週まで到達、もしくは前週分がない場合: 前週ボタンの無効化 //
      if (
        this.current === this.datesArray[this.datesArray.length - 1] ||
        (this.current === this.datesArray[this.datesArray.length - 1] &&
          !this.songsTable[this.datesArray[this.datesArray.length - 1]].isExisted)
      ) {
        this.lastWeek.isButtonShown = false
      } else {
        this.lastWeek.isButtonShown = true
      }
    },
    returnCurrentData: function () {
      // 現在位置から当てはまる曲リストを返す //
      return this.songsTable[this.current].cols
    },
    getSearchResults: function () {
      // 検索結果 //
      let cols = this.returnCurrentData()
      let searchQuery = this.searchQuery.toLowerCase().trim()
      if (searchQuery) {
        this.$router.push({path: this.$route.path, query: {s: this.searchQuery}})
        cols = cols.filter(col => {
          return Object.keys(col).some(key => {
            // Do not include D or J & 配信日 in search results.
            if (parseInt(key) > 2 || parseInt(key) === 0) return
            // Filters song/artist
            if (!this.filterArtist && parseInt(key) === 1) return
            if (!this.filterSong && parseInt(key) === 2) return
            return String(col[key]).toLowerCase().indexOf(searchQuery) > -1
          })
        })
        this.cols = cols
      } else {
        // When search query is clear //
        this.cols = this.returnCurrentData()
        this.clearQuery()
      }
    },
    clearQuery: function () {
      // SearchQuery をクリア //
      this.$router.replace({query: ''})
      this.searchQuery = ''
    },
    sortCols: function () {
      // Sort cols by model/song/artist/date //
      function comparatorArtist (a, b) {
        if (a[1] < b[1]) return -2
        if (a[1] > b[1]) return 2
        if (a[2] < b[2]) return -1
        if (a[2] > b[2]) return 1
        return 0
      }
      function comparatorSong (a, b) {
        if (a[2] < b[2]) return -1
        if (a[2] > b[2]) return 1
        return 0
      }
      function comparatorDate (a, b) {
        if (Array.isArray(a[3])) {
          if (a[3][1] < b[3][1]) return -3
          if (a[3][1] > b[3][1]) return 3
          if (a[1] < b[1]) return -2
          if (a[1] > b[1]) return 2
          if (a[2] < b[2]) return -1
          if (a[2] > b[2]) return 1
        } else {
          if (a[3] < b[3]) return -3
          if (a[3] > b[3]) return 3
          if (a[1] < b[1]) return -2
          if (a[1] > b[1]) return 2
          if (a[2] < b[2]) return -1
          if (a[2] > b[2]) return 1
        }
        return 0
      }

      if (this.sortBy === 'artist') {
        // this.cols = this.returnCurrentData()
        this.cols = this.cols.sort(comparatorArtist)
      } else if (this.sortBy === 'song') {
        this.cols = this.cols.sort(comparatorSong)
      } else if (this.sortBy === 'date') {
        this.cols = this.cols.sort(comparatorDate)
      }
    },
    searchBySong: function () {
      this.filterSong = !this.filterSong
      this.getSearchResults()
    },
    searchByArtist: function () {
      this.filterArtist = !this.filterArtist
      this.getSearchResults()
    },
    toggleDAM: function () {
      this.showDAM = !this.showDAM
      if (!this.showJOY && !this.showDAM) {
        this.showJOY = true
      }
    },
    toggleJOY: function () {
      this.showJOY = !this.showJOY
      if (!this.showJOY && !this.showDAM) {
        this.showDAM = true
      }
    }
  },
  watch: {
    searchQuery: function () {
      this.getSearchResults()
    },
    songsTable: function () {
      this.currentDateChecker()
    },
    current: function () {
      this.cols = this.returnCurrentData()
      this.currentDateChecker()
      this.sortCols()
    },
    sortBy: function () {
      this.sortCols()
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
.releaseList__line
  &.dam
    background-color rgba($accent, .06)
    &.isDAMHidden
      display none
  &.joy
    background-color rgba(#1000ff, .066)
    &.isJOYHidden
      display none
  &.both
    background-color rgba(#1e343b, .092)
  &:hover
    box-shadow 0 2px 1px #00000018
  &.notFound
    &:hover
      box-shadow 0 1px 0 #00000010

.releaseList__heading
  background-color #b7626160

.releaseList__heading__item
  transition background-color .2s
  &:hover
    background-color #b7626116
  &.currentSort
    background-color #b7626132

.releaseList__heading__item:nth-child(2)
  width 33%
.releaseList__heading__item:nth-child(n + 4)
  white-space nowrap
  text-align center

.releaseList__item:nth-child(1)
  padding-left .6em
  padding-right .6em
  font-size .84em
  font-weight 600
  @media screen and (min-width 641px)
    font-size .94em

.releaseList__item:nth-child(n + 4)
  white-space nowrap
  text-align center

.icon--dam
  color #ad2d28
.icon--joy
  color #194480
.artist
  cursor pointer

.wrapper--notFound
  padding .8em .7em
  width 100%
  text-align center
  box-shadow 0 1px 0 #00000010
</style>
