<template>
  <section id="authed-layout">
    <Navbar />
    <RouterView/>
  </section>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: "AuthedLayout",
  components: {
    Navbar
  }
}
</script>

<style lang="scss" scoped>
#authed-layout {
  padding: 30px;
  margin: 0;
  width: 100%;
  background-image: url('~@/assets/images/bg-triangles.png');
  background-size: cover;
  height: 100vh;
}

#nav {  
  a {
    font-weight: bold;
    color: #2c3e50;
  }

  a.router-link-exact-active {
    color: #42b983;
  }
}
</style>
