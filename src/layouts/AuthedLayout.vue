<template>
  <section id="authed-layout">
    <Navbar :navType="'top'" />
    <div class="pb-12 my-4 mx-3 md:m-0 md:my-4 md:pb-0">
      <RouterView/>
    </div>
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
    background-image: url('~@/assets/images/bg-triangles-dark.png');
    background-size: cover;
    height: 100vh;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px #263441;
      border-radius: 10px;
      background-color: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px #263441;
      background-color: var(--el-color-primary);
    }
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
