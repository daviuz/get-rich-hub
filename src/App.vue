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
  -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
}

#app {
  font-family: Montserrat, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.enable-disabled div div ul ul .el-dropdown-menu__item.is-disabled div {
  background-color: #5fad9b;
  border-radius: 3px;
  font-size: 12px;
  padding: 2px 10px;
  color: white;
  cursor: initial;
}
</style>
