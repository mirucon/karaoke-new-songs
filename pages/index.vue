<template lang="pug">
  .wrapper
    app-header
    songs-list(:songsTable="songsTable", :datesArray="datesArray", :hasLoaded="hasLoaded", @loadMore="loadMore", @filterArray="filterArray")
    footer-ads
    app-footer
</template>

<script>
  import axios from 'axios'
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
    data () {
      return {
        hasLoaded: false
      }
    },
    asyncData () {
      let datesArray = []
      const numberOfWeeks = 3
      // 日付を取得する
      for (let i = 0; i < numberOfWeeks; i++) {
        let date = moment().utcOffset('+09:00')
        const dayINeed = 2 // for Tuesday

        // Get next Tuesday's date
        if (date.isoWeekday() <= dayINeed) {
          date = date.isoWeekday(dayINeed)
        } else {
          date = date.add(1, 'weeks').isoWeekday(dayINeed)
        }
        // Get one more next week if it is Thursday.
        if (moment().utcOffset('+09:00').day() > 3) {
          date = date.add(1, 'weeks').isoWeekday(dayINeed)
        }
        // Subtract "7 days" in each loop.
        if (i >= 1) {
          date = date.add(-i, 'weeks').isoWeekday(dayINeed)
        }

        let y = date.year()
        let m = date.month() + 1
        let d = date.date()
        if (m < 10) {
          m = '0' + m
        }
        if (d < 10) {
          d = '0' + d
        }
        datesArray.push(`${y}-${m}-${d}`)
      }

      return axios.all([
        axios.get(`https://api.karaokenewsongs.com/songs.${datesArray[0]}.json`),
        axios.get(`https://api.karaokenewsongs.com/songs.${datesArray[1]}.json`),
        axios.get(`https://api.karaokenewsongs.com/songs.${datesArray[2]}.json`)
      ])
        .then(axios.spread((res0, res1, res2) => {
          const res = [res0.data, res1.data, res2.data]
          let exist = [true, true, true]
          for (let i = 0; i < numberOfWeeks; i++) {
            if (res[i][1].length <= 1) {
              exist[i] = false
            }
          }
          return {
            datesArray: datesArray,
            songsTable: {
              [datesArray[0]]: {
                date: res[0][0],
                cols: res[0][1],
                isExisted: exist[0]
              },
              [datesArray[1]]: {
                date: res[1][0],
                cols: res[1][1],
                isExisted: exist[1]
              },
              [datesArray[2]]: {
                date: res[2][0],
                cols: res[2][1],
                isExisted: exist[2]
              }
            }
          }
        }))
    },
    mounted: function () {
      this.getRelativeDates()
    },
    methods: {
      getRelativeDates: function () {
        const date = this.datesArray[1]
        const now = moment()
        const y = now.year()
        for (let col in this.songsTable[date].cols) {
          let dateStr = this.songsTable[date].cols[col][3]
          // dateStr = dateStr.replace('/', '-')
          if (dateStr === '配信済' || dateStr === '配信済み') {
            let diff = dateStr
            dateStr = (now.month() + 1 + '-' + now.date())
            this.songsTable[date].cols[col][3] = [diff, dateStr]
          } else {
            let colDate = moment(`${y}-${dateStr} 23:59+0900`, 'YYYY-M/D HH:mm+-HH:mm')
            let diff = colDate.diff(now, 'days')
            if (diff === 0) {
              diff = '今日'
            } else if (diff === 1) {
              diff = '明日'
            } else if (diff < 0) {
              diff = '配信済'
            } else {
              diff = `${diff}日後`
            }
            this.songsTable[date].cols[col][3] = [diff, dateStr]
          }
        }
      },
      loadMore: function () {
        this.hasLoaded = false
        for (let i = 0; i < 3; i++) {
          let length = this.datesArray.length
          let date = moment(this.datesArray[length - 1]).utcOffset('+09:00')
          const dayINeed = 2
          date = date.add(-1, 'weeks').isoWeekday(dayINeed)
          let y = date.year()
          let m = date.month() + 1
          let d = date.date()
          if (m < 10) {
            m = '0' + m
          }
          if (d < 10) {
            d = '0' + d
          }
          this.datesArray.push(`${y}-${m}-${d}`)

          axios.get(`https://api.karaokenewsongs.com/songs.${this.datesArray[length]}.json`)
            .then(res => {
              let isExisted = Boolean
              if (res.data[1].length <= 1) {
                isExisted = false
              } else {
                isExisted = true
              }
              let songsTable = {
                date: this.datesArray[length],
                cols: res.data[1],
                isExisted: isExisted
              }
              this.$set(this.songsTable, [this.datesArray[length]], songsTable)
              this.hasLoaded = true
              return res
            })
            .catch(() => {
              const currentWeek = this.datesArray.findIndex(date => date === this.datesArray[length])
              this.datesArray[currentWeek] = null
              return 'notFound'
            })
        }
      },
      filterArray: function () {
        this.datesArray = this.datesArray.filter(d => {
          return d !== null
        })
      }
    }
  }
</script>

<style lang="stylus">
@import '~assets/form.styl'
</style>
