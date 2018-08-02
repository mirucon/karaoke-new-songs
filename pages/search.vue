<template lang="pug">
  div.wrapper
    global-search
    global-search-results
    loading-animation
    app-footer
</template>

<script lang="ts">
import moment from 'moment'
import GlobalSearch from '~/components/GlobalSearch.vue'
import GlobalSearchResults from '~/components/GlobalSearchResults.vue'
import AppFooter from '~/components/AppFooter.vue'
import LoadingAnimation from '~/components/LoadingAnimation.vue'

export default {
  components: {
    LoadingAnimation,
    AppFooter,
    GlobalSearchResults,
    GlobalSearch
  },
  async fetch({ store }) {
    const numberOfWeeks: number = 7
    ;[...Array(numberOfWeeks)].map(async (_, i) => {
      let date = moment().utcOffset('+09:00')
      const tues = 2 // for Tuesday

      // Get next Tuesday's date
      date = date.add(1, 'weeks').isoWeekday(tues)
      // Get one more next week if it is Thursday or later.
      if (
        moment()
          .utcOffset('+09:00')
          .day() > 3
      ) {
        date = date.add(1, 'weeks').isoWeekday(tues)
      }
      // Subtract "7 days" in each loop.
      if (i >= 1) {
        date = date.add(-i, 'weeks').isoWeekday(tues)
      }
      store.commit('setDatesArray', date.format('YYYY-MM-DD'))
    })
    await store.dispatch('getSongsTable', store.state.datesArray)
  },
  head: {
    title: '検索画面 - カラオケ最新曲クイックビューアー'
  }
}
</script>

<style scoped lang="stylus">

</style>
