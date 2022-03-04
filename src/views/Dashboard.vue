<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button v-if="isLoggedIn" @click="logoutFromApp()">Logout</el-button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const isLoggedIn = computed(() => store.getters['auth/isLoggedIn'])
    const logoutFromApp = () => {
      store.dispatch('auth/logout')
    }

    return { isLoggedIn, logoutFromApp }
  }
}
</script>
