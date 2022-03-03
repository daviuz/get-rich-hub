import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../../composable/firebaseImport'

const state = {
  first_name: null,
  last_name: null
}

const mutations = {

}

const actions = {
  fetchUserProfile({ rootState }) {
    const profileRef = doc(db, 'profiles', rootState.auth.user_id)
    onSnapshot(profileRef,
      snapshot => {
        const data = { ...snapshot.data(), id: snapshot.id }
        console.log(data)
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

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
