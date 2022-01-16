<template>
  <section>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <input type="email" name="email" placeholder="Email">
      </div>
      <div>
        <input type="password" name="password" placeholder="Password">
      </div>
      <input type="submit" value="Login">
    </form>
  </section>
</template>

<script>
import firebase from "firebase/auth"

export default{
  setup() {
    const login = () => {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(data => {
        consoe.log(data)
      })
    }

    return {
      login
    }
  },
}
</script>
