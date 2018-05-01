<template lang="pug">
  div.searchBox
    label.searchBox__label(aria-label="曲名 / アーティスト名 で検索")
      input#searchBox__input.searchBox__input(type="text", placeholder="曲名 / アーティスト名 で検索", @input="updateValue($event.target.value)", :value="value")
      span.icon--clear(@click="$emit('clearQuery')")
        span.top
        span.bottom
    .searchFilter(:class="{ isToggled: showFilterWindow }")
      .toggle--searchFilter(@click="showFilterWindow = !showFilterWindow", :class="{ isFiltered: isFiltered }") 絞り込み
      //.searchFilter__inner(v-show="showFilterWindow", :class="{ isToggled: showFilterWindow }")
      .searchFilter__inner(:class="{ isToggled: showFilterWindow }")
        .searchFilter__item.button--toggle(@click="filterArtist", :class="{ enabled: artistToggle }") アーティスト名
        .searchFilter__item.button--toggle(@click="filterSong", :class="{ enabled: songToggle }") 曲名

</template>

<script>
export default {
  name: 'search-bar',
  props: ['value'],
  data: () => ({
    showFilterWindow: '',
    songToggle: true,
    artistToggle: true,
    isFiltered: false
  }),
  methods: {
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
    }
  },
  watch: {
    songToggle: function () {
      this.checkIsFiltered()
    },
    artistToggle: function () {
      this.checkIsFiltered()
    }
  }
}
</script>

<style scoped lang="stylus">
@keyframes right
  0%
    width auto
    height auto
    // opacity 0
  100%
    // opacity 1
@keyframes rightOut
  0%
    // opacity 1
  100%
    width 0
    height 0
    // opacity 0

.searchBox
  display flex
  flex-flow row wrap
  align-items center
  width 94%
  margin 1.7em auto

.searchBox__label
  flex-grow 1
  flex-basis 100%
  position relative
  margin auto
  font-size .96em
  @media screen and (min-width 641px)
    flex-basis 0

.searchBox__input
  width 100%

.searchFilter
  display flex
  flex-flow row wrap
  align-items center
  margin-top .4em
  overflow hidden

.searchFilter__inner
  display flex
  flex-flow row wrap
  animation rightOut .3s forwards
  &.isToggled
    animation right .3s forwards

.toggle--searchFilter
  margin-right 10px
  padding .4em .5em
  background-color #e5c8c7
  border-radius 1px
  user-select none
  cursor pointer
  transition background-color .2s
  &.isFiltered
    background-color $accent
    color #fff
    &:hover
      background-color $accent - #222

.searchFilter__item
  padding .4em .3em

@media screen and (min-width 641px)
  .searchFilter
    margin-top 0
  .toggle--searchFilter
    margin-left 10px

.icon--clear
  width 30px
  height 100%




</style>
