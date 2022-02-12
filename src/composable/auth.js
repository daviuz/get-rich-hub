import { ref, reactive } from 'vue'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { firebaseAuth } from './firebaseImport'

const isAuthenticated = ref(false)
const account = reactive({
  email: ''
})

const auth = () => {
  const login = async (email, password) => {
    const credentials = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    )
    if (credentials.user) {
      isAuthenticated.value = true
      account.email = credentials.user.email
    }
  }

  const register = async (email, password) => {
    const credentials = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    )

    if (credentials.user) {
      isAuthenticated.value = true;
      account.email = credentials.user.email;
    }
  }

  const logout = async () => {
    await signOut(firebaseAuth)
    isAuthenticated.value = false
    account.email = ''
  }

  return { isAuthenticated, account, login, register, logout }
}

export default auth
