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
    let date = moment().utcOffset('+09:00')
    const tues = 2 // for Tuesday
    date = date.isoWeekday(tues)

    // Get next week's Tuesday if it is Thursday or later.
    if (
      moment()
        .utcOffset('+09:00')
        .isoWeekday() > 3
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
