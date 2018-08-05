import axios from "~/node_modules/axios";

interface songsTablePayload {
  date: string,
  cols: Array<string>
}

export const state = () => ({
  songsTable: <object>{},
  datesArray: <Array<string>>[],
  searchResults: <Array<any>>[],
  isModalOpen: <boolean>false,
  processing: <boolean>false
})

export const mutations = {
  setSongsTable(state, payload: songsTablePayload) {
    state.songsTable[payload.date] = {
      date: payload.date,
      cols: payload.cols
    }
  },
  setDatesArray(state, date: string) {
    state.datesArray.push(date)
  },
  setModalState(state, bool: boolean) {
    state.isModalOpen = bool
  },
  setProcessing(state, bool: boolean) {
    state.processing = bool
  },
  setSearchResults(state, result: Array<any>) {
    state.searchResults = result
  }
}

export const actions = {
  async searchSongsTable({ commit, state }, query: string) {
    const songsTable: any = state.songsTable
    const datesArray: Array<string> = state.datesArray
    let res: Array<any> = []
    for (const date of datesArray) {
      if (query === '') {
        res = []
        break
      }
      if (songsTable[date] && songsTable[date].cols.length > 0) {
        let sanitizedQuery = query.toLowerCase().trim()
        const table: Array<any> = songsTable[date].cols
        await table.filter(col => {
          // @ts-ignore
          Object.keys(col).some(key => {
            if (parseInt(key) === 1) {
              for (let i: number = 0; i < 2; i++) {
                // return col[key][i].toLowerCase().indexOf(query) > -1
                // console.log(col[key][i])
                if (col[key][i].toLowerCase().indexOf(sanitizedQuery) > -1) {
                  res.push(col)
                }
              }
            }
          })
        })
      }
    }
    console.log('SEARCH DONE')
    await commit('setSearchResults', res)
  },

  async getSongsTable({ commit, state }, dates: Array<string>) {
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
        cols: songsData
      })
    }
  }
}
