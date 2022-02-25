import router from '@/router'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { firebaseAuth } from '../../composable/firebaseImport'

const state = {
  user: null
}

const mutations = {
  SET_USER: (state, user) => {
    state.user = user
  },

  CLEAR_USER: (state) => {
    state.user = null
  }
}

const actions = {
  login({ commit }, credentials) {
    const { email, password } = credentials
    return signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        commit('SET_USER', firebaseAuth.currentUser)
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
    commit('CLEAR_USER')
    router.push('/login')
  },

  fetchSessionState({ commit }) {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(firebaseAuth, user => {
        commit('SET_USER', user)
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
