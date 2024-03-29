<template lang="pug">
  nav.pagination
    div.prev(@click="goToPrevWeek" :class="{isHidden: !prevWeek.isButtonShown}")
      span.icon.icon--caret.left
      | 前週

    div.prevIsLoading(:class="{isHidden: !prevWeek.isLoading}")
      span.loader.left

    div.current {{ meta.current | formatCurrentDate }} 配信

    div.nextIsLoading(:class="{isHidden: !nextWeek.isLoading}")
      span.loader.right

    div.next(@click="goToNextWeek" :class="{isHidden: !nextWeek.isButtonShown}") 次週
      span.icon.icon--caret.right
</template>

<script lang="ts">
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'SongsPagination',
  filters: {
    formatCurrentDate(value) {
      // 実表示用の日付フォーマットに変換 //
      if (value === '') {
        return ''
      }
      let date: moment.Moment = moment(value)
      const startDate: string = date.add(-1, 'd').format('M/D')
      const endDate: string = date.add(6, 'd').format('M/D')
      return `${startDate} ~ ${endDate}`
    }
  },
  data() {
    return {
      prevWeek: {
        isButtonShown: true,
        isLoading: false
      },
      nextWeek: {
        isButtonShown: true,
        isLoading: false
      }
    }
  },
  computed: {
    ...mapState(['meta'])
  },
  watch: {
    meta: {
      current() {
        this.currentDateChecker()
      }
    },
    songsTable() {
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
      if (!this.prevWeek.isButtonShown) return
      if (this.meta.oldest === this.meta.current) {
        this.prevWeek.isButtonShown = false
      } else {
        this.prevWeek.isButtonShown = true
        this.prevWeek.isLoading = true
        await this.$store.dispatch('getSingleSongsTable', this.meta.prev)
        this.currentDateChecker()
        this.prevWeek.isLoading = false
      }
    },
    async goToNextWeek() {
      //  次週分へ移動  //
      if (this.meta.latest === this.meta.current) {
        this.nextWeek.isButtonShown = false
      } else {
        this.nextWeek.isButtonShown = true
        this.nextWeek.isLoading = true
        await this.$store.dispatch('getSingleSongsTable', this.meta.next)
        this.currentDateChecker()
        this.nextWeek.isLoading = false
      }
    },
    currentDateChecker() {
      this.prevWeek.isButtonShown = this.meta.oldest !== this.meta.current
      this.nextWeek.isButtonShown = this.meta.latest !== this.meta.current
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/_variables.styl"
$loaderWidth = 30px
$loaderWidthMobile = 21px

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

.current
  width "calc(100% - %s * 2)" % $loaderWidth
  margin auto

  @media screen and (max-width 640px)
    width "calc(100% - %s * 2)" % $loaderWidth

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

.loader
  flex-basis 30px
  display inline-block
  position relative
  bottom -3px
  border 2px solid #f3f3f3
  border-top 2px solid $accent
  border-radius 50%
  width $loaderWidth
  height $loaderWidth
  animation spin 2s linear infinite
  &.left
    left 3px
  &.right
    right 3px

  @media screen and (max-width 640px)
    width $loaderWidthMobile
    height $loaderWidthMobile

.isHidden > .loader
  visibility hidden

@keyframes spin
  0%
    transform rotate(0deg)
  100%
    transform rotate(360deg)
</style>
