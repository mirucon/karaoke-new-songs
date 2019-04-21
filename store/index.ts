/* eslint-disable no-unused-vars */

import axios, { AxiosResponse } from "axios"

interface songsTablePayload {
  date: string,
  cols: Array<string>,
  isExisted: boolean
}

interface metaPayload {
  oldest: string,
  latest: string,
  next: string,
  prev: string,
  current: string
}

interface settingsObject {
  showDAM?: boolean,
  showJOY?: boolean
}

export const strict: boolean = false

export const state = () => ({
  songsTable: <object>{},
  datesArray: <Array<string>>[],
  isLoading: <boolean>false,
  meta: <object>{},
  settings: <settingsObject>{
    showDAM: true,
    showJOY: true
  },
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
  setIsLoading(state, bool: boolean) {
    state.isLoading = bool
  },
  setMeta(state, payload: metaPayload) {
    state.meta.oldest = payload.oldest
    state.meta.latest = payload.latest
    state.meta.next = payload.next
    state.meta.prev = payload.prev
    state.meta.current = payload.current
  },
  setSettings(state, payload: settingsObject) {
    if ('showDAM' in payload) {
      state.settings.showDAM = !!payload.showDAM
    } else if ('showJOY' in payload) {
      state.settings.showJOY = !!payload.showJOY
    }
  }
}

export const actions = {
  async getSingleSongsTable({ commit, state }, date: string) {
    commit('setIsLoading', true)
    const res: AxiosResponse<any> = await axios.get(`http://localhost:8000/api/weekly/${date}`)
    const songsData: Array<any> = res.data.songs
    await commit('setSongsTable', {
      date: res.data.date,
      cols: songsData
    })
    await commit('setMeta', {
      oldest: res.data.oldest,
      latest: res.data.latest,
      next: res.data.next,
      prev: res.data.prev,
      current: res.data.date
    })
    commit('setIsLoading', false)
  }
}
