<template>
  <section id="authed-layout">
    <Navbar :navType="'top'" />
    <RouterView/>
    <Navbar v-if="screenOrder < 2" :navType="'bottom'" class="w-full fixed bottom-0" />
  </section>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Navbar from './components/Navbar.vue'

export default {
  name: "AuthedLayout",
  components: {
    Navbar
  },
  setup() {
    const store = useStore()
    const screenOrder = computed(() => store.getters['layout/order'])

    return  { screenOrder }
  }
}
</script>

<style lang="scss" scoped>
#authed-layout {
  @screen md {
    padding: 30px;
  }
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
