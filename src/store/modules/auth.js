import router from '@/router'
import { ElMessage } from 'element-plus'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { firebaseAuth } from '../../composable/firebaseImport'

const authDefaultState = () => {
  return {
    user_id: null,
    email: null
  }
}

const state = authDefaultState()

const mutations = {
  SET_USER_ID: (state, user_id) => {
    state.user_id = user_id
  },

  SET_EMAIL: (state, user_email) => {
    state.email = user_email
  },

  RESET_STATE: (state) => {
    Object.assign(state, authDefaultState())
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
    commit('RESET_STATE')
    commit('profile/RESET_STATE', null, { root: true })
    router.push('/login')
  },

  fetchSessionState({ dispatch, commit }) {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(firebaseAuth, user => {
        const currentUser = firebaseAuth.currentUser
        if (currentUser) {
          commit('SET_USER_ID', currentUser.uid)
          commit('SET_EMAIL', currentUser.email)
          dispatch('profile/fetchUserProfile', null, { root: true })
        }
        resolve(user)
      })
    })
  }
}

const getters = {
  isLoggedIn: state => state.user_id !== null,
  email: state => state.email
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
