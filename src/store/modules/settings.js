import BotsApi from '@/services/api/bots'

const profileDefaultState = () => {
  return {
    blackListedPairs: []
  }
}

const state = profileDefaultState()

const mutations = {
  SET_BLACK_LISTED_PAIRS: (state, blackListedPairs) => {
    state.blackListedPairs = blackListedPairs
  }
}

const actions = {
  fetchBlackListedPairs({ commit }) {
    BotsApi.getBlackListedPairs()
      .then(response => {
        commit('SET_BLACK_LISTED_PAIRS', response.data.pairs)
      })
      .catch(() => {})
  }
}

const getters = {
  blackListedPairs: state => state.blackListedPairs
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
