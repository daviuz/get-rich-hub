<template>
  <div id="nav">
    <el-card id="navbar" :body-style="{ padding: '0px' }">
      <section id="logo" class="p-2">
        <img src="@/assets/images/logo.svg" class="w-12 inline-block" />
        <span class="font-bold text-green-600">
          Passive Traders
        </span>
      </section>
      <section class="flex justify-center text-sm">
        <template  v-for="(route, index) in routes" :key="index">
          <RouterItem :route="route" />
        </template>
      </section>
      <section id="account" class="flex items-center justify-end">
        <AccountDrop />
      </section>
    </el-card>
  </div>
</template>

<script>
import { routes } from '../../router/index'
import RouterItem from './navbarComponents/RouterItem.vue'
import AccountDrop from './navbarComponents/AccountDrop.vue'

export default {
  components: {
    RouterItem,
    AccountDrop
  },
  setup() {
    return { routes }
  }
}
</script>


<style lang="scss" scoped>
#navbar {
  background-color: #cefcf173;
  border: 1px solid white;

  :deep(.el-card__body) {
    display: grid;
    align-items: center;
    grid-template-columns: minmax(150px, 25%) 1fr minmax(150px, 25%);
  }
}
</style>
