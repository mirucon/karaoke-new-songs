/* eslint-disable no-unused-vars */

import axios from 'axios'

export const state = () => ({
  songsTable: <Object>{},
  datesArray: <Array<any>>[]
})

export const mutations = {
  setSongsTable (state, payload) {
    state.songsTable[payload.date] = payload.table
  },
  setDatesArray (state, date) {
    state.datesArray.push(date)
  }
}
