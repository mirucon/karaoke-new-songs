<template lang="pug">
  div.searchBox
    label.searchBox__label(aria-label="曲名 / アーティスト名 で検索")
      input#searchBox__input.searchBox__input(type="text", placeholder="曲名 / アーティスト名 で検索", @input="updateValue($event.target.value)", :value="value")
      span.icon--clear(@click="$emit('clearQuery')")
        span.top
        span.bottom
    .searchFilter(:class="{ isToggled: showFilterWindow }")
      .toggle--searchFilter(@click="click" :class="{ isFiltered: isFiltered }" ref="toggleSearchFilter") 絞り込み
      transition(name="fade")
        .searchFilter__inner(v-show="showFilterWindow" :class="{ isToggled: showFilterWindow }" :style="toggleHeight")
          .searchFilter__item.button--toggle(@click="filterArtist", :class="{ enabled: artistToggle }") アーティスト名
          .searchFilter__item.button--toggle(@click="filterSong", :class="{ enabled: songToggle }") 曲名

</template>

<script>
export default {
  name: 'search-bar',
  props: ['value'],
  data: () => ({
    showFilterWindow: '',
    toggleHeight: {'top': '40px', 'left': '0'},
    songToggle: true,
    artistToggle: true,
    isFiltered: false
  }),
  methods: {
    click () {
      this.showFilterWindow = !this.showFilterWindow
      this.calculateHeight()
      this.checkIsFiltered()
    },
    checkIsFiltered: function () {
      if (!this.songToggle || !this.artistToggle) {
        this.isFiltered = true
      } else {
        this.isFiltered = false
      }
    },
    updateValue: function (value) {
      let formattedValue = value.trim()
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      this.$emit('input', value)
    },
    filterSong: function () {
      this.songToggle = !this.songToggle
      this.$emit('searchBySong')
    },
    filterArtist: function () {
      this.artistToggle = !this.artistToggle
      this.$emit('searchByArtist')
    },
    calculateHeight () {
      let clientRect = this.$refs.toggleSearchFilter.getBoundingClientRect()
      let toggleHeight = clientRect.top + clientRect.height + window.pageYOffset + 5
      let toggleLeft = clientRect.left - clientRect.width
      this.toggleHeight['top'] = `${toggleHeight}px`
      this.toggleHeight['left'] = `${toggleLeft}px`
    }
  },
  mounted: function () {
    this.calculateHeight()
    window.addEventListener('resize', this.calculateHeight)
    window.addEventListener('scroll', this.calculateHeight)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.calculateHeight)
  }
}
</script>

<style scoped lang="stylus">
@keyframes fadeIn
  0%
    opacity 0
  100%
    opacity 1
@keyframes fadeOut
  0%
    opacity 1
  100%
    opacity 0

.searchBox
  display flex
  flex-flow row wrap
  align-items center
  width 94%
  margin 1em auto 1.7em

.searchBox__label
  flex-grow 1
  //flex-basis 100%
  position relative
  margin auto
  font-size .96em
  @media screen and (min-width 641px)
    flex-basis 0

.searchBox__input
  width 100%
  padding .7em .7em
  border 1px #d9d9d9 solid
  background-color #fff
  border-radius 2px
  font-size .9rem
  transition .3s
  -webkit-appearance none
  -moz-appearance none
  appearance none

  &:hover
    border-color #bbb
  &:focus
    border-color #999
    outline 0

.searchFilter
  display flex
  flex-flow row wrap
  align-items center
  margin-left .2em

.toggle--searchFilter
  margin-right 10px
  padding .4em .5em
  background-color #e5c8c7
  border-radius 1px
  user-select none
  cursor pointer
  transition background-color .2s
  &.isFiltered
    background-color #8c4748
    color #fff
    &:hover
      background-color #8c4748 - #111
  &:hover
    background-color #e5c8c7 - #111

.searchFilter__inner
  display flex
  flex-flow column
  align-items center
  position absolute
  bottom auto
  width auto
  height auto
  padding .9em .5em
  background-color #fff
  box-shadow 0 0 1px rgba(0, 0, 0, .2)
  white-space nowrap
  letter-spacing -.1em
  animation rightOut .3s forwards
  &.isToggled
    animation right .3s forwards

.searchFilter__item
  display flex
  align-items center
  position relative
  width 100%
  padding .4em .6em .4em 2.2em
  background-color transparent
  color #222
  &:not(:last-child)
    margin 0 0 .3em 0

  &::before
    content ''
    position absolute
    left .3em
    padding .56em
    border 1px solid #ddd
    transition .2s all
    background-size 16px
    background-position center
  &.enabled::before
    background-image url('~/assets/icon/checkbox_white.svg')
    background-repeat no-repeat
    background-color #39c

.fade-enter-active
  animation fadeIn .4s
.fade-leave-active
  animation fadeOut .4s

.icon--clear
  width 30px
  height 100%




</style>
