import router from '@/router'
import { ElMessage } from 'element-plus'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { firebaseAuth } from '../../composable/firebaseImport'

const state = {
  user_id: null,
  email: null
}

const mutations = {
  SET_USER_ID: (state, user_id) => {
    state.user_id = user_id
  },

  SET_EMAIL: (state, user_email) => {
    state.email = user_email
  }
}

const actions = {
  login({ dispatch, commit }, credentials) {
    const { email, password } = credentials
    return signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        const currentUser = firebaseAuth.currentUser
        commit('SET_USER_ID', currentUser.uid)
        commit('SET_EMAIL', currentUser.email)
        dispatch('profile/fetchUserProfile', null, { root: true })
        router.push('/')
      })
      .catch(error => {
        const invalidLogin = 'Incorrect email or password.'
        switch(error.code)         {
          case 'auth/invalid-email':
            return 'Invalid email.'
            break
          case 'auth/wrong-password':
            return invalidLogin
            break
          case 'auth/user-not-found':
            return invalidLogin
            break
          default:
            return 'Something went wrong.'
        }
      })
  },

  async logout({ commit }) {
    await signOut(firebaseAuth)
    commit('SET_USER_ID', null)
    commit('SET_EMAIL', null)
    router.push('/login')
  },

  fetchSessionState({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(firebaseAuth, user => {
        const currentUser = firebaseAuth.currentUser
        commit('SET_USER_ID', currentUser.uid)
        commit('SET_EMAIL', currentUser.email)
        if (state.user !== null) {
          dispatch('profile/fetchUserProfile', null, { root: true })
        }
        resolve(user)
      })
    })
  }
}

const getters = {
  isLoggedIn: state => state.user !== null
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
