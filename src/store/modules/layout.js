const state = {
  deviceSize: ''
}

const mutations = {
  SET_DEVICE: (state, deviceSize) => {
    state.deviceSize = deviceSize
  }
}

const actions = {
  setDevice({ commit }, deviceSize) {
    commit('SET_DEVICE', deviceSize)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
