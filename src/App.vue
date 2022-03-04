<template>
  <div id="app" class="w-full">
    <AppLayout>
      <RouterView />
    </AppLayout>
  </div>
</template>

<script>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()

    watch(route, to => {
        document.title = to.meta.title || "Passive Traders"
      }
    )
  }
}
</script>


<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Montserrat, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
