<template lang="pug">
  div.wrapper
    p Welcome to search screen
</template>

<script lang="ts">
import axios from 'axios'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  async fetch ({ store }) {
    const numberOfWeeks: number = 7
    for (let i = 0; i < numberOfWeeks; i++) {
      let date = moment().utcOffset('+09:00')
      const tues = 2 // for Tuesday

      // Get next Tuesday's date
      date = date.add(2, 'weeks').isoWeekday(tues)

      // Get one more next week if it is Thursday or after.
      if (moment().utcOffset('+09:00').day() > 3) {
        date = date.add(1, 'weeks').isoWeekday(tues)
      }
      // Subtract "7 days" in each loop.
      if (i >= 1) {
        date = date.add(-i, 'weeks').isoWeekday(tues)
      }
      const DateToAdd = date.format('YYYY-MM-DD')

      store.commit('setDatesArray', DateToAdd)

      let urls: Array<any> = []
      for (let date in store.state.datesArray) {
        urls.push(axios.get(`https://api.karaokenewsongs.com/songs.${store.state.datesArray[date]}.json`))
      }
      await Promise.all(urls)
        .then(res => {
          const len: number = res.length
          for (let i = 0; i < len; i++) {
            const songsData: Array<any> = res[i]['data'][1]
            if (songsData.length > 1) {
              store.commit('setSongsTable', {
                date: res[i]['data'][0],
                table: songsData
              })
            }
          }
        })
    }
  },
  computed: mapState([
    'datesArray',
    'songsTable'
  ])
}
</script>

<style scoped lang="stylus">

</style>
