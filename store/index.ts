/* eslint-disable no-unused-vars */

export const state = () => ({
  songsTable: <object>{},
  datesArray: <Array<string>>[],
  searchResults: <Array<string>>[],
  isModalOpen: <boolean>false,
  processing: <boolean>false
})

export const mutations = {
  setSongsTable (state, payload) {
    state.songsTable[payload.date] = payload.table
  },
  setDatesArray (state, date: string) {
    state.datesArray.push(date)
  },
  setModalState (state, bool) {
    state.isModalOpen = bool
  },
  setSearchResults (state, result: Array<string>) {
    state.searchResults = result
  },
  setProcessing (state, bool: boolean) {
    state.processing = bool
  }
}

export const actions = {
  async searchSongsTable ({ commit, state }, query: string) {
    const songsTable: Object = state.songsTable
    const datesArray: Array<string>= state.datesArray
    let res: Array<any> = []
    for (let date in datesArray) {
      if (query === '') {
        res = []
        break
      }
      let sanitizedQuery = query.toLowerCase().trim()
      const table: Array<any> = songsTable[datesArray[date]]
      await table.filter(col => {
        Object.keys(col).some(key => {
          if (parseInt(key) > 1 || parseInt(key) === 0) return false
          if (parseInt(key) === 1) {
            for (let i: number = 0; i < 2; i++) {
              // return col[key][i].toLowerCase().indexOf(query) > -1
              if(col[key][i].toLowerCase().indexOf(sanitizedQuery) > -1) {
                // console.log(col[key], ': ', i)
                res.push(col)
              }
            }
          }
        })
      })
    }
    console.log('SEARCH DONE')
    commit('setSearchResults', res)
  }
}

