/* eslint-disable no-unused-vars */

import axios from 'axios'
import moment from 'moment'


interface metaPayload {
  oldest: string,
  latest: string,
  next: string,
  prev: string,
  current?: string
}

interface songsTablePayload {
  date: string,
  cols: Array<string>,
  isExisted: boolean
}

export const strict: boolean = false

export const state = () => ({
  songsTable: <object>{},
  datesArray: <Array<string>>[],
  current: <string>'',
  meta: <object>{},
  isLoading: <boolean>false,
  searchResults: <Array<string>>[],
  isModalOpen: <boolean>false,
  processing: <boolean>false
})

export const mutations = {

  setSongsTable(state, payload: songsTablePayload) {
    state.songsTable[payload.date] = {
      date: payload.date,
      cols: payload.cols,
      isExisted: payload.isExisted
    }
  },
  setDatesArray(state, date: string) {
    state.datesArray.push(date)
  },
  setModalState(state, bool) {
    state.isModalOpen = bool
  },
  setSearchResults(state, result: Array<string>) {
    state.searchResults = result
  },
  setProcessing(state, bool: boolean) {
    state.processing = bool
  },
  setCurrent(state, date: string) {
    state.current = date
  },
  setMeta(state, payload: metaPayload) {
    state.meta.oldest = payload.oldest
    state.meta.latest = payload.latest
    state.meta.next = payload.next
    state.meta.prev = payload.prev
    state.meta.current = payload.current
  },
  setIsLoading(state, bool: boolean) {
    state.isLoading = bool
  },
  filterDatesArray(state) {
    state.datesArray = state.datesArray.filter(d => {
      return d !== null
    })
  }
}

export const actions = {

  async getSingleSongsTable({ commit, state }, date: string) {
    commit('setIsLoading', true)
    const res = await axios.get(`https://apiv2.karaokenewsongs.com/weekly/${date}`)
    const songsData: Array<any> = res.data.songs
    await commit('setSongsTable', {
      date: res.data.date,
      cols: songsData,
      isExisted: !!songsData.length
    })
    await commit('setMeta', {
      oldest: res.data.oldest,
      latest: res.data.latest,
      next: res.data.next,
      prev: res.data.prev,
      current: res.data.date
    })
    commit('setIsLoading', false)
  },

  async getSongsTable({ commit, state }, dates: Array<string>) {
    commit('setIsLoading', true)
    let urls: Array<any> = []
    for (const date of dates) {
      urls.push(
        await axios.get(`https://apiv2.karaokenewsongs.com/weekly/${date}`)
      )
    }
    const resAll: any = await Promise.all(urls)
    for (const res of resAll) {
      const songsData: Array<any> = res.data.songs
      await commit('setSongsTable', {
        date: res.data.date,
        cols: songsData,
        isExisted: !!songsData.length
      })
      await commit('setMeta', {
        oldest: res.data.oldest,
        latest: res.data.latest,
        next: res.data.next,
        prev: res.data.prev,
        current: res.data.date
      })
    }
    commit('setIsLoading', false)
  },

  async loadMore({ commit, state, dispatch }) {
    commit('setIsLoading', true)
    const LoadingDates = []
    ;[...Array(3)].map(() => {
      let length = state.datesArray.length
      let date = moment(state.datesArray[length - 1]).utcOffset('+09:00')
      const dayINeed = 2
      date = date.add(-1, 'weeks').isoWeekday(dayINeed)
      let y = date.year()
      let m: any = date.month() + 1
      let d: any = date.date()
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      LoadingDates.push(`${y}-${m}-${d}`)
      commit('setDatesArray', `${y}-${m}-${d}`)
    })

     dispatch('getSongsTable', LoadingDates)
  },

  async searchSongsTable({ commit, state }, query: string) {
    const songsTable: Object = state.songsTable
    const datesArray: Array<string> = state.datesArray
    let res: Array<any> = []
    for (let date in datesArray) {
      if (query === '') {
        res = []
        break
      }
      if (songsTable[datesArray[date]] === []) {
        let sanitizedQuery = query.toLowerCase().trim()
        const table: Array<any> = songsTable[datesArray[date]]
        await table.filter(col => {
          Object.keys(col).some(key => {
            if (parseInt(key) > 1 || parseInt(key) === 0) return false
            if (parseInt(key) === 1) {
              for (let i: number = 0; i < 2; i++) {
                // return col[key][i].toLowerCase().indexOf(query) > -1
                if (col[key][i].toLowerCase().indexOf(sanitizedQuery) > -1) {
                  // console.log(col[key], ': ', i)
                  res.push(col)
                }
              }
            }
          })
        })
      }
    }
    console.log('SEARCH DONE')
    commit('setSearchResults', res)
  }
}
