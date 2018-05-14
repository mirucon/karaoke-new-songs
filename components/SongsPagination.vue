<template lang="pug">
  nav.pagination
    div.prev(@click="prev", :class="{isHidden: !lastWeek.isButtonShown}")
      i.icon.icon--caret.left
      | 前週
    div.current {{ formattedCurrent }} 配信
    div.next(@click="$emit('next')", :class="{isHidden: !nextWeek.isButtonShown}") 次週
      i.icon.icon--caret.right
</template>

<script>
export default {
  name: 'SongsPagination',
  props: {
    current: String,
    hasLoaded: Boolean,
    lastWeek: {
      isButtonShown: Boolean
    },
    nextWeek: {
      isButtonShown: Boolean
    }
  },
  data () {
    return {
      canLoadMore: true,
      loaded: 0,
      formattedCurrent: ''
    }
  },
  watch: {
    current: function () {
      this.currentDateFormatter()
    },
    hasLoaded: function () {
      if (this.hasLoaded === true) {
        this.$emit('prev')
      }
    }
  },
  mounted: function () {
    this.currentDateFormatter()
  },
  methods: {
    currentDateFormatter: function () {
      // 実表示用の日付フォーマットに変換 //
      let current = this.current
      let date = new Date(current)
      date.setDate(date.getDate() - 1)
      let mStart = date.getMonth() + 1
      let dStart = date.getDate()
      if (mStart < 10) {
        mStart = '0' + mStart
      }
      if (dStart < 10) {
        dStart = '0' + dStart
      }
      date.setDate(date.getDate() + 6)
      let mEnd = date.getMonth() + 1
      let dEnd = date.getDate()
      if (mEnd < 10) {
        mEnd = '0' + mEnd
      }
      if (dEnd < 10) {
        dEnd = '0' + dEnd
      }
      this.formattedCurrent = mStart + '/' + dStart + ' ~ ' + mEnd + '/' + dEnd
    },
    prev: function () {
      // if it can load more then load more. Otherwise move to the previous week. //
      if (this.canLoadMore) {
        this.loadMore()
      } else {
        this.$emit('prev')
      }
    },
    loadMore: function () {
      // Emit loadMore and limit the number of times to load only two times. //
      this.$emit('loadMore')
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
