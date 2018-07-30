<template lang="pug">
  nav.pagination
    div.prev(@click="goToPrevWeek", :class="{isHidden: !lastWeek.isButtonShown}")
      i.icon.icon--caret.left
      | 前週
    div.current {{ current | formatCurrentDate }} 配信
    div.next(@click="goToNextWeek", :class="{isHidden: !nextWeek.isButtonShown}") 次週
      i.icon.icon--caret.right
</template>

<script lang="ts">
import { mapState } from 'vuex'

export default {
  name: 'SongsPagination',
  filters: {
    formatCurrentDate(value) {
      // 実表示用の日付フォーマットに変換 //
      if (value === '') {
        return ''
      }
      let date = new Date(value)
      date.setDate(date.getDate() - 1)
      let mStart: any = date.getMonth() + 1
      let dStart: any = date.getDate()
      if (mStart < 10) {
        mStart = '0' + mStart
      }
      if (dStart < 10) {
        dStart = '0' + dStart
      }
      date.setDate(date.getDate() + 6)
      let mEnd: any = date.getMonth() + 1
      let dEnd: any = date.getDate()
      if (mEnd < 10) {
        mEnd = '0' + mEnd
      }
      if (dEnd < 10) {
        dEnd = '0' + dEnd
      }
      return mStart + '/' + dStart + ' ~ ' + mEnd + '/' + dEnd
    }
  },
  data() {
    return {
      canLoadMore: true,
      loaded: 0,
      isLoaded: false,
      formattedCurrent: '',
      lastWeek: {
        isButtonShown: true
      },
      nextWeek: {
        isButtonShown: true
      }
    }
  },
  computed: {
    ...mapState(['current', 'songsTable', 'datesArray', 'meta'])
  },
  watch: {
    current: function() {
      this.currentDateChecker()
    },
    songsTable: function() {
      this.currentDateChecker()
    }
  },
  mounted: function() {
    setTimeout(() => {
      this.currentDateChecker()
    }, 400)
  },
  methods: {
    async goToPrevWeek() {
      //  前週分へ移動  //
      if (!this.lastWeek.isButtonShown) return
      if (this.meta.oldest === this.current) {
        this.lastWeek.isButtonShown = false
      } else {
        this.lastWeek.isButtonShown = true
        this.$store.commit('setCurrent', this.meta.prev)
        await this.$store.dispatch('getSingleSongsTable', this.meta.prev)
      }
    },
    async goToNextWeek() {
      //  次週分へ移動  //
      if (this.meta.latest === this.current) {
        this.nextWeek.isButtonShown = false
      } else {
        this.nextWeek.isButtonShown = true
        this.$store.commit('setCurrent', this.meta.next)
        await this.$store.dispatch('getSingleSongsTable', this.meta.next)
      }
    },
    currentDateChecker: function() {
      if (this.meta.oldest === this.current) {
        this.lastWeek.isButtonShown = false
      } else {
        this.lastWeek.isButtonShown = true
      }

      if (this.meta.latest === this.current) {
        this.nextWeek.isButtonShown = false
      } else {
        this.nextWeek.isButtonShown = true
      }
    },
    prev: function() {
      // if it can load more then load more. Otherwise move to the previous week. //
      if (this.canLoadMore) {
        this.loadMore()
      } else {
        this.goToPrevWeek()
      }
    },
    loadMore: async function() {
      this.isLoaded = true
      await this.$store.dispatch('loadMore')
      this.goToPrevWeek()
      this.isLoaded = false
      this.loaded++
      if (this.loaded >= 2) {
        this.canLoadMore = false
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.pagination
  display flex
  flex-flow row wrap
  align-items center
  position sticky
  top 0
  z-index 99
  background-color #ffffffdd
  padding .3em 0
  @media only screen and (max-width 640px and orientation landscape)
    position relative

.prev, .next
  flex-shrink 1
  padding .7em .86em
  border $accent solid 1px
  color $accent
  font-weight 600
  border-radius 2px
  box-shadow 0 1px 1px rgba(0, 0, 0, .6)
  transition background-color .4s, color .4s, box-shadow .4s
  &:hover
    border $accent solid 1px
    color #fff
    background-color: rgba($accent, .98)
    cursor: pointer
    border-radius 2px
    box-shadow 0 2px 1px rgba(0, 0, 0, .2)
    .icon--caret.left
      transform translateX(-4px) scale(.9)
      &::before, &::after
        box-shadow inset 0 0 0 32px #eee
    .icon--caret.right
      transform translateX(4px) scale(.9)
      &::before, &::after
        box-shadow inset 0 0 0 32px #eee

.prev
  justify-content flex-start
  margin-left 10px
  padding-left: 1em
  text-align: right
.next
  justify-content flex-end
  margin-right 10px
  padding-right: 1em
.current
  flex 1
  text-align center
  color: #555

.icon--caret.right
  margin-left .7em
  transform scale(.9)
.icon--caret.left
  transform scale(.9)
  margin-right .7em

// When it reaches to the end
.prev.isHidden, .next.isHidden
  background-color: #aaa
  color: #555
  box-shadow none
  .icon--caret.left, .icon--caret.right
    &::after, &::before
      box-shadow inset 0 0 0 32px #777
  &:hover
    background-color: #aaa
    .icon--caret.left, .icon--caret.right
      transform scale(.9)
</style>
