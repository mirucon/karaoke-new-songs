<!--suppress JSIgnoredPromiseFromCall -->
<template lang="pug">
  div.wrapper--globalSearch
    div#modal__top.modal__top
      div.globalSearch__content
        input#globalSearch__form.globalSearch__form(type="text" placeholder="検索" v-model="searchQuery" @keyup.enter="openModal" autocomplete="off")
      div.modal__backgroundTop
    div#modal__bottom.modal__bottom
      div#modal__baseTop.modal__backgroundBaseTop
      div#modal__baseBottom.modal__backgroundBaseBottom
</template>

<script lang="ts">
import moment from 'moment'
import { mapState, mapMutations, mapActions } from 'vuex'
import { TweenMax } from 'gsap'

export default {
  name: 'GlobalSearch',
  data: () => ({
    searchQuery: '',
    queryValidation: false,
    beforeDate: '',
    hitEnter: false,
    isFirstSearchDone: false
  }),
  computed: mapState([
    'datesArray',
    'songsTable',
    'isModalOpen',
    'searchResults'
  ]),
  watch: {
    searchQuery: function () {
      this.queryValidator()
      this.checkForSuspendedTime()
    },
    hitEnter: function () {
      console.log('HIT ENTER: ' + this.hitEnter)
      // Animation move the search form to top //
      const modalTop = document.getElementById('modal__top')
      requestAnimationFrame(() => {
        TweenMax.to(modalTop, 0.4, {
          height: '20%'
        })
      })
    },
    isFirstSearchDone: function () {
      console.log('IS FIRST SEARCH DONE: ' + this.isFirstSearchDone)
      if (this.isFirstSearchDone) {
        // Animation to open the modal //
        const modalTop = document.getElementById('modal__baseTop')
        const modalBottom = document.getElementById('modal__baseBottom')
        requestAnimationFrame(() => {
          TweenMax.to(modalBottom, 0.6, {
            delay: 0.4,
            left: '-100%',
            right: 'auto'
          })
          TweenMax.to(modalTop, 0.6, {
            delay: 0.8,
            right: '-100%',
            left: 'auto'
          })
        })
      }
    }
  },
  mounted () {
    document.getElementById('globalSearch__form').focus()
  },
  methods: {
    ...mapMutations([
      'setModalState',
      'setProcessing'
    ]),
    ...mapActions([
      'searchSongsTable'
    ]),
    queryValidator () {
      // Validator for query; it needs to have at least one character. //
      let searchQuery = this.searchQuery.toLowerCase().trim()
      if (searchQuery) {
        this.queryValidation = true
      } else {
        this.queryValidation = false
      }
    },
    async openModal () {
      // Open modal and show the search result if the validation passes. //
      this.setProcessing(true)
      if (this.queryValidation) {
        this.hitEnter = await true
        await this.searchSongsTable(this.searchQuery)
          .then(() => {
            this.setModalState(true)
            this.setProcessing(false)
            this.isFirstSearchDone = true
          })
      } else {
        this.setProcessing(false)
        this.searchSongsTable('')
      }
    },
    async checkForSuspendedTime () {
      // Check for how long does it take to type one character, and do search when it took more than 1500 ms. //
      if (!this.beforeDate) {
        this.beforeDate = moment()
      } else if (this.queryValidation && this.isModalOpen) {
        this.beforeDate = moment()
        await new Promise(resolve => setTimeout(resolve, 1500))
        if (moment().diff(this.beforeDate, 'milliseconds') > 1300) {
          this.openModal()
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.wrapper--globalSearch
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  width 100%
  height 100vh
  overflow hidden

.globalSearch__content
  width 460px
  max-width 85%

.globalSearch__form
  position relative
  z-index 2
  width 100%
  margin-bottom 2em
  padding .7em .8em
  border 1px solid #6a6a6a
  background-color transparent
  color #fff
  border-radius 2px
  font-size 1.08em
  font-weight 300
  caret-color #bbb
  transition all .2s
  &:focus
    border-color #acacac
    outline none

.modal__top
  display flex
  align-items flex-end
  justify-content center
  position absolute
  height 50%
  top 0
  right 0
  left 0

.modal__bottom
  position absolute
  height 80%
  right 0
  bottom 0
  left 0

.modal__backgroundTop
.modal__backgroundBaseTop
.modal__backgroundBaseBottom
  position absolute
  height 100%
  z-index 1
  width 100%
  background-color #1c1c18

.modal__backgroundTop
  top 0
  right 0
  left 0

.modal__backgroundBaseTop
.modal__backgroundBaseBottom
  width 100%
  height 50%
  right 0
  left 0
.modal__backgroundBaseTop
  bottom 0
.modal__backgroundBaseBottom
  top 0

</style>
