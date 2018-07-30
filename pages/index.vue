<template lang="pug">
  .wrapper
    app-header
    songs-list
    footer-ads
    app-footer
</template>

<script lang="ts">
import { mapState } from 'vuex'
import moment from 'moment'
import SongsList from '~/components/SongsList.vue'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import FooterAds from '~/components/FooterAds.vue'

export default {
  components: {
    FooterAds,
    AppFooter,
    AppHeader,
    SongsList
  },
  computed: {
    ...mapState(['datesArray', 'songsTable'])
  },
  async fetch({ store }) {
    // const numberOfWeeks: number = 2
    // ;[...Array(numberOfWeeks)].map(async (_, i) => {
    //   let date = moment().utcOffset('+09:00')
    //   const tues = 2 // for Tuesday
    //
    //   // Get next Tuesday's date
    //   date = date.add(1, 'weeks').isoWeekday(tues)
    //   // Get one more next week if it is Thursday or later.
    //   if (
    //     moment()
    //       .utcOffset('+09:00')
    //       .day() > 3
    //   ) {
    //     date = date.add(1, 'weeks').isoWeekday(tues)
    //   }
    //   // Subtract "7 days" in each loop.
    //   if (i >= 1) {
    //     date = date.add(-i, 'weeks').isoWeekday(tues)
    //   }
    //   store.commit('setDatesArray', date.format('YYYY-MM-DD'))
    // })

    let date = moment().utcOffset('+09:00')
    const tues = 2 // for Tuesday
    date = date.isoWeekday(tues)

    // Get next week's Tuesday if it is Thursday or later.
    if (
      moment()
        .utcOffset('+09:00')
        .day() > 3
    ) {
      date = date.add(1, 'weeks').day(tues)
    }

    await store.dispatch('getSingleSongsTable', date.format('YYYY-MM-DD'))
  },
  head: {
    meta: [
      { property: 'og:title', content: 'カラオケ最新曲クイックビューアー' }
    ]
  }
}
</script>

<style lang="stylus" scoped>
</style>
