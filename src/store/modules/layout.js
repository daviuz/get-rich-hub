const state = {
  deviceSize: '',
  order: 0
}

const mutations = {
  SET_DEVICE: (state, deviceSize) => {
    state.deviceSize = deviceSize
  },

  SET_ORDER: (state, order) => {
    state.order = order
  }
}

const actions = {
  setDevice({ commit }, screenSize) {
    commit('SET_DEVICE', screenSize.size)
    commit('SET_ORDER', screenSize.order)
  }
}

const getters = {
  order: state => state.order
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
