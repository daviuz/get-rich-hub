<template>
  <div id="app" class="w-full">
    <AppLayout>
      <RouterView />
    </AppLayout>
    <VueQueryDevTools :initialIsOpen="false" />
  </div>
</template>

<script>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { VueQueryDevTools } from 'vue-query/devtools'

export default {
  components: { VueQueryDevTools },
  setup() {
    const route = useRoute()
    const appName = 'Passive Traders'

    watch(route, to => {
        document.title = appTitle(to)
      }
    )

    const appTitle = to => {
      const routeTitle = to.meta.title
      return routeTitle ? `${to.meta.title} | ${appName}` : appName
    }
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
