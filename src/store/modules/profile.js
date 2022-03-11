import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../../composable/firebaseImport'
import { ElMessage } from 'element-plus'

const profileDefaultState = () => {
  return {
    firstName: '',
    lastName: ''
  }
}

const state = profileDefaultState()

const mutations = {
  SET_FIRST_NAME: (state, firstName) => {
    state.firstName = firstName
  },

  SET_LAST_NAME: (state, lastName) => {
    state.lastName = lastName
  },

  RESET_STATE: (state) => {
    Object.assign(state, profileDefaultState())
  }
}

const actions = {
  fetchUserProfile({ commit, rootState }) {
    const profileRef = doc(db, 'profiles', rootState.auth.user_id)
    onSnapshot(profileRef,
      snapshot => {
        const data = { ...snapshot.data(), id: snapshot.id }
        commit('SET_FIRST_NAME', data.first_name)
        commit('SET_LAST_NAME', data.last_name)
      },
      error => {
        ElMessage({
          showClose: true,
          message: error.message,
          type: 'error'
        })
      }
    )
  }
}

const getters = {
  fullName: state => `${state.firstName} ${state.lastName}`
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
