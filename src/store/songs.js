export const state = () => ({
  songs: {},
  meta: {}
})

export const mutations = {
  /**
   * @param payload.date The date of the songs.
   * @param payload.cols The actual data for songs.
   */
  setSongs(state, payload) {
    state.songs[payload.date] = {
      date: payload.date,
      cols: payload.cols
    }
  },
  /**
   * @param payload.oldest
   * @param payload.latest
   * @param payload.next
   * @param payload.prev
   * @param payload.current
   */
  setMeta(state, payload) {
    state.meta = payload
  }
}

export const actions = {
  async getSingleWeekSongs({ state, commit }, date) {
    try {
      const res = await this.$axios.$get(`/weekly/${date}`)
      await commit('setSongs', {
        date: res.date,
        cols: res.songs
      })
      await commit('setMeta', {
        oldest: res.oldest,
        latest: res.latest,
        next: res.next,
        prev: res.prev,
        current: res.current
      })
    } catch (e) {
      alert('サーバーへの接続に失敗しました。')
    }
  }
}
