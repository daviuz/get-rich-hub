import { ref } from 'vue'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { firebaseAuth } from './firebaseImport'

const isAuthenticated = ref(false)
const email = ref('')

const auth = () => {
  const login = async (email, password) => {
    const credentials = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    )

    if (credentials.user) {
      isAuthenticated.value = true
      email.value = credentials.user.email
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
      email.value = credentials.user.email;
    }
  }

  const logout = async () => {
    await signOut(firebaseAuth)
    isAuthenticated.value = false
    email.value = ''
  }

  return { isAuthenticated, email, login, register, logout }
}

export default auth
