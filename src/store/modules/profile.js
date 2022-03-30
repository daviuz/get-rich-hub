import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../../composable/firebaseImport'
import { ElMessage } from 'element-plus'
import AccountsApi from '@/services/api/accounts'

const profileDefaultState = () => {
  return {
    firstName: '',
    lastName: '',
    accountIds: [],
    accountDetails: []
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

  SET_ACCOUNT_IDS: (state, accountIds) => {
    state.accountIds = accountIds
  },

  SET_ACCOUNT_DETAILS: (state, accountDetails) => {
    state.accountDetails = accountDetails
  },

  RESET_STATE: (state) => {
    Object.assign(state, profileDefaultState())
  }
}

const actions = {
  fetchUserProfile({ dispatch, commit, rootState }) {
    const profileRef = doc(db, 'profiles', rootState.auth.user_id)
    onSnapshot(profileRef,
      snapshot => {
        const data = { ...snapshot.data(), id: snapshot.id }
        commit('SET_FIRST_NAME', data.first_name)
        commit('SET_LAST_NAME', data.last_name)
        commit('SET_ACCOUNT_IDS', data.account_ids)
        dispatch('fetchAccountDetails', data.account_ids)
      },
      error => {
        ElMessage({
          showClose: true,
          message: error.message,
          type: 'error'
        })
      }
    )
  },

  fetchAccountDetails({ commit }, accountIds) {
    const promiseArray = accountIds.map(id => {
      return new Promise((resolve, reject) => {
        AccountsApi.getAccountDetails(id)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    })

    Promise.allSettled(promiseArray)
      .then(response => {
        commit('SET_ACCOUNT_DETAILS', response.map(data => data.value))
      })
  }
}

const getters = {
  fullName: state => `${state.firstName} ${state.lastName}`,
  accountIds: state => state.accountIds,
  accountDetails: state => state.accountDetails
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
